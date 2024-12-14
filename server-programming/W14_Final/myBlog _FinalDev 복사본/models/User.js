const mongoose = require("mongoose");

// Mongo 스키마 가져오기
const Schema = mongoose.Schema;

// 사용자 스키마 생성
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true, // 중복X
    },

    password: {
        type: String,
        required: true,
    },
});

// Users 모델을 생성하고 내보내기
module.exports = mongoose.model("Userdata", UserSchema);