const mongoose = require("mongoose");

// 스키마 정의
const commentSchema = new mongoose.Schema({
  // 게시물 제목
  nickname: {
    type: String,
    required: true,
  },
  // 게시물 내용
  body: {
    type: String,
    required: true,
  },
  // 게시물 작성일
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 모델 생성
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;