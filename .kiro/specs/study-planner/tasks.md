# 実装タスク（Tasks）

- [ ] 1. ドメインロジックの純粋関数を実装する
  - `src/lib/domain.js` に `daysUntil` / `progress` / `recommendedPerDay` を実装
  - 各関数は副作用を持たず、入力のみに依存する
  - _要件: 2, 4, 5_

- [ ] 2. localStorage 読み書きユーティリティを実装する
  - `src/lib/storage.js` に `load` / `save` を実装
  - 例外時は空配列へフォールバックし、アプリを止めない
  - _要件: 6_

- [ ] 3. 進捗バーコンポーネントを実装する
  - `src/components/ProgressBar.jsx` に 0〜100 を受け取るバーを実装
  - _要件: 4_

- [ ] 4. 資格追加フォームを実装する
  - `src/components/CertForm.jsx` に資格名・試験日入力とバリデーションを実装
  - 空名は追加不可、エラー表示
  - _要件: 1_

- [ ] 5. 資格カードを実装する
  - `src/components/CertCard.jsx` に残り日数・進捗バー・ペース提案・トピック管理を実装
  - トピックの追加/完了トグル/削除
  - _要件: 1, 2, 3, 4, 5_

- [ ] 6. App で状態と永続化を統合する
  - `src/App.jsx` で資格配列 state を保持し、各ハンドラを実装
  - 起動時に load、変更時に save
  - _要件: 1, 3, 6_

- [ ] 7. スタイルを整える
  - `src/index.css` で一覧・カード・バーの見た目を整える
  - _要件: 4_

- [ ] 8. Property-based testing をセットアップし実行する
  - Vitest + fast-check を導入
  - `src/lib/domain.test.js` に design.md の不変条件をプロパティとして実装
  - _要件: 2, 4, 5_
