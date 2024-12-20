こんにちは。Naotoです。

フロントエンドの技術を学ぶ一環で、無駄づかい削減アプリ「ちりつも」を作成しましたので、紹介させていただきます！

どんなアプリかざっくりお伝えすると、

「無駄づかいを我慢したらこのアプリに記録し、貯まったお金で自分の欲しいものを買おう！」

というコンセプトのアプリです！

＜最終成果物＞

ぜひ以下のテストユーザーでログインして使ってみてください！

メール：[cnann.0615.test@gmail.com](mailto:cnann.0615.test@gmail.com)
パスワード：testes0615

https://chiritsumo-theta.vercel.app/

↓ イメージ ↓

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3817219/3ceec568-8767-833c-2042-076e42928572.png)

## **きっかけ**

日々の出費を家計簿アプリで管理している中で、「毎朝のコンビニコーヒー」や「ランチ後についつい買ってしまうデザート」など、よく考えると不要なもの（我慢できるもの）に習慣的にお金を使ってしまっていることに気づきました。
同じように、何気なく無駄遣いをしてしまう人は他にもいるのではないかと考えたのが、このアプリを作ろうと思ったきっかけです。

また、ただ単に、"無駄遣いをしないように意識する" というのは難しいと感じたため、「欲しいものを手に入れるために、無駄遣いを我慢する」というコンセプトにしました。
このように目標があれば、日々の節約が自分の幸せにつながるため、頑張る動機になるのではと考えています。

## **開発環境と使用技術**

### **開発環境**

OS：macOS

IDE：Visual Studio Code

### **使用技術**

今回は、Next.js, TypeScript, NextAuth, Prisma, tRPC, Tailwind CSSの６つ技術を使って開発を行うT3 Stackという開発手法を採用しました！

T3 Stackは、simplicity（簡潔さ）、modularity（モジュール性）、full-stack type safety（フルスタックの型安全）を追求した思想に焦点を当てています。

T3 StackのCLI「create-t3-app」を使用してプロジェクトを作成すると、上記６技術に関する初期設定が済んだ状態から開発を始められます！
<br>

-----今回使った技術--------------------------

フレームワーク：Next.js（AppRouter）
言語：TypeScript
スタイル：Tailwind CSS, React Icons
認証：Next.Auth
API：tRPC
ORM：Prisma
DB：PostgreSQL
パッケージ管理：npm
ソースコード管理：GitHub

## **機能説明**

ここからはイメージと共に各機能の説明をします。

### 残高管理（貯金）機能

- 我慢した額を管理する機能です。
- 無駄づかいへの欲望が発生した際に、我慢できたらその額を記録（貯金）していきます。
  - 例）出社前に買ってるコーヒーを我慢した！　→　＋150円
  - 例）飲み会（5000円）を断って家で自炊を（500円）した！　→ ＋4500円

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3817219/1c59568f-99e4-c5c6-3f26-cda0768192bc.png)
↓↓↓送信↓↓↓
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3817219/8027a174-9d48-27e0-7ac2-4caf4565083f.png)

### ログ機能

- これまで無駄づかいを我慢したログを閲覧、編集、削除できます。
  ![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3817219/e7cb5a44-cb7b-bb93-1306-016c9c2407e4.png)

### 欲しい物リスト機能

- 欲しいものリストにアイテムを追加できます。
- 欲しいものリストのアイテムを編集、削除できます。
  ![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3817219/0be1caef-583f-b7b1-cc39-1a8b9311dc97.png)

### 残高管理機能と欲しい物リスト機能の連携

- 欲しいものリスト進捗
  - 欲しいものリストに登録した商品に対しての残高の割合をグラフで視覚化することで、進捗状況を一目で確認できます。
- 欲しいものを購入したら、残高が減ります。
  ![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3817219/084aecd1-79af-eb14-a030-dd5c2105bd57.png)

## **苦労した点と対応策**

### 苦労した点①

- ユーザが直感で使えるアプリを作るのに苦労しました。
  - やりたいことがイメージできている自分の目線で開発してしまうことが多く、第３者にアプリを使ってもらった時に、「これどうやって使うの？」「どういうアプリ？」など、そもそもの前提を理解してもらえないことが多かったです。

### 対応策①

- 色々な人に使ってもらい、初めてアプリを触った時の印象を以下の観点で調査しました。
  - 説明がなくても使えるかどうか。
  - アプリの目的、趣旨が分かるか。

### 苦労した点②

- 画面の更新速度の改善に苦労しました。
  - このアプリは上記の通り、インタラクティブな操作が主ですが、操作に対しての画面更新が遅いという課題がありました。

### 対応策②

- 状態管理に、tRPC内蔵のTanStack Queryのキャッシュ機能を使っており、データの再取得のたびにクライアントとサーバー間の通信が行なわれれていることが遅延の原因だと判明ました。
  そこで、 ”楽観的更新”　を採用し、ユーザの操作直後にフロントエンドにて手動でキャッシュを更新し、その裏でサーバーからデータを取得して問題があれば更新を取り消すようにしました。

- 結果として、ReduxやRecoil等のフロントエンド状態管理ライブラリを使用している時と同等の速度で画面を更新できるようになりました。

## **最後に**

今回は、T3 Stackを使って開発をしましたが、プロジェクト作成から完成まで、かなり短い期間（30時間くらい）で開発できたので、「少人数でサクッと！」みたいな開発には、T3 Stackはとてもピッタリかと思います。

ぜひ皆さんも使ってみてください！

ただ、CLIを使ったプロジェクト作成にて自動で実装される初期設定の部分も、しっかり理解していないと使いこなせないなと感じたので、今後深く読み込んでいきたいと思いました。

最後までお読みいただきありがとうございました！！！
