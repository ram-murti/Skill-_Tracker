import { Component, OnInit, Inject, SystemJsNgModuleLoader } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { SearchServiceService } from '../search-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public imagePath;
  imgURL: any;
  public message: string;
 
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  unamePattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  display = "none";
  display1 = "none";
  display2 = "none";
  display3 = "none";
  display4 = "none";
  keySet:any;
  errorMessage:string;
  email : any;
  secques:any;
  secans:any;
  secpass :any;
  secemail:any;
  str : string  = null ;
  setPass : string | undefined;
  setAgainPass : string | undefined;
  secAnswer: string | undefined;
  constructor(private ser: SearchServiceService,private httpObj: HttpClient, private router: Router,@Inject(LOCAL_STORAGE) private storage: WebStorageService,) { }

  form = new FormGroup({
    uname : new FormControl('', [Validators.required, Validators.pattern(this.unamePattern)]),
    upassword : new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  form1 = new FormGroup({
    vername : new FormControl('', [Validators.required, Validators.pattern(this.unamePattern)])
  })

  form2 = new FormGroup({
    secanswer : new FormControl('', [Validators.required])
  })

  form4 = new FormGroup({
    setpass: new FormControl('', [Validators.required, Validators.minLength(8)]),
    setagainpass: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  ngOnInit() {
  }

  onSubmit(params)
  {
    console.log(params.value);
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'});
    
      let options = {
        headers: httpHeaders};
    this.httpObj.put("http://localhost:8098/updateHR",
    {
      "useremail": params.value.hrEmail,
      "userpassword": params.value.hrPassword,
      "securityQuestion": params.value.quesCategory,
      "securityAnswer": params.value.hrans
    }
,options).subscribe(data  => {console.log("PUT Request is successful ", data);
  
  this.display2 = 'none';
});
  }

  openReg()
  {
    this.display2 = "block";
  }
  openModal()
  {
    console.log("Forgot password");
    this.display = "block";
  }

  onClose()
  {
    this.display = "none";
  }

  onClose1()
  {
    this.display1 = "none";
  }
  onClose2()
  {
    this.display2 = "none";
  }
  onClose3()
  {
    this.display3 = "none";
  }
  onClose4()
  {
    this.display4 = "none";
    this.errorMessage = "";
  }
  checkEmail(uname : any, upassword : any) 
  {
    console.log(uname);
    console.log(upassword);
    let responseData = this.httpObj.get("http://localhost:8098//hrDetails/all");
    responseData.subscribe((response) => 
    {
      this.email = response;
      for (let i = 0; i < this.email.length; ++i) 
      {
        if (this.email[i].useremail == uname && this.email[i].userpassword == upassword) {
          console.log("Login successfully");
          console.log('recieved= key:' + uname + 'value:' + upassword);
          localStorage.setItem(uname, upassword);
          console.log("session set");
          
          if(uname == "admjohn998@gmail.com"){
          this.router.navigate(['/searchPage']);
          }
          else{
            this.router.navigate(['/searchEmp']);
          }
        }
      }
      console.log("Login failed");
      this.errorMessage = "Email or Password entered is incorrect";
      this.display4 = "block";
    });
  }

  displayText(param)
  {
    console.log(param);
    
  }
  verifyEmail(uname: any)
  {
    console.log(uname);
    let responseData = this.httpObj.get("http://localhost:8098//hrDetails/all");
    responseData.subscribe((response) => 
    {
      this.email = response;
      for (let i = 0; i < this.email.length; ++i) 
      {
        if (this.email[i].useremail == uname) 
        {
          console.log("verified successfully");
          this.secpass = this.email[i].userpassword;
          this.secemail = this.email[i].useremail;
          this.secques = this.email[i].securityQuestion;
          this.secans = this.email[i].securityAnswer;
          return this.display1 = "block";
        }
        else{
          window.alert("seems email doesn't exist");
        }
      }
      console.log("verification failed");
    });
  }

  sendMail()
  {
    console.log("mail started");
     alert("mail Sent to your inbox...");
    console.log(this.secemail + this.secpass + this.secques + this.secans)
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'});
    
      let options = {
        headers: httpHeaders};
    this.httpObj.post("http://localhost:8098/send-mail",
      {
        "useremail":this.secemail,
        "userpassword":this.secpass,
        "securityQuestion":this.secques,
        "securityAnswer":this.secans
      }
  ,options).subscribe(data  => {console.log("PUT Request is successful ", data);
    this.display3 = 'none';
    this.display1 = 'none';
    this.display = 'none';
  });
    
  }
  checkAnswer() 
  {
    if (this.secans == this.secAnswer) 
    {
          console.log("Right: " + " " + this.secAnswer);
          return this.display3 = 'block';
    }
    else 
    {
          console.log("Wrong: " + " " + this.secAnswer);
          alert("Your Security Answer is wrong. Click the send mail button to reset the password")
    }
  }

  setNewPassword()
  {
    if(this.setPass == this.setAgainPass)
    {
      console.log("right:" + this.setPass + "matched with " + this.setAgainPass);
      let httpHeaders = new HttpHeaders({
        'Content-Type' : 'application/json',
        'Cache-Control': 'no-cache'});
      
        let options = {
          headers: httpHeaders};
      this.httpObj.put("http://localhost:8098/updateHR",
      {
        "useremail":this.secemail,
        "userpassword":this.setAgainPass,
        "securityQuestion":this.secques,
        "securityAnswer":this.secans
      }
  ,options).subscribe(data  => {console.log("PUT Request is successful ", data);
    this.display3 = 'none';
    this.display1 = 'none';
    this.display = 'none';
  });
      
    }
    else
    {
      console.log("wrong: " + this.setPass + " does not matched with " + this.setAgainPass);
    }
  }


}
