import mongoose,{Schema} from "mongoose";
import bcrypt from 'bcrypt';
import Jwt  from "jsonwebtoken";

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        index: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: [true,'Password is required'],
    },
    avatar: { 
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
    refreshToken: {
        type: String,
    }


},{timestamps: true})

userSchema.pre('save',async function (next) {
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCheck = async function (password){
      return await bcrypt.compare(password,this.password)
}
userSchema.methods.getAccessToken = function (){
    return Jwt.sign(
        {
        _id: this._id,
        email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        )
}
userSchema.methods.getRefreshToken = function (){
    return Jwt.sign(
        {
        _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        )
}
export const User = mongoose.model('User',userSchema)