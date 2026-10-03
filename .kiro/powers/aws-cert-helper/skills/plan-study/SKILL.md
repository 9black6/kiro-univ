# Skill: AWS 資格の学習計画を立てる

AWS 認定資格の学習計画を作成・分解するためのスキル。ユーザーが資格名と試験日を伝えたときに、
標準的な学習トピックへの分解と、現実的な学習ペースの提案を行う。

## いつ使うか

- ユーザーが「SAA の勉強計画を立てたい」のように資格名を挙げたとき
- 学習トピックの分解に迷ったとき
- 試験日までの学習ペースを設計したいとき

## 手順

1. **資格を特定する**。略称（SAA / DVA / SOA / SAP / DOP など）を正式名称に対応づける。
2. **主要トピックに分解する**。下記「資格別トピック例」を出発点に、ユーザーの弱点に応じて調整する。
3. **ペースを提案する**。試験日までの残り日数に対し、「未完了トピック数 ÷ 残り日数」で 1 日あたりの目安を出す。
   直前は復習日を確保するため、余裕を 2〜3 割見込む。
4. **正確な情報は AWS 公式ドキュメントで確認する**。曖昧なサービス仕様は aws-docs MCP サーバーで裏取りする。

## 資格別トピック例

### SAA（Solutions Architect – Associate）
- IAM と権限設計
- VPC / サブネット / ルーティング
- EC2 / Auto Scaling / ELB
- S3 とストレージクラス
- RDS / DynamoDB
- 可用性と信頼性の設計
- コスト最適化

### DVA（Developer – Associate）
- IAM とアプリ認証（Cognito）
- Lambda / API Gateway
- DynamoDB の設計とアクセスパターン
- SQS / SNS / EventBridge
- CI/CD（CodePipeline / CodeBuild）
- X-Ray とモニタリング

### SOA（SysOps Administrator – Associate）
- CloudWatch / CloudTrail
- 自動化（Systems Manager）
- バックアップとリカバリ
- ネットワークとセキュリティ運用

## 注意

- トピック例はあくまで出発点。最新の試験ガイドは AWS 公式を確認すること。
- ユーザーの学習状況に合わせて粒度を調整する。細かすぎる分解は挫折の原因になる。
