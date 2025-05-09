const express = require('express');
// multer: クライアントからアップロードしてきたファイルを処理するためのミドルウェア
const multer = require('multer');
const path = require('path');

const router = express.Router();

const saveDirectory = 'img/';

// multer の設定
// multerがファイルを受け取る際に従う指示書
const storage = multer.diskStorage({
    // NOTE: 保存する場所を設定
    destination: (req, file, cb) => {
        // NOTE: コールバック(非同期完了通知関数)。非同期処理が完了、未完了時に何を返すのかを定義するメソッド
        cb(null, saveDirectory);
    },
    // NOTE: ファイル名を設定
    filename: (req, file, cb) => {
        const fileId = req.body.id;
        const fileExtension = path.extname(file.originalname);
        const fileName = `${fileId}${fileExtension}`;

        cb(null, fileName);
    }
});

// NOTE: 習慣的にはuploadが適切らしい、が、僕は納得がいかないのでreceiveにした。
const receive = multer({ storage: storage });

// POST リクエストを受け取って画像を保存するエンドポイント
router.post('/', receive.single('image'), (req, res) => {
    if (!req.body.id) {
        return res.status(400).json({ error: 'ID is required' });
    }
    if (!req.file) {
        return res.status(400).json({ error: 'Image is required' });
    }

    const fs = require('fs');
    const path = require('path');

    const oldPath = req.file.path;
    const extension = path.extname(req.file.originalname);
    const newPath = path.join(req.file.destination, `${req.body.id}${extension}`);

    fs.renameSync(oldPath, newPath);

    console.log(`saved.\nimgName: ${req.body.id}${extension}`)

    res.status(200).json({
        message: 'Saved Image',
        file: { ...req.file, filename: `${req.body.id}${extension}` }
    });
});

module.exports = router;