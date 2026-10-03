# 設計（Design）

## アーキテクチャ概要

単一ページの React アプリ。状態はトップレベルの `App` で保持し、副作用（localStorage 保存）は `useEffect` で行う。
ビジネスロジック（残り日数・進捗率・ペース計算）は副作用を持たない**純粋関数**として `src/lib/` に分離する。
これにより UI から独立してテスト可能にし、Property-based testing（レッスン4）の対象を明確にする。

```
src/
├─ main.jsx            # エントリポイント
├─ App.jsx             # 状態保持・画面構成
├─ index.css           # スタイル
├─ lib/
│  ├─ domain.js        # 純粋関数（残り日数・進捗率・ペース）
│  └─ storage.js       # localStorage 読み書き
└─ components/
   ├─ CertForm.jsx     # 資格追加フォーム
   ├─ CertCard.jsx     # 資格 1 件の表示＋トピック管理
   └─ ProgressBar.jsx  # 進捗バー
```

## データモデル

```js
// 資格
{
  id: string,          // 一意 ID（crypto.randomUUID）
  name: string,        // 資格名（例: "SAA-C03"）
  examDate: string,    // 試験予定日 "YYYY-MM-DD"
  topics: Topic[]      // 学習トピック
}

// トピック
{
  id: string,
  title: string,       // トピック名
  done: boolean        // 完了フラグ
}
```

アプリ全体の状態は `Certification[]`。この配列を localStorage にキー `aws-study-planner:v1` で JSON 保存する。

## 純粋関数の仕様（src/lib/domain.js）

ここが Property-based testing の主対象。各関数は入力のみに依存し、副作用を持たない。

### daysUntil(examDate, today)
- 入力: 試験日文字列 "YYYY-MM-DD"、基準日 Date
- 出力: 残り日数（整数）。試験日が過去なら負の値になりうる。
- 不変条件（性質）:
  - 同じ日付同士なら 0 を返す
  - today が 1 日進むと戻り値は必ず 1 減る（単調減少）

### progress(topics)
- 入力: トピック配列
- 出力: 0〜100 の整数（百分率）
- 不変条件（性質）:
  - 戻り値は常に 0 以上 100 以下
  - topics が空なら 0
  - 全件 done なら 100
  - done の件数が増えると戻り値は減らない（単調非減少）

### recommendedPerDay(topics, examDate, today)
- 入力: トピック配列、試験日、基準日
- 出力: 1 日あたり推奨トピック数（切り上げの整数）。残り日数 0 以下なら null。
- 不変条件（性質）:
  - 戻り値は null または 0 以上の整数
  - 未完了トピックが 0 なら 0

## コンポーネント責務

- **App**: 資格配列の state を保持。追加・削除・トピック操作のハンドラを定義。localStorage への保存を `useEffect` で実行。
- **CertForm**: 資格名・試験日の入力とバリデーション（空名は追加不可）。
- **CertCard**: 資格 1 件の表示。残り日数・進捗バー・ペース提案・トピック一覧（追加/完了トグル/削除）を含む。
- **ProgressBar**: 0〜100 の値を受け取り、視覚的なバーで表示。

## エラー・エッジケースの扱い

- localStorage が利用不可（プライベートモード等）な場合、保存は try/catch で握りつぶし、アプリは動作を継続する。
- 不正な JSON が保存されていた場合、読み込み時に空配列へフォールバックする。
- 試験日未設定・過去日の扱いは要件 2・5 のとおり。

## テスト戦略

- **Property-based testing（レッスン4）**: `src/lib/domain.js` の 3 関数に対し、上記「不変条件」をプロパティとして検証する。ランダム入力を多数生成して性質が常に成り立つことを確認する。
- フレームワークは Vitest + fast-check を想定。
