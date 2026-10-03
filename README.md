# AWS 資格 学習プランナー

AWS 認定資格の学習計画と進捗を管理するアプリです。受験する資格と試験日を登録し、学習トピックを分解して
進捗を可視化します。試験日までの残り日数と、1 日あたりの推奨学習ペースを提示します。

Kiro University Challenge の最終課題として、Kiro をメインの開発ツールに制作しています。
データはブラウザの localStorage に保存され、サーバーや DB を必要としません。

## 技術スタック

- React 18 + Vite 5
- テスト: Vitest + fast-check（Property-based testing）
- データ保存: ブラウザの localStorage

## セットアップ

```bash
npm install
npm run dev      # 開発サーバー起動（通常 http://localhost:5173 ）
npm run build    # 本番ビルド
npm test         # テスト実行（Property-based testing）
```

## 機能

- 受験する資格と試験予定日の登録・削除
- 試験日までの残り日数の表示
- 資格ごとの学習トピックの追加・完了トグル・削除
- 完了率のプログレスバー表示
- 1 日あたりの推奨学習ペースの提示

## Kiro University Challenge のレッスン対応

各レッスンの実演内容と該当ファイルは次のとおりです。

| # | レッスン | 実演内容 | 該当ファイル |
|---|---|---|---|
| 1 | Spec-driven development | 要件（EARS記法）→設計→タスクで仕様駆動開発 | `.kiro/specs/study-planner/` |
| 2 | Steering documents | プロダクト方針・技術・構成・規約を定義 | `.kiro/steering/` |
| 3 | Hooks | 保存時のビルド/テスト自動実行 | `.kiro/hooks/` |
| 4 | Property-based testing | ドメイン関数の不変条件を fast-check で検証 | `src/lib/domain.test.js` |
| 5 | Powers | 学習計画支援 power を自作・活用 | `.kiro/powers/aws-cert-helper/` |
| 6 | MCP | fetch / aws-docs サーバーを設定 | `.kiro/settings/mcp.json` |
| 7 | Custom agents | ドメイン担当・UI担当のエージェント定義 | `.kiro/agents/` |
| ボ2 | Package a Kiro power | power を plugin.json + skill で同梱 | `.kiro/powers/aws-cert-helper/` |

各ディレクトリの `README.md` に、設定の意図と詳細を記載しています。

## 設計のポイント

- 計算ロジック（残り日数・進捗率・推奨ペース）は副作用のない純粋関数として `src/lib/domain.js` に分離。
  これにより UI から独立してテスト可能にし、Property-based testing の対象を明確にしています。
- 副作用（localStorage アクセス）は `src/lib/storage.js` に集約しています。
