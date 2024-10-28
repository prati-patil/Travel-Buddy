import express from 'express';
import dotenv from 'dotenv';
import auth from '../middlewares/auth.js';
import UserController from '../controllers/userController.js';
import User from "../models/userSchema.js";
import multer from "multer";
dotenv.config();

const uR = express.Router();

const uC = new UserController();

uR.post('/testing', uC.testing);
uR.post('/send-email', uC.sendEmail);
uR.post('/register', uC.register);
uR.post('/login', uC.login);
uR.post('/verify-otp', uC.verifyOtp);
uR.post('/get/chat', auth, uC.getChat);
uR.post('/create/chat', auth, uC.createChat);
uR.post('/get/all-chat', auth, uC.getAllChats);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, "./images")
    },
    filename: function (req, file, cb) {
      return cb(null, `${file.originalname}`)
    }
  })
  
  const upload = multer({ storage });

uR.post('/test/chat', upload.single('image'), auth, async (req, res) => {
    try {
      const { email, query, start, end } = req.body;
      const image = req.file;
    //   console.log(image)
      const user = await User.findOne({ email });
      const resp = 'This is the response from the server';
      const chat1 = {
        name: "User",
        message: query,
        date: new Date(),
        startLocation: start,
        destination: end,
        picture: {
            is_attached: image ? true : false,
            pic_path: image ? image.path : null,
            pic_name: image ? image.originalname : null,
            pic_type: image ? image.mimetype : null,
        }
      }
      const chat2 = {
        name: "Travel Buddy",
        message: resp,
        date: new Date(),
      }
      if (user.chat.length === 0) {
        const newChat = {
          chatName: "Chat 1",
          chatInfo: [],
        };
        user.chat.push(newChat);
      }
        
      user.chat[user.chat.length - 1].chatInfo.push(chat1);
      user.chat[user.chat.length - 1].chatInfo.push(chat2)
      await user.save();
      return res.status(200).json({ message: "success", text: resp });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
uR.post('wp/test', uC.whatsappTestChat)

export default uR;