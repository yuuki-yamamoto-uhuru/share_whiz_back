const express = require('express')
const cors = require('cors')

const postAPI = require('./api/post')
const postImgAPI = require('./api/postImg')
const sampleAPI = require('./api/sample')

const app = express()
const PORT = 3000

// 全てのオリジンからのリクエストを許可する。 デプロイする際はきちんと制約を設ける。
app.use(cors());

// ExpressでJsonを取得 https://zenn.dev/urinco/articles/e3932af54c020e
app.use(express.json())

app.use('/api/hello', sampleAPI); // サンプル
app.use('/api/post', postAPI);
app.use('/api/postImg', postImgAPI);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})