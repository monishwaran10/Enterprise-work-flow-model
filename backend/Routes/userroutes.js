const express=require('express');
const {sendMessage }=require('../Functions/sendmessage')
const {register}=require("../Functions/register")
const {login}=require("../Functions/register")
const router=express.Router();
router.post('/userregister',register);
router.post("/userlogin",login)
router.post("/send-message", sendMessage);
module.exports=router;