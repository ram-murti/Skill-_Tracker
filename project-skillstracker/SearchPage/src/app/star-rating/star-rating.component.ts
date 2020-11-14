import { Component, OnInit } from '@angular/core';
import { DropdownSplitComponent } from '../dropdown-split/dropdown-split.component';
import { SearchServiceService } from '../search-service.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpHeaders } from '@angular/common/http'; 
import { FileUploadService } from '../file-upload.service';
import { ScrollToConfigOptions, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {
  display = 'none';
  displayDelete = 'none';
  associateId:any;
  associateData:any;
  temp:any[]=[];
  associateCertified:any[]=[];
  index:number;
  totalDuration:number=0;
  closeResult: string;
  body : string;
  inputId : string;
  inputEmail : string;
  inputName : string;
  inputImage : string;
  inputMobile : string;
  skillmAssoId:string;  
  skillmRating : number;
  skillmCertification:string;
  skillmName : string;
  skillmStartDate : string;
  skillmEndDate : string;
  skillmId : string;
  skillmCategory : string;
  skillmSrno: string;
  onlyAssociateData :any;
  selectedFiles: FileList;
  currentFileUpload: File;
  assImage:any;
  dateVal:boolean;
  public pieChartLabels:string[]=[];
   public pieChartData:number[]=[];
   public pieChartType:string = 'pie';
   public message="Skills deleted...";
   public pieChartColors: Array < any > = [{
    backgroundColor: ['#f5a9cf', '#91a8eb', '#84e8d6','#eddc8e','#91eda8','#e0555c','#e6663c','rgba(148,159,177,0.2)'],
 }];
  constructor(private _scrollToService: ScrollToService,private uploadService: FileUploadService,private route: ActivatedRoute, private httpObj: HttpClient,private modalService: NgbModal, private router:Router) 
  { 
    this.route.params.subscribe(params => {
      this.associateId = params['id'];
      console.log("constaructor hit "+this.associateId);
    
      let responseData = this.httpObj.get("http://localhost:8088/associate/"+this.associateId);
      responseData.subscribe((response) => {
      this.onlyAssociateData = response;
      console.log("temp is: "+this.onlyAssociateData.associateId);
      this.inputId = this.onlyAssociateData.associateId;
      this.inputName = this.onlyAssociateData.associateName;
      this.inputEmail = this.onlyAssociateData.associateEmail;
      this.inputMobile = this.onlyAssociateData.associateMobile;
      this.inputImage = this.onlyAssociateData.associateImage;
      this.totalDuration = 0;
      let responseData = this.httpObj.get("http://localhost:8088/associateSkills/"+this.associateId);
    responseData.subscribe((response) => {
      console.log("data for associate id: "+this.associateId);
      console.log(response);
       this.associateData = response;
      this.temp = this.associateData;
      var today = new Date();
      var endDay = today.getDate();
      var endMonth = today.getMonth() + 1;
      var endYear = today.getFullYear();
      
      console.log(today.getDate()+" "+(today.getMonth() + 1)+" "+today.getFullYear());
      for(this.index = 0; this.index < this.temp.length; this.index++)
      {
        console.log(this.temp[this.index].sid.skillName);
        if(this.temp[this.index].duration == "undefined" && this.temp[this.index].startDate != "undefined")
        {
          console.log("duration undefined for:"+this.temp[this.index].sid.skillName);
          var start = this.temp[this.index].startDate;
          var sdate = start.split("/");
          var startDay = sdate[0];
          var startMonth = sdate[1];
          var startYear = sdate[2];
          console.log("sdate "+sdate[0]+" "+sdate[1]+" "+sdate[2]);
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
    this.temp[this.index].experience = yearDiff + ' Years ' + monthDiff + ' Months ' + dayDiff + ' Days ';
      console.log(yearDiff + 'Y ' + monthDiff + 'M ' + dayDiff + 'D');
      console.log(yearDiff*365 + monthDiff*30 + dayDiff);
      this.temp[this.index].duration = (yearDiff*365 + monthDiff*30 + dayDiff);
      this.totalDuration= this.totalDuration + (yearDiff*365 + monthDiff*30 + dayDiff);
       console.log("tot duration :"+this.totalDuration);
          

        }
        else if(this.temp[this.index].startDate == "undefined")
        {
          console.log("start date undefined");
          this.totalDuration= this.totalDuration + 0;
        }
        else{
          this.totalDuration= this.totalDuration + parseInt(this.temp[this.index].duration,10);
          console.log("total duration: "+this.totalDuration);
        }
      }
      
      for(this.index = 0; this.index < this.temp.length; this.index++)
      {

        this.pieChartLabels[this.index]=this.temp[this.index].sid.skillName;
        this.pieChartData[this.index]=(this.temp[this.index].duration/this.totalDuration)*100;
        console.log("calculated duration"+(this.temp[this.index].duration/this.totalDuration)*100);
        if(this.temp[this.index].certification == "true")
            this.associateCertified[this.index] = true;
        else
            this.associateCertified[this.index] = false;
      }

      console.log("piedata:" +this.pieChartData);
      console.log("pielabel:"+this.pieChartLabels);
     });
    });
    });
  }

  ngOnInit() 
  {
    
  }
  logout()
  {
    this.router.navigate(['/loginPage']);
    localStorage.clear();
  }

  selectFile(event) 
{
  this.selectedFiles = event.target.files;
}  
upload() 
{
    this.currentFileUpload = this.selectedFiles.item(0);
    console.log("File name: "+ this.selectedFiles.item(0).name);
    this.assImage="http://127.0.0.1:8887/"+this.selectedFiles.item(0).name;
     this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
     if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');  
        let httpHeaders = new HttpHeaders({
          'Content-Type' : 'application/json',
          'Cache-Control': 'no-cache'});
        
          let options = {
            headers: httpHeaders};
        this.httpObj.post("http://localhost:8088/saveAssociate",
        {
      "associateId": this.inputId,
      "associateName": this.inputName,
      "associateEmail": this.inputEmail,
      "associateImage": this.assImage,
      "associateMobile": this.inputMobile
      }
  ,options).subscribe(data  => {console.log("PUT Request is successful ", data); 
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate(['/searchPage/star',this.associateId]));
  const config: ScrollToConfigOptions = {
    target: 'destination'
  };

  this._scrollToService.scrollTo(config);
},
  error  => {console.log("Error", error);
  });     
      }
    });
    this.selectedFiles = undefined;
}

  addSkills()
  {
    
    this.router.navigate(['/star',this.associateId,'displaySkills',this.associateId]);
    const config: ScrollToConfigOptions = {
      target: 'addDestination'
    };
  
    this._scrollToService.scrollTo(config);
  }

  saveUpdate()
  {
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'});
    
      let options = {
        headers: httpHeaders};

    this.httpObj.put("http://localhost:8088/updateAssociate",
    {
      "associateId": this.inputId,
      "associateName": this.inputName,
      "associateEmail": this.inputEmail,
      "associateImage": null,
      "associateMobile": this.inputMobile
    }
  ,options).subscribe(data  => {console.log("PUT Request is successful ", data); 
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate(['/star',this.associateId]));
  const config: ScrollToConfigOptions = {
    target: 'destination'
  };

  this._scrollToService.scrollTo(config);
},
  error  => {console.log("Error", error);});
    
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log("close1");
      this.saveUpdate();
    }, (reason) => {
      console.log("close2");
      this.saveUpdate();
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  sendMail()
  {
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'});
    
      let options = {
        headers: httpHeaders};
        console.log(this.inputId + this.inputName + "  body  "+ this.body + this.inputEmail + this.inputMobile + this.inputImage );
     
        if(this.body == undefined)
        {
          this.body = "welcome";
        }

        console.log(this.body);
        alert("Mail Sent Successfully!!!");
        this.httpObj.post("http://localhost:8088/send-mail",
        {
          "message" : this.body,
          "mail" : this.inputEmail
     }
  ,options).subscribe(data  => {console.log("PUT Request is successful ", data); 

})
  error  => {console.log("Error", error);}
  }
  
  openDelete(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log("close1");
      this.deleteAssociate();
    }, (reason) => {
      console.log("close2");
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  
  openModal(assoId:any, skillId:any)
  {
    console.log(assoId,skillId);
    this.display='block';
    this.skillmAssoId = assoId;
    for(this.index=0; this.index<this.temp.length;this.index++)
    {
      if(this.temp[this.index].sid.skillId == skillId)
      {
        console.log("matched for: "+this.temp[this.index].sid.skillId);
        this.skillmName = this.temp[this.index].sid.skillName;
        this.skillmSrno = this.temp[this.index].srNo;  
        this.skillmId = this.temp[this.index].sid.skillId;
        this.skillmCategory = this.temp[this.index].sid.skillCategory;      
      }
    }
  }

  deleteSkill(srNo:any)
  {
    console.log(srNo);
    console.log("deleted");
    if (!confirm('Are you sure?')) return false;
    this.httpObj.delete("http://localhost:8088/deleteAssociateSkill/"+srNo).subscribe(data  => {console.log("PUT Request is successful ", data);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate(['/star',this.associateId]));
  const config: ScrollToConfigOptions = {
    target: 'destination'
  };

  this._scrollToService.scrollTo(config);
    error  => {console.log("Error", error);}});
  }
  onSubmit(params)
  {
    console.log("in submit");
    
    console.log(params.value);
    var startYear = params.value.dp.year;
    var endYear = params.value.dp1.year;
    var endMonth = params.value.dp1.month;
    var startMonth = params.value.dp.month;
    var endDay = params.value.dp1.day;
    var startDay = params.value.dp.day;
    
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
    console.log(yearDiff + 'Y ' + monthDiff + 'M ' + dayDiff + 'D');
    console.log(yearDiff*365 + monthDiff*30 + dayDiff);
    var duration = yearDiff*365 + monthDiff*30 + dayDiff;
    var certify; var experience = yearDiff + ' Years ' + monthDiff + ' Months ' + dayDiff + ' Days';
    if(params.value.certify==true)
        certify="true";
      else
        certify="false";

        console.log(this.skillmSrno+" "+ this.inputId+" "+ this.inputName+" "+this.inputEmail+" "+this.inputImage+
        " "+this.inputMobile+" "+this.skillmName+" "+this.skillmCategory+" "+certify+" "+this.skillmId+" "+this.skillmRating);
    
    console.log("date diif: "+yearDiff + " "+ monthDiff+ " "+dayDiff);
        
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
      
        "srNo": this.skillmSrno,
        "aid": {
            "associateId": this.inputId,
            "associateName": this.inputName,
            "associateEmail": this.inputEmail,
            "associateImage": this.inputImage,
            "associateMobile": this.inputMobile
        },
        "sid": {
            "skillName": this.skillmName,
            "skillCategory": this.skillmCategory,
            "skillId": this.skillmId
        },
        "certification": certify,
        "rating": this.skillmRating,
        "startDate": startDay+"/"+startMonth+"/"+startYear,
        "endDate": endDay+"/"+endMonth+"/"+endYear,
        "duration": duration,
        "experience": experience
    }
  ,options).subscribe(data  => {console.log("PUT Request is successful ", data);
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate(['/star',this.associateId]));
  const config: ScrollToConfigOptions = {
    target: 'destination'
  };

  this._scrollToService.scrollTo(config);
  error  => {console.log("Error", error);}});
  }
  }
  onCloseHandled()
  {
    this.display='none';
  }

  openDeleteModal()
  {
    this.displayDelete = 'block';
  }

  deleteAssociate()
  {
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'});
    
      let options = {
        headers: httpHeaders};
    console.log("in delete associate "+this.temp[0]);
    
      this.httpObj.delete("http://localhost:8088/deleteAssociateSkillByAid/"+this.associateId,
      ).subscribe(data  => {console.log("PUT Request for delete skill is successful ", data);
      error  => {console.log("Error", error);}
    
    this.httpObj.delete("http://localhost:8088/deleteAssociate/"+this.associateId).subscribe(data  => {console.log("PUT Request is successful ", data);
    this.router.navigate(['/searchPage']);
    error  => {console.log("Error", error);}});});
  }
  
  
}
