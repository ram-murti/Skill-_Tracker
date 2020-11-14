import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService 
{
  
  showCards: boolean = false;
  associateId:any;
  email:any;
  constructor(private httpObj: HttpClient) 
  { 
    
  }
}
