# Hooks（レッスン3）

このディレクトリには、Kiro がセッション中のイベントに応じて自動実行する hook を定義している。

## build-on-save.json

- **トリガー**: `PostFileSave`
- **対象**: `src/` 配下の `.js` / `.jsx` ファイル
- **アクション**: `npm run build` を実行
- **狙い**: ソースを保存するたびにビルドが通るか自動確認し、壊れた変更を早期に検知する。

## test-on-domain-change.json

- **トリガー**: `PostFileSave`
- **対象**: `src/lib/` 配下の `.js` ファイル（ドメインロジック）
- **アクション**: `npm test` を実行
- **狙い**: 計算ロジック（daysUntil / progress / recommendedPerDay）を変更したら、
  Property-based testing を自動で回し、不変条件が壊れていないことを即確認する。
