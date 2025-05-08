# share_whiz_back

# データベース設計
```schema.prisma
model Post {
  id       Int      @id @default(autoincrement())
  title    String
  content  String   @unique
  postedAt DateTime @default(now())
}
```
全て必須
`id`と`postedAt`は自動生成される。
