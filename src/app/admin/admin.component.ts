import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent  {
  usertype: any;
  regShow:boolean=true
  logShow:boolean=true
  

  loginForm!: FormGroup<any>;
  registerForm!: FormGroup<any>;
  errorshow: boolean=true;

  constructor(private formBuilder: FormBuilder, private http:HttpClient) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
    
      password:['', [Validators.required]],
     
      email: ['', [Validators.required, Validators.email]]
    });



    this.registerForm = this.formBuilder.group({
    
      password:['', [Validators.required]],
     
      email: ['', [Validators.required, Validators.email]]
    });
  }

  userres(){
    this.regShow=false
    this.logShow=true
  }
  userlog(){
    this.regShow=true
    this.logShow=false
    
  }

  
  register(){
    this.errorshow=true
    if(this.registerForm.valid){

      console.log("OKKKKKKK",this.registerForm.value.email)

      let obj={
        user:this.registerForm.value.email,
        pass:this.registerForm.value.password
      }
    
        this.http.post("http://localhost:3000/admin/createData",obj).subscribe((res:any)=>{
          
          console.log("RESSS>>>>>>>",res)
          
    
          if(res){
             sessionStorage.setItem("user", res.email);
             sessionStorage.setItem("userId", res.id);
    let al=sessionStorage.getItem("userId")
    sessionStorage.setItem("dataValue",'1')
    
    this.regShow=true
    this.logShow=true
    window.location.reload()
          }
         })
      
    }else{
      this.errorshow=false
      console.log("this.loginForm",this.loginForm)
    }
    
  }
  login(){
    if(this.loginForm.valid){
      console.log("OKKKKKKK",this.loginForm.value.email)
      let obj={
        user:this.loginForm.value.email,
        pass:this.loginForm.value.password
      }

      this.http.post("http://localhost:3000/admin/loginDetails",obj).subscribe((res:any)=>{
      
     
        if(res){
          sessionStorage.setItem("user", res.email);
          sessionStorage.setItem("userId", res.id);
let al=sessionStorage.getItem("userId")
sessionStorage.setItem("dataValue",'1')
this.regShow=true
this.logShow=true
window.location.reload()
       }
     })
    }

  }


submitData(login:any,password:any){
  
  if(this.usertype=="login"){
    
  }
  


}

}
