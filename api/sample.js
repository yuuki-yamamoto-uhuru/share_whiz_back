const express = require('express');
const router = express.Router();

// /api/hello エンドポイント
router.get('/', (req, res) => {
    res.json({ message: 'hello!' });
});

// 他のエンドポイントも追加可能
// 例: router.get('/another-endpoint', (req, res) => { ... });

module.exports = router;