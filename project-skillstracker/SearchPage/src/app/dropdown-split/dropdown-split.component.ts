import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { SearchServiceService } from '../search-service.service';
import { CardsDemoComponent } from '../cards-demo/cards-demo.component';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileUploadService } from '../file-upload.service';
import { ScrollToConfigOptions, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';


@Component({
  selector: 'app-dropdown-split',
  templateUrl: './dropdown-split.component.html',
  styleUrls: ['./dropdown-split.component.css']
})
export class DropdownSplitComponent implements OnInit {

  associateData: any;
  associateSkillsData: any;
  associateSkillsDataArr: any[];
  associateSearched:any[] = [];
  tempskills:any[] = [];
  associateSkills:any[]=[];
  associateId:any;
  selectedOption : string = 'Name';
  searchOn : string;
  sortBy: string = 'Sort By';
  sortFlag :boolean = true;
  sortOn:string[];
  index : number;
  typed : string;
  skills:any[];
  skillArray:any[] = [];
  tempo:any;
  temp:number;
  enableSearch : boolean = true;
  searchPlaceholder :string = 'Search Associate';
  sorta:string;
  test:any;
  skill:any;
  display= 'none';
  display1 = "none";
  namePattern = '^[a-zA-z \s]+$';
  mobilePattern = '^[0-9]{10}$';
  previewPhoto =false;
  assoc:any;
  numOfInput:any;
  arr : number[]=[];
  skillName:any[]=[];
  categoryName:any[]=[];
assId:string;
assName:string;
assEmail:string;
assMobile:number;
assImage:string;
selectedFiles: FileList;
currentFileUpload: File;
url1 : any

selectFile(event) 
{
  this.selectedFiles = event.target.files;
}  
upload() 
{
    this.currentFileUpload = this.selectedFiles.item(0);
    console.log("File name: "+ this.selectedFiles.item(0).name);
    this.assImage="http://127.0.0.1:8887/"+this.selectedFiles.item(0).name;
    console.log(this.assImage);
    this.url1= `C:/Users/B4ibmjava30/Documents/project-skillstracker/SkillsTracker/ProfilePictureStore/${this.selectedFiles.item(0).name}`
    this.url1.split('/').join('s');
    console.log(this.url1);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
     if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');       
      }
    });
    this.selectedFiles = undefined;
}
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,private _scrollToService: ScrollToService,private uploadService: FileUploadService,private httpObj: HttpClient,private ser: SearchServiceService, private card: CardsDemoComponent, private router: Router) 
  {     
    console.log(" local storage length "+localStorage.length);
    if(localStorage.length == 0)
    {
      this.router.navigate(['/loginPage']);
    }
    
    console.log("service constructor called");
    let responseData = this.httpObj.get("http://localhost:8088/associate/all");
    responseData.subscribe((response) => {
      console.log(response);
       this.associateData = response;
     });
     
     console.log("data fetched in"+this.associateData);

     let responseData2 = this.httpObj.get("http://localhost:8088/associateSkills/all");
    responseData2.subscribe((response) => {
      console.log(response);
       this.associateSkillsData = response;
       this.associateSkillsDataArr = this.associateSkillsData;
     });
  }

  ngOnInit() {
    window.history.forward();
  }

  form = new FormGroup({
    assId : new FormControl('',[Validators.required, Validators.minLength(3)]),
    assName: new FormControl('',[Validators.required, Validators.pattern(this.namePattern)]),
    assEmail : new FormControl('',[Validators.required, Validators.email]),
    assMobile : new FormControl('',[Validators.required,Validators.pattern(this.mobilePattern)]),
    url1 : new FormControl('')
  })
  viewAssociate(id: string)
  {
    console.log("button clicked for: "+id);
    this.ser.associateId = id;
    this.associateSearched.length = 0;
    this.router.navigate(['/star',id]);
    const config: ScrollToConfigOptions = {
      target: 'destination'
    };
 
    this._scrollToService.scrollTo(config);
  }

  saveAssociate()
  {
    console.log(this.assName+" "+this.assId +" "+this.assEmail+" "+this.assMobile+" "+this.assImage);
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'});
    
      let options = {
        headers: httpHeaders};

    this.httpObj.post("http://localhost:8088/saveAssociate",
    {
      "associateId": this.assId,
      "associateName": this.assName,
      "associateEmail": this.assEmail,
      "associateImage": this.url1,
      "associateMobile": this.assMobile
    }
  ,options).subscribe(data  => {console.log("PUT Request is successful ", data); 
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate(['/star',this.assId,'displaySkills',this.assId]));
  const config: ScrollToConfigOptions = {
    target: 'addDestination'
  };

  this._scrollToService.scrollTo(config);
  });
  }

  togglePhotoPreview(){
    this.previewPhoto = !this.previewPhoto;
    console.log(this.url1);
  }
   
