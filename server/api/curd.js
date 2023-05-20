const express=require("express")
const router=express.Router()
const multer = require("multer");
const Music=require("../model/song")
const {v4}=require("uuid")

/////////////////////file upload /////////////////////
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, "uploads");
    },
    filename: (req, file, callBack) => {
      callBack(null, `${file.originalname}`);
    },
  });


  var upload = multer({ storage: storage });
/////////////////////image upload /////////////////////
const storage1= multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, "images");
    },
    filename: (req, file, callBack) => {
      callBack(null, `${file.originalname}`);
    },
  });


  var upload1 = multer({ storage: storage1 });

  router.post("/image",upload1.single("file"),async(req,res,next)=>{
    try{
        const file=req.file;
      res.send(file)

    }catch(error){
        next(error)
    }
  })

  /////////////////////////////////////////////////////////////// Add audio/////////////////////////////////////////////////
router.post('/audio?', upload.single("file"),async(req, res,next) => {
   try{
console.log("QUERY?>>>>>>>",req.query.image)
    const file = req.file;
    // const imagefile = req.image;
    const name=req.query.name
    const desc=req.query.desc
    const image=req.query.image
    const userId=req.query.userId

    const data=new Music({
        userId:userId,
        id:v4(),
      name:name,
      image:image,
      desc:desc,
      song:file.path
    })
    
    const saveData=await data.save()

    console.log("saveData>>>>>>",saveData)
    res.send(saveData)
   }catch(error){
    next(error);
    console.log("ERRORRR>>>>>",error)
   }
 
});


//////////////////////////////////////////////////////////get audio ////////////////////////////////////////////////////

router.get("/get-audio/:userId",async(req,res,next)=>{
    try{
       const userId= req.params.userId
      
        const find=await Music.find({userId:userId})

        res.send(find)

    }catch(error){
       console.log("ERROR>>>>>>",error)
        next(error)
    }
})


/////////////////////////////////////////////////////////update ////////////////////////////////
router.patch("/update-audio?",upload.single("file"),async(req,res,next)=>{
    try{
        const file = req.file;
   
        const name=req.query.name
        const desc=req.query.desc
        const userId=req.query.userId
        const id=req.query.id

        console.log("QUERY>>>>",file)
        const condition={$and:[{id:id},{userId:userId}]};
       
        const update=req.query
        const option={new:true}
        var find=await Music.findOneAndUpdate(condition,update,option)
        if(file){
            find=await Music.findOneAndUpdate(condition,{song:file.path},option)
        }
         
        console.log("FIND>>>>>>",find)
        res.send(find)

    }catch(error){
        next(error)
        console.log("error>>>>..",error)
    }
})

/////////////////////////////////////////////////////////delete ////////////////////////////////
router.delete("/delete-audio/:id",async(req,res,next)=>{
    try{
        const id=req.params.id
        const condition={id:id};
       
        const find=await Music.findOneAndDelete(condition)
        res.send(find)

    }catch(error){
        next(error)
        console.log("error>>>>..",error)
    }
})

module.exports=router