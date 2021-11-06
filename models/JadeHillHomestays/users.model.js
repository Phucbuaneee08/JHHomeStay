const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// tạo ra quan hệ Users
const UsersSchema = new Schema({
    name: {
        type: String,
        require:true
    },
    address: {
        type: String,
        require:true
    },
    role: {
        type: String,
        require:true,
        enum: {
            values:['admin', 'superAdmin'],
            message: '{VALUE} is not supported, just admin or super admin'
        }
    },
    email: {
        type: String,
        require:true
    },
    password: {
        type: String,
        require:true
    },
    phone: {
        type: String,
        require:true
    },
    status: {
        type: Number, // 1: active; 0: inactive
        require:true
    },
    gender: {
        type: String,
        enum: [
            'Male',
            'Female',
            'Other'
        ],
    },
    identification: {
        type: String,
        require:true
    },
    avatarUrl: {
        type: String,
        require:true
    },
    dateAtWork: {
        type: Date,
        require:true
    },
    dateAtBirth: {
        type: Date,
        require:true
    },
    resetPasswordToken: {
        type: String,
        require: false
    },
    token: [{
        type: String,
        required: false
    }],
    homestaysId: { // Id định danh homestay, tham chiếu bảng homestays
        type: Schema.Types.ObjectId,
        ref: 'Homestays',
        required: false
    },
    usersId: { // super admin tham chiếu tới admin
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: false
    }
});

module.exports = (db) => {
    if (!db.models.Users) {
        return db.model('Users', UsersSchema);
    }
    return db.models.Users;
}

