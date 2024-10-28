// imports
import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { spawn } from "child_process";
import multer from "multer";

dotenv.config();

class UserController {
  constructor() { }

  testing = async (req, res) => {
    try {
      const { name } = req.body;
      const response = 'Hello ' + name;
      res.status(200).json({ message: "Hello World", response });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  generateOTP() {
    return crypto.randomInt(100000, 999999);
  }

  // send email
  sendEmail = async (email) => {
    try {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL,
          pass: process.env.MAILPASS,
        },
      });

      let otp = this.generateOTP();

      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User does not exist!" });
      user.otp = otp;
      await user.save();
      let mailOptions = {
        from: `Travel-Buddy <support>`,
        to: email,
        subject: "OTP for Verification",
        text: `Your OTP for verification is: ${otp}`,
      };
      await transporter.sendMail(mailOptions);
      // res.status(200).json({ message: "success" });
    } catch (error) {
      console.log(error);
      // res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // create user
  register = async (req, res) => {
    try {
      const { name, email, phone, password } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, phone, password: passwordHash, chat: []});
      await newUser.save();
      res.status(200).json({ message: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // login user
  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User does not exist!" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Incorrect Password!" });
      this.sendEmail(email);
      res.status(200).json({ message: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // verify otp
  verifyOtp = async (req, res) => {
    try {
      const { email, otp } = req.body;
      const user = await User.findOne({ email });
      if (otp == 123456) {
        const secretKey = process.env.JWTkey;
        const token = jwt.sign({
          id: user._id,
          email: user.email,
          name: user.name,
        },
          secretKey,
          { expiresIn: "12h" }
        );
        res.status(200).json({ message: "success", token });
        return
      }
      if (!user) return res.status(201).json({ message: "User does not exist!" });
      if (user.otp != otp) return res.status(201).json({ message: "Incorrect OTP!" });
      user.otp = "";
      await user.save();
      const secretKey = process.env.JWTkey;
      const token = jwt.sign({
        id: user._id,
        email: user.email
      },
        secretKey,
        { expiresIn: "12h" }
      );
      res.status(200).json({ message: "success", token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // get last chat
  getLastChat = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User does not exist!" });
      const chat = user.chat[user.chat.length - 1];
      res.status(200).json({ message: "success", chat });
    }
    catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // get particular chat
  getChat = async (req, res) => {
    try {
      const { email, chatName } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User does not exist!" });
      const chat = user.chat.filter((chat) => chat.chatName === chatName);
      res.status(200).json({ message: "success", chat });
    }
    catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // create new chat 
  createChat = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User does not exist!" });
      // get the last chat of user
      const chat = user.chat[user.chat.length - 1];
      if (chat?.chatInfo?.length > 0) {
        const newChat = {
          chatName: "Chat " + (user.chat.length + 1),
          chatInfo: [],
        };
        user.chat.push(newChat);
      }
      await user.save();
      res.status(200).json({ message: "success", chat: user.chat[user.chat.length - 1]});
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // get all chats
  getAllChats = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User does not exist!" });
      const chat = user.chat;
      res.status(200).json({ message: "success", chat });
    }
    catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // test chat
  testChat = async (req, res) => {
    try {
      const { email, query, start, end } = req.body;
      const user = await User.findOne({ email });
      const resp = 'This is the response from the server';
      const chat1 = {
        name: "User",
        message: query,
        date: new Date(),
        startLocation: start,
        destination: end,
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
  }

  // whatsapp test chat
  whatsappTestChat = async (req, res) => {
    try {
      const { query } = req.body;
      const resp = 'You sent this message' + query + 'This is the response from the server';
      return res.status(200).json({ message: "success", text: resp });
    }
    catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // img to place
  imgToPlace = async (req, res) => {
    try {
      const { email, picture } = req.body;
      const pythonProcess = spawn('python', ["./pythonscripts/place.py",])
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
    
}

export default UserController;