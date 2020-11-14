import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchServiceService } from '../search-service.service';
import { ScrollToConfigOptions, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

@Component({
  selector: 'app-add-skills',
  templateUrl: './add-skills.component.html',
  styleUrls: ['./add-skills.component.css']
})
export class AddSkillsComponent implements OnInit {

  frontEnd: string[]=[];
  backEnd: string[]=[];
  db: string[]=[];
  arr1: string[]=[];
  addedSkills:any;
  associateData:any;
  skills:any[]=[];
  id:any;
  dateVal:boolean;
  displayWarning:boolean=false;
  feSkills: string;
  beSkills: string;
  dbSkills: string;
  inputId : string;
  inputEmail : string;
  inputName : string;
  inputMobile : string;
  inputImage: string;
  skillArayLength:number;
  temp:any[];
  associateSkillsData: any;
  associateSkillsDataArr: any[];
  
  constructor(private _scrollToService: ScrollToService,private ser: SearchServiceService, private httpObj: HttpClient,private router: Router, private route: ActivatedRoute) 
  { 

    console.log("skills constructor called");
    let responseData = this.httpObj.get("http://localhost:8088/skills/all");
    responseData.subscribe((response) => {
      console.log("Skills "+response);
       this.associateData = response;

      this.skills = this.associateData;

      let responseData2 = this.httpObj.get("http://localhost:8088/associateSkills/all");
    responseData2.subscribe((response) => {
      console.log(response);
       this.associateSkillsData = response;
       this.associateSkillsDataArr = this.associateSkillsData;
      console.log("array length: "+this.associateSkillsDataArr.length);
      this.skillArayLength = this.associateSkillsDataArr.length;

      

      this.route.params.subscribe(params => {
        this.id = params['id'];
        console.log("constaructor hit "+this.id);});

        let responseData = this.httpObj.get("http://localhost:8088/associateSkills/"+this.id);
    responseData.subscribe((response) => {
      console.log("data for associate id: "+this.id);
      console.log(response);
       this.associateData = response;
      this.temp = this.associateData;
      if(this.temp.length > 0)
      {
      console.log("temp is: "+this.temp[0].sid.skillName);
      this.inputId = this.temp[0].aid.associateId;
      this.inputName = this.temp[0].aid.associateName;
      this.inputEmail = this.temp[0].aid.associateEmail;
      this.inputMobile = this.temp[0].aid.associateMobile;
      this.inputImage = this.temp[0].aid.associateImage;

      
      for(var index1 = 0; index1 < this.temp.length; index1++)
      {
        for(var index = 0; index < this.skills.length; index++)
        {
          if(this.temp[index1].sid.skillName == this.skills[index].skillName)
          {
            console.log(this.skills[index].skillName+" matched");
            this.skills.splice(index,1);
          }
        }
        
      }
    }
    else
    {
      let responseData = this.httpObj.get("http://localhost:8088/associate/"+this.id);
    responseData.subscribe((response) => {
      this.associateData = response;
      console.log(response);
      
      this.inputId = this.associateData.associateId;
      this.inputName = this.associateData.associateName;
      this.inputEmail = this.associateData.associateEmail;
      this.inputMobile = this.associateData.associateMobile;
      this.inputImage = this.associateData.associateImage;

    });
    }
      
      for(var index = 0; index < this.skills.length; index++)
      {
        if(this.skills[index].skillCategory == "FrontEnd")
          this.frontEnd.push(this.skills[index].skillName);
        
        if(this.skills[index].skillCategory == "BackEnd")
          this.backEnd.push(this.skills[index].skillName);  
        
        if(this.skills[index].skillCategory == "Database")
          this.db.push(this.skills[index].skillName);
      }

     });});});

    
    

    // #f5a9cf - pink -- rgb(245, 169, 207) -> rgb(231, 50, 140)
    // #91a8eb - blue -- rgb(145, 168, 235) -> rgb(36, 75, 194)
    // #99ffcc - aqua green -- rgb(153, 255, 204) -> rgb(0, 179, 89)
  }

  ngOnInit() {
  }
  
  onSubmit(params)
  {
   
   this.skillArayLength++;
    console.log(params.value);
    var start, end, experience, duration;
    if(params.value.dpn == undefined)
    {
      console.log("start undefined");
      start = "undefined";
      
    }
    else{

    var startYear = params.value.dpn.year;
    
    
    var startMonth = params.value.dpn.month;
    
    var startDay = params.value.dpn.day;
    
    start = startDay+"/"+startMonth+"/"+startYear;
  }


    if(params.value.cw == false || params.value.dpn1 != undefined)
    { 
      console.log("currently not working");
      
      var endYear = params.value.dpn1.year;
      var endDay = params.value.dpn1.day;
      var endMonth = params.value.dpn1.month;
      end = endDay+"/"+endMonth+"/"+endYear;
      var february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
      var daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      var yearDiff = endYear - startYear;
      var monthDiff = endMonth - startMonth;
    if (monthDiff < 0) {
        yearDiff--;
        monthDiff += 12;
    }
    var dayDiff = endDay - startDay;
    if (dayDiff < 0) {
        if (monthDiff > 0) {
            monthDiff--;
        } else {
            yearDiff--;
            monthDiff = 11;
        }
        dayDiff += daysInMonth[startMonth];
    }
    experience = yearDiff + ' Years ' + monthDiff + ' Months ' + dayDiff + ' Days ';
    console.log(yearDiff + 'Y ' + monthDiff + 'M ' + dayDiff + 'D');
    console.log(yearDiff*365 + monthDiff*30 + dayDiff);
    duration = yearDiff*365 + monthDiff*30 + dayDiff;
    
    }
    else
    {
      console.log("end undefined");
      
      end = "currently working";
      duration = "undefined";
      experience = "undefined";
    }
    

    
    var skillId ; var skillCategory; var certify; var rating;
    for(var index = 0; index < this.skills.length; index++)
      {
        if(this.skills[index].skillName == params.value.skillName)
        {
            skillId = this.skills[index].skillId;
            skillCategory = this.skills[index].skillCategory;
        }
      }

      console.log("certify "+params.value.certify);
      if(params.value.certify==true)
        certify="true";
      else
        certify="false";  

      if(isNaN(params.value.rating))
      {
        console.log("rating undefined");
        
        rating = 0;
      }
      else
      {
        console.log("rating defined");

        rating = params.value.rating;
      }
        console.log("input id: "+this.inputId+" input name: "+this.inputName+" input email: "+ this.inputEmail+" srno: "+skillId+" skill name: "+params.value.skillName+" skill category: "+skillCategory+" "+certify+" "+rating+" "+start+" "+end+" "+duration+" "+experience);
     
        
        if(yearDiff < 0 || monthDiff < 0 || dayDiff < 0 )
        {
          console.log("date val failed");
          this.dateVal = true;
        }   
        else{     
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'});
    
      let options = {
        headers: httpHeaders};

    this.httpObj.put("http://localhost:8088/updateAssociateSkills",
    {
      
        "srNo": this.skillArayLength,
        "aid": {
            "associateId": this.inputId,
            "associateName": this.inputName,
            "associateEmail": this.inputEmail,
            "associateImage": this.inputImage,
            "associateMobile": this.inputMobile
        },
        "sid": {
            "skillName": params.value.skillName,
            "skillCategory": skillCategory,
            "skillId": skillId
        },
        "certification": certify,
        "rating": rating,
        "startDate": start,
        "endDate": end,
        "duration": duration,
        "experience": experience    
    }
  ,options).subscribe(data  => {console.log("PUT Request is successful ", data);
  this.frontEnd.splice(this.frontEnd.indexOf(params.value.skillName),1);
  this.backEnd.splice(this.backEnd.indexOf(params.value.skillName),1);
  this.db.splice(this.db.indexOf(params.value.skillName),1);
  this.arr1.splice(this.arr1.indexOf(params.value.skillName),1);
  error  => {console.log("Error", error);}});}
  }


  searchFeSkills()
  {
    var value = this.feSkills.toLowerCase();
    $("#fe *").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });

  }

  searchBeSkills()
  {
    var value = this.beSkills.toLowerCase();
    $("#be *").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  }

  searchDbSkills()
  {
    var value = this.dbSkills.toLowerCase();
    $("#db *").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  }


  myFunc(skill: string){
    console.log(skill);

    console.log($("#"+skill).css("background-color"));

    if($("#"+skill).css("background-color") == "rgb(245, 169, 207)")
      $("#"+skill).css("background-color","rgb(231, 50, 140)");
    else if($("#"+skill).css("background-color") == "rgb(231, 50, 140)")
      $("#"+skill).css("background-color", "rgb(245, 169, 207)");

    else if($("#"+skill).css("background-color") == "rgb(145, 168, 235)")
      $("#"+skill).css("background-color","rgb(36, 75, 194)");
    else if($("#"+skill).css("background-color") == "rgb(36, 75, 194)")
      $("#"+skill).css("background-color", "rgb(145, 168, 235)");
      
    else if($("#"+skill).css("background-color") == "rgb(153, 255, 204)")
      $("#"+skill).css("background-color","rgb(0, 179, 89)");
    else if($("#"+skill).css("background-color") == "rgb(0, 179, 89)")
      $("#"+skill).css("background-color", "rgb(153, 255, 204)");  


    if(this.arr1.indexOf(skill) > -1)
    {
      console.log("in if. index found: "+this.arr1.indexOf(skill));
      this.arr1.splice(this.arr1.indexOf(skill),1);
      console.log(this.arr1);
    }
    else
    {
      console.log("in else");
      this.arr1.push(skill);
    }
    
    console.log(this.arr1);
    
    // this.addedSkills = "";
    // for(let index = 0; index < this.arr1.length ; index++ )
    //   if(index == 0)  
    //     this.addedSkills = this.arr1[index];
    //   else
    //   this.addedSkills = this.addedSkills + ", " + this.arr1[index];  

  }

  done()
  {
    if(this.arr1.length == 0)
    {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/star',this.id]));
      
      const config: ScrollToConfigOptions = {
        target: 'destination'
      };
    
      this._scrollToService.scrollTo(config);
    }
    else
      this.displayWarning = true;  
  }

}
