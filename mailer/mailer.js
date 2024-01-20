var express=require("express")
var router=express.Router();
var {send ,sendEmail}=require("./mail.js")

router.post("/sendEmail",send)

module.exports=router;