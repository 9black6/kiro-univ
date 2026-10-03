# Custom Agents（レッスン7）

このプロジェクト専用のカスタムエージェントを定義している。役割ごとに権限・コンテキスト・指示を分けることで、
作業の安全性と一貫性を高める。

## domain-tester.json

- **役割**: ドメインロジック（`src/lib/domain.js`）の実装と Property-based testing。
- **事前ロード**: design.md / conventions.md / domain.js
- **許可コマンド**: `npm test`, `npm run build`, `git *`
- **MCP**: 利用する（`includeMcpJson: true`）
- **狙い**: 計算ロジックを変更する際、必ず性質ベーステストを書いて `npm test` で検証する流れを強制する。

## ui-builder.json

- **役割**: React コンポーネント（`src/components/`）の実装。
- **事前ロード**: structure.md / conventions.md / index.css
- **許可コマンド**: `npm run build`, `npm run dev`
- **MCP**: 利用しない
- **狙い**: UI 実装時に「ロジックは lib に置く」「イミュータブル更新」「アクセシビリティ配慮」という規約を守らせる。

## 使い分け

- 計算・テスト関連 → `domain-tester`
- 画面・コンポーネント関連 → `ui-builder`
