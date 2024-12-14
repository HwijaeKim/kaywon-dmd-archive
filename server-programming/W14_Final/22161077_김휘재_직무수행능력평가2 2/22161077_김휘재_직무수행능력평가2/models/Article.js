const mongoose = require('mongoose');

// 스키마 정의
const ArticleSchema = new mongoose.Schema({
    // 게시물 제목
    title: {
        type: String,
        required: true,
    },
    // 게시물 내용
    body: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        require: true,
    },
    // 게시물 작성일
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;