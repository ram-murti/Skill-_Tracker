import { Component, OnInit } from '@angular/core';
import { SearchServiceService } from '../search-service.service';

@Component({
  selector: 'app-cards-demo',
  templateUrl: './cards-demo.component.html',
  styleUrls: ['./cards-demo.component.css']
})
export class CardsDemoComponent implements OnInit {

  associateSearched: any[] = [];
  constructor(private ser: SearchServiceService) 
  { 
    
  }

  ngOnInit() {
    
  }
  

}
