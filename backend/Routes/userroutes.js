const express=require('express');

const {register}=require("../Functions/register")
const router=express.Router();
router.post('/userregister',register);
module.exports=router;