openModal(){
    this.display ='block';
  }
  onClose(){
    this.display ='none';
  }

  openNewSkills()
  {
    this.display1 = "block";
  }
  onCloseHandled()
  {
    this.display1 = "none";
  }
  logout()
  {
    this.router.navigate(['/loginPage']);
    localStorage.clear();
  }
  scrollUpToSearch()
  {
    const config: ScrollToConfigOptions = {
      target: 'searchDestination'
    };
  
    this._scrollToService.scrollTo(config);
  }
  getNum()
  {
    console.log(this.numOfInput);
    this.arr.length=0;
    for (let i = 0; i <this.numOfInput; i++) {
      this.arr[i]=i;
      
    }
  }

  onSubmit(params)
 {
   console.log(params.value);
   let responseData = this.httpObj.get("http://localhost:8088/skills/all");
    responseData.subscribe((response) => {
      console.log("Skills "+response);
       this.tempo = response;
       this.skills = this.tempo;
       var length = this.skills.length + 1;
       for(var index = 0; index < this.numOfInput; index++)
       {
         
           this.skill = {'skillName':this.skillName[index],
                    'skillCategory':this.categoryName[index],
                    'skillId':(length+100)
                  };
         
         length++;
        console.log(this.skillName[index]);
        console.log(this.categoryName[index]);
        this.skillArray.push(this.skill);
       }
       

       console.log(this.skillArray);

       let httpHeaders = new HttpHeaders({
        'Content-Type' : 'application/json',
        'Cache-Control': 'no-cache'});
      
        let options = {
          headers: httpHeaders};
  
      this.httpObj.post("http://localhost:8088/saveSkills",this.skillArray
    ,options).subscribe(data  => {console.log("PUT Request is successful ", data); this.display1="none";
    });
    });
  }

  @ViewChild('searchBarFocus',{static: false}) inputEl:ElementRef;

  searchCall()
  {
    this.associateSearched.length = 0;
    this.associateSkills.length = 0;
    console.log(this.typed+" typed");
    this.index = 0;
    if(this.typed.length!=0 )
    {
      if(this.selectedOption == 'Id')
      {
        console.log("Searching on id");
        for(let temp of this.associateData)
        {
      
          if(temp.associateId.toLowerCase().includes(this.typed.toLowerCase()))
          {
            console.log(temp.associateId +"starts with "+this.typed);
            this.associateSearched[this.index] = temp;
            console.log("searchCall "+ this.associateSearched[this.index]);
            this.index++;
          }
        }
        
      }

      if(this.selectedOption == 'Name')
      {
        console.log("Searching on name");
        for(let temp of this.associateData)
        {
      
          if(temp.associateName.toLowerCase().includes(this.typed.toLowerCase()))
          {
            console.log(temp.associateName +"starts with "+this.typed);
            this.associateSearched[this.index] = temp;
            console.log("searchCall "+ this.associateSearched[this.index]);
            this.index++;
          }
        }
      }

      if(this.selectedOption == 'Email')
      {
        console.log("Searching on email");
        for(let temp of this.associateData)
        {
      
          if(temp.associateEmail.toLowerCase().includes(this.typed.toLowerCase()))
          {
            console.log(temp.associateEmail +"starts with "+this.typed);
            this.associateSearched[this.index] = temp;
            console.log("searchCall "+ this.associateSearched[this.index]);
            this.index++;
          }
        }
      }

      if(this.selectedOption == 'Mobile')
      {
        console.log("Searching on mobile");
        for(let temp of this.associateData)
        {
      
          if(temp.associateMobile.includes(this.typed))
          {
            console.log(temp.associateMobile +"starts with "+this.typed);
            this.associateSearched[this.index] = temp;
            console.log("searchCall "+ this.associateSearched[this.index]);
            this.index++;
          }
        }
      }

      if(this.selectedOption == 'Skill Name')
      {
        console.log("searching on skills");
        console.log(this.associateSkillsDataArr);
        for(let temp of this.associateSkillsDataArr)
        {
          if(temp.sid.skillName.toLowerCase().includes(this.typed.toLowerCase()))
          {
            console.log(temp.sid.skillName +"starts with "+this.typed);
            console.log(temp.aid);
            this.associateSearched[this.index] = temp.aid;
            this.associateSkills[this.index] = temp;
            console.log("searchCall "+ this.associateSearched[this.index]);
            this.index++;
          }
        }

        console.log("search completed");
        console.log(this.associateSearched);
      }
      
      this.associateSearched = this.associateSearched;
      
    }
  }

  
  selectedSort()
  {
    
    if(this.sorta == 'Id')
      this.associateSearched = this.sortByKey(this.associateSearched, 'associateId');
    if(this.sorta == 'Name')
      this.associateSearched = this.sortByKey(this.associateSearched, 'associateName'); 
    if(this.sorta == 'Email')
      this.associateSearched = this.sortByKey(this.associateSearched, 'associateEmail');
    if(this.sorta == 'Mobile')
      this.associateSearched = this.sortByKey(this.associateSearched, 'associateMobile');     
    
  }

  sortOnSkill(s)
  {
    if(s == 'Expirience')
    {
      this.sortBy = "Sort On Experience";
      this.associateSearched.length = 0;
      this.tempskills = this.sortByKey(this.associateSkills, 'duration');
      this.temp = 0;
      for(this.index = this.tempskills.length - 1; this.index >= 0;this.index--)
        this.associateSearched[this.temp++] = this.tempskills[this.index].aid;
    }
    if(s == 'Certification')
    {
      this.sortBy = "Sort on certification";
      this.associateSearched.length = 0;
      for(this.index = 0; this.index < this.associateSkills.length;this.index++)
      {
        console.log(this.associateSkills[this.index].certification);
        if(this.associateSkills[this.index].certification == "true")
        {  this.associateSearched[this.index] = this.associateSkills[this.index].aid;
          console.log("true for "+this.associateSkills[this.index].aid.associateId);
        }
      }
    }if(s == 'Rating')
    {
      this.sortBy = "Sort On Rating";
      this.associateSearched.length = 0;
      this.tempskills = this.sortByKey(this.associateSkills, 'rating');
      this.temp = 0;
      for(this.index = this.tempskills.length - 1; this.index >= 0;this.index--)
      {
        this.associateSearched[this.temp++] = this.tempskills[this.index].aid;
      }
    } 
  }

  sortByKey(array : any, key : any) : any
  {
    console.log("sorting on string :"+ key);
    return array.sort(function(a, b) 
    {
      var x = a[key]; var y = b[key];
      console.log(x+" "+y);
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
  selectedsort(stk : string){
    this.sorta=stk;
    this.sortFlag = true;
    this.enableSearch = true;
    if(this.sorta == 'Id')
    {
      this.searchPlaceholder = 'Search Associate By ID';
      this.sortBy = 'Sort Associate ID';
      this.sortOn = [];
    }
    if(this.sorta == 'Name')
    {
  
      this.searchPlaceholder = 'Search Associate By Name';
      this.sortBy = 'Sort Associate'
      this.sortOn = [];
    }
    if(this.sorta == 'Email')
    {
  
      this.searchPlaceholder = 'Search Associate By Email';
      this.sortBy = 'Sort Associate Email';
      this.sortOn = [];
    }
    if(this.sorta == 'Mobile')
    {
      
      this.searchPlaceholder = 'Search Associate By Mobile';
      this.sortBy = 'Sort Associate Mobile ';
      this.sortOn = [];
    }
    if(this.sorta == 'Skill Name')
    {
      this.searchPlaceholder = 'Search Associate By Skill Name';
      this.sortBy = 'Sort Associate Skills By';
      this.sortOn = ['Expirience', 'Certification' , 'Rating'];
    }
  }
  selected(option :string)
  {
    this.selectedOption = option;
    this.sortFlag = true;
    this.enableSearch = true;
  
    console.log("button click");
    
    this.inputEl.nativeElement.focus();
    
  }
}
