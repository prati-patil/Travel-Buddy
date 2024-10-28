import mongoose from 'mongoose';

const picSchema = new mongoose.Schema({
  is_attached: Boolean,
  pic_type: String,
  pic_name: String,
  pic_path: String,
}); 

const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  startLocation: {
    type: String,
  },
  destination: {
    type: String,
  },
  picture: picSchema,
});

const allChatSchema = new mongoose.Schema({
    chatName: {
      type: String,
    },
    chatInfo: [chatSchema],
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  phone: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  pfp: {
    type: String,
  },
  chat: [allChatSchema],
});

const User = mongoose.model("recur-user", userSchema);

export default User;