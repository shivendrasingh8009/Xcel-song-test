import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';

declare const $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  // files: { name: string; url: string; desc:string,image:string}[]=[];
  songFile: any;
  imageFile: any;
  userId:any;
  files:any=[]
  
  

  addForm!: FormGroup<any>;
  updateForm!: FormGroup<any>;
  registerForm!: FormGroup<any>;
  showUpdate: boolean=true;
  showadd: boolean=false;
  updateUserId:any
  updateid:any
  editUserId: any;
  editId: any;
  imagePath: any;
  saveImage: any;
 

  constructor(private formBuilder: FormBuilder, private http:HttpClient) {
    if(sessionStorage.getItem("userId")!=null){
      this. userId=sessionStorage.getItem("userId")
    }else{
      this.userId="0"
    }
   
  }

 

 
  title = 'Song.mp3';
  dataValue:any="0";
ngOnInit(){
  this.getAudio()
  this.addForm = this.formBuilder.group({
    
    name:['', [Validators.required]],
    desc:['', [Validators.required]],
  
  });
  this.updateForm = this.formBuilder.group({
    
    editname:['', [Validators.required]],
    editdesc:['', [Validators.required]],
  
  });
  if(sessionStorage.getItem("dataValue")!=null){
    this.dataValue=sessionStorage.getItem("dataValue")
    
  }
  console.log(sessionStorage.getItem("dataValue"))
 
 let userId=sessionStorage.getItem("userId")
 let uaer=sessionStorage.getItem("user")

  
 
 
}
////////////////////////////select file ////////////////////////
selectFile(event:any){
 
    const file=event.target.files[0]
    this.songFile=file
    // console.log("this.songFile>>>>>>",this.songFile)
  

}
////////////////////////////select Image ////////////////////////
selectImage(event:any){

    const image=event.target.files[0]
    if(image.type=="image/jpeg"){
      this.imageFile=image
      this.addimage()
    }else{
      this.imagePath=sessionStorage.setItem("imagePath","No Path")
    }
    

    console.log("this.selectImage>>>>>>",this.imageFile)
  

}
addimage(){
  alert("add image")
  const formData=new FormData();
  formData.append('file',this.imageFile)
  this.http.post("http://localhost:3000/test/image",formData).subscribe((res:any)=>{
    console.log("RESSSSSSSSSS",res)
    this.saveImage=res.path
    this.imagePath=sessionStorage.setItem("imagePath",res.path)
  })
}
addsong(){
  const formData=new FormData();
  formData.append('file',this.songFile)
  // formData.append('image',this.songFile)

  if(this.addForm.valid){
   
    let params = new HttpParams();
    params = params.set("name",this.addForm.value.name);
    params = params.set("desc",this.addForm.value.desc);
    params = params.set("image",this.saveImage);
    params = params.set("userId",this.userId);
    this.http.post("http://localhost:3000/test/audio?"+params,formData).subscribe((res:any)=>{
console.log("RESSSSSSSS>>>>>",res)
let path=res.song
console.log("RESSSSSSSS>>>>>",path)
this.getAudio()
// src="
// this.files=[{name:res.filename,url:`http://localhost:3000/${{path}}` ,desc:"",image:""},
//   {name:"song 2",url:"../assets/song2.mp3",desc:"",image:""},
//   {name:"song 3",url:"../assets/song3.mp3",desc:"",image:""},
//   {name:"song 4",url:"../assets/song4.mp3",desc:"",image:""},
//   {name:"song 5",url:"../assets/song5.mp3",desc:"",image:""},
//   {name:"song 6",url:"../assets/song6.mp3",desc:"",image:""},
//   ]

  })
   

  }else{
    console.log("Unvalid",this.addForm )
  }

}


//////////////////////////////////////////////////////////////////////////
 audio=new Audio()

fileplay(file:any){
 
  let url=file.song

  
 
  this.audio.src= "http://localhost:3000/"+url
  this.audio.load();
  this.audio.play()

}
//play //////////////////////////////////////////
play(){
  this.audio.play()
  
}

//////////////////////pause //////////////////////////
pause(){
  this.audio.pause()
  
}




getAudio(){
  // offset, limit, sort_col, sort_order
  // let params = new HttpParams();
  //   params = params.set("offset", offset);
  //   params = params.set("limit", limit);
  //   params = params.set("sort_col", sort_col);
  //   params = params.set("sort_order", sort_order);
  this.http.get("http://localhost:3000/test/get-audio"+"/"+this.userId).subscribe((res:any)=>{
    console.log("GET SONG>>>>>>",res)
    this.files=res
    console.log("FILES>>>>>",this.files)
 
  })
}

deleteSong(data:any){
  
  this.http.delete("http://localhost:3000/test/delete-audio"+"/"+data.id).subscribe((res:any)=>{
    console.log("GET SONG>>>>>>",res)
    this.getAudio()

  })

}
editSong(data:any){
  this.editId=sessionStorage.setItem("editId",data.id)
  this.editUserId=sessionStorage.setItem("editUserId",data.userId)
  this.files.filter((d:any)=>{
    this.showUpdate=false
    this.showadd=true
    if(data.id==d.id){
     
      this.updateForm.patchValue({
        editname:data.name,
        editdesc:data.desc,
      })
    }
  })

}


updateSong(){
  alert(this.updateForm.value.editname)
  const formData=new FormData();
  formData.append('file',this.songFile)
  // formData.append('image',this.songFile)
  this.updateid=sessionStorage.getItem("editId")
  this.updateUserId=sessionStorage.getItem("editUserId")
  if(this.updateForm.valid){
   
    let params = new HttpParams();
    params = params.set("name",this.updateForm.value.editname);
    params = params.set("desc",this.updateForm.value.editdesc);
    params = params.set("image",this.saveImage);
    params = params.set("id",this.updateid);
    params = params.set("userId",this.updateUserId);
  
  
  this.http.patch("http://localhost:3000/test/update-audio?"+params,formData).subscribe((res:any)=>{
    console.log("GET SONG>>>>>>",res)
    this.getAudio()

  })

}

}
}
///////////////////////////////////////////////////////////////////////
// path="http://localhost:3000/uploads\\Heroine(PagalWorld.com.se).mp3"
    


