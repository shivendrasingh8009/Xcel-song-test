const express = require("express");
const router = express.Router();
const register=require("../model/register")
const { v4 } = require("uuid");
const bcrypt = require("bcrypt");



////////////create GoalList////////////////////////////////
router.post("/createData", async (req, res, next) => {
  try {
    const {user,pass} = req.body;
    console.log(req.body,"bbbbbbbbbbbbb")
    const password=req.body.pass;
    const bcryptPass = await bcrypt.hash(password, 10);
    const data = new register({
    email:user,
     password:bcryptPass,
     id: v4(),
      });
      const saveData = await data.save();
      res.send(saveData);
  } catch (error) {
    console.log(error)
    next(error);
  }
});



//////////log in ///////////////////////////

router.post("/loginDetails",async(req,res,next)=>{
  try{
  
  const find=await register.findOne(
    {email:req.body.user})
    if(find){
      const checkPass = await bcrypt.compare(req.body.pass, find.password);
      if(checkPass){
        res.send(find);
        console.log(find)
      }else{
        res.send({ result:"1",msg:" Invalid Email / mobile and password"})

      }
    }
else{
res.send({ result:"3",msg:" Invalid Email "})
}
  }catch(error){
    console.log(error)
  }
})



module.exports=router