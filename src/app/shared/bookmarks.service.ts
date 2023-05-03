import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Bookmarks } from './bookmarks.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class BookmarksService {

  constructor(private http:HttpClient) { }

  formData:Bookmarks = new Bookmarks();
  readonly baseURL = environment.baseURL+'api/Bookmark/'

  list : Bookmarks[];

  postBookmarks(bookmark:Bookmarks): Observable<any>{
    console.log(bookmark);
    return this.http.post(this.baseURL,bookmark,httpOptions);
  }

  getBookmarks(){
    return this.http.get(this.baseURL).toPromise().then(
      res => this.list = res as Bookmarks[]);
  }

  checkBookmark(bookmark:Bookmarks){
    return this.http.post<any>(`${this.baseURL}find`,bookmark,httpOptions);
  }
}
