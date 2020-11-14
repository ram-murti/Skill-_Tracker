import{Component, Injectable, OnInit} from'@angular/core'
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feed } from '../model/feed';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
  })
  
@Component({
    selector:'home',
    templateUrl:'./home.component.html'
})


export class HomeComponent implements OnInit{
  display = "none";
    private feedUrl: string = 'https://www.who.int/rss-feeds/news-english.xml';
  private rssToJsonServiceBaseUrl: string = 'https://rss2json.com/api.json?rss_url='
private feed:any;
private feeds :any;
constructor(private http: HttpClient) { }

  ngOnInit() {
this.refreshFeed();

}
openModal(){
  this.display = "block";
}
onClose()
  {
    this.display = "none";
  }

refreshFeed() {
    // Adds 1s of delay to provide user's feedback.
    this.getFeedContent(this.feedUrl)
        .subscribe(
          feed => this.feeds = feed.items,
            
            );
  }
 
  
  

  getFeedContent(url: string): Observable<Feed> {
    return this.http.get(this.rssToJsonServiceBaseUrl + url)
            .pipe(map(this.extractFeeds));
            

  }
  private extractFeeds(res: Response): Feed {
    this.feed = res;
    return this.feed;
  }

}
