import { Component, OnInit } from '@angular/core';
import { Inject, SystemJsNgModuleLoader } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { SearchServiceService } from '../search-service.service';


@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  
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
    secemail : new FormControl('',[Validators.required]),
    secanswer : new FormControl('', [Validators.required]),
    secques : new FormControl('', [Validators.required]),
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
  
  displayText(param)
  {
    console.log(param);
    
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
        "securityAnswer":this.secAnswer
      }
  ,options).subscribe(data  => {console.log("PUT Request is successful ", data);
    this.display3 = 'none';
    this.display1 = 'none';
    this.display = 'none';
  });
      this.router.navigate(["/loginPage"]);
    }
    else
    {
      console.log("wrong: " + this.setPass + " does not matched with " + this.setAgainPass);
      alert("password doesn't matched");
    }
  }


}
