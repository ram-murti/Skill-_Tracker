import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-skills-to-associate',
  templateUrl: './add-skills-to-associate.component.html',
  styleUrls: ['./add-skills-to-associate.component.css']
})
export class AddSkillsToAssociateComponent implements OnInit {

  temp:string;
  id:any;
  associateSkills:string[]=[];
  param:string[]=[];
  _MS_PER_DAY = 1000 * 60 * 60 * 24;
  constructor(private route: ActivatedRoute, private httpObj: HttpClient,private modalService: NgbModal, private router:Router) 
  { 
    this.route.params.subscribe(params => {
      this.temp = params['skillString'];
      this.id = params['id'];
      this.associateSkills = this.temp.split(",");
      for(var temp = 0; temp < this.associateSkills.length; temp++)
        this.associateSkills[temp] = this.associateSkills[temp].trim();
      console.log("constructor hit "+this.associateSkills+" "+this.id);
      this.param = this.associateSkills;
    });
  }

  onSubmit(params)
  {

    console.log(params.value);
    
    var startYear = params.value.dpn.year;
    var endYear = params.value.dpn1.year;
    var endMonth = params.value.dpn1.month;
    var startMonth = params.value.dpn.month;
    var endDay = params.value.dpn1.day;
    var startDay = params.value.dpn.day;
    // var year = parseInt(params.value.dpn1.year) - parseInt(params.value.dpn.year);
    // var months = parseInt(params.value.dpn1.month) - parseInt(params.value.dpn.month);
    // var days = parseInt(params.value.dpn1.day) - parseInt(params.value.dpn.day);
    // console.log(year+ " years, "+months+" months, "+days+" days");
    // console.log(year*365 + months*30 + days + " Days")

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
  }

  ngOnInit() 
  {
  }

}
