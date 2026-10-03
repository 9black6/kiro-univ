# コーディング規約

## 命名

- 変数・関数は camelCase（例: `daysUntil`, `examDate`）。
- コンポーネントは PascalCase（例: `CertCard`）。
- localStorage のキーはバージョンを含める（例: `aws-study-planner:v1`）。将来の形式変更に備える。

## 関数

- `src/lib/domain.js` の関数は**純粋関数**にする。
  - 外部状態を読み書きしない。引数のみに依存する。
  - `Date.now()` や `new Date()` を関数内で直接呼ばず、基準日は引数で受け取る（テスト可能にするため）。

  ```js
  // 良い例: 基準日を引数で受け取る
  export function daysUntil(examDate, today) { /* ... */ }

  // 悪い例: 関数内で現在時刻を取得（テストが不安定になる）
  export function daysUntil(examDate) { const today = new Date(); /* ... */ }
  ```

- 計算結果の範囲を明示する（例: 進捗率は 0〜100 に収める）。

## React

- 状態の更新はイミュータブルに行う（スプレッドや map/filter で新しい配列・オブジェクトを作る）。
- 副作用は `useEffect` に閉じ込める。レンダー中に localStorage へ書き込まない。

## コメント

- コメントは日本語で、「なぜそうするか」を中心に書く。自明な処理には書かない。
