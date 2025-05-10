// routes/posts.js
// TODO: ステータスコードどうするか問題
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// TODO: 引数にレスポンスを含めてる理由を調べる。
router.post('/', async (req, res) => {
    const { title, content } = req.body;

    // 入力チェック
    if (!title || !content) {
        console.log(title)
        console.log(content)
        return res.status(400).json({ error: 'Title or content is required' });
    }

    try {
        // Prismaを使ってDBに新しい投稿を作成
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
            },
        });

        // 作成した投稿をレスポンスとして返す
        res.status(201).json(newPost);

        let d = new Date();
        console.log(`【new post (${d})】`)
        console.log(`title: ${newPost.title}`)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create post' });
    }
});

module.exports = router;