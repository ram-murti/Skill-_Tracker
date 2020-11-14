import { Injectable } from '@angular/core';
import { HttpClient,HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) 
  { 

  }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> 
  {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', 'http://localhost:8088/profile/uploadpicture', formdata, {
      reportProgress: true,
      responseType: 'text'
    }
    );
    return this.http.request(req);
  }
}
