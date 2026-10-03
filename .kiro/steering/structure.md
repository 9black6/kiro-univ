# プロジェクト構成

## ディレクトリ

```
repo/
├─ .kiro/
│  ├─ specs/study-planner/   # 仕様（要件・設計・タスク）
│  ├─ steering/              # この方針文書群
│  ├─ hooks/                 # イベント自動実行の hook
│  ├─ settings/mcp.json      # MCP サーバー設定
│  └─ agents/                # カスタムエージェント設定
├─ src/
│  ├─ main.jsx               # エントリポイント
│  ├─ App.jsx                # 状態保持・画面構成
│  ├─ index.css              # スタイル
│  ├─ lib/                   # 純粋関数・ユーティリティ
│  │  ├─ domain.js           # 日数・進捗・ペース計算（副作用なし）
│  │  └─ storage.js          # localStorage 読み書き
│  └─ components/            # React コンポーネント
├─ index.html
├─ package.json
└─ README.md
```

## 配置ルール

- **ビジネスロジックは `src/lib/` に置く**。UI（コンポーネント）からロジックを直接書かず、`lib` の関数を呼ぶ。
- **副作用（localStorage アクセス）は `src/lib/storage.js` に集約する**。コンポーネントから直接 localStorage を触らない。
- **純粋関数は `src/lib/domain.js` に集約する**。ここが Property-based testing の対象。
- コンポーネントは 1 ファイル 1 コンポーネントを基本とする。
