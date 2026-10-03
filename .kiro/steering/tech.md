# 技術スタック

## 使用技術

- **言語**: JavaScript（JSX）。TypeScript は使わない（スコープを小さく保つため）。
- **UI**: React 18
- **ビルド**: Vite 5
- **状態管理**: React の `useState` / `useEffect` のみ。外部状態管理ライブラリは導入しない。
- **永続化**: ブラウザの localStorage
- **テスト**: Vitest + fast-check（Property-based testing 用）

## 方針

- 依存は最小限に保つ。新しいライブラリを足す前に、標準機能で実現できないか検討する。
- 一意 ID は `crypto.randomUUID()` を使う。
- 日付は "YYYY-MM-DD" 文字列で保持し、計算時に Date へ変換する。

## コマンド

- 開発サーバー: `npm run dev`
- 本番ビルド: `npm run build`
- プレビュー: `npm run preview`
- テスト: `npm test`（Vitest）

## 注意

- 開発サーバーやウォッチ系コマンドは長時間動き続けるため、エージェントは自動実行せずユーザーに実行を促すこと。
- テストはウォッチではなく単発実行（`vitest run`）を基本とする。
