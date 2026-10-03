# Powers（レッスン5 / ボーナスレッスン2）

このディレクトリには、本プロジェクト用に**自作した Kiro power**を同梱している。

## aws-cert-helper

AWS 認定資格の学習計画づくりを支援する power。

### 構成

```
aws-cert-helper/
├─ plugin.json                       # power のマニフェスト（名前・説明・キーワード）
└─ skills/
   └─ plan-study/
      └─ SKILL.md                    # 学習計画を立てるスキル本体
```

### 役割

- `plugin.json` の `keywords`（aws, certification, study, exam, planner など）にマッチする話題が出たとき、
  Kiro がこの power のスキルをオンデマンドで読み込む。
- `skills/plan-study/SKILL.md` に、資格の学習トピック分解とペース設計の手順・ベストプラクティスを定義。

### このプロジェクトでの使い方

- 「SAA のトピックを分解して」といった依頼時に、このスキルの手順に沿って学習計画を提案する。
- アプリに登録するトピックの叩き台を作るときの知識源として使う。

## レッスンとの対応

- **レッスン5（Powers）**: この power を本プロジェクトの開発に活用する。
- **ボーナスレッスン2（Package a Kiro power）**: power を自作し、公開リポジトリに同梱する。
  （ボーナス2の満点条件として、power を独立した公開 GitHub リポジトリにも切り出すとなお良い）
