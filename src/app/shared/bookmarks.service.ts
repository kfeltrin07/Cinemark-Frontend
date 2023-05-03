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
  readonly baseURL = environment.baseURL+'api/Bookmarks/'

  list : Bookmarks[];

  postBookmarks(bookmark:any): Observable<any>{
    this.formData=bookmark;
    return this.http.post(this.baseURL,this.formData,httpOptions);
  }

  getBookmarks(){
    return this.http.put(`${this.baseURL}/${this.formData.id_user}`,this.formData,httpOptions);
  }
}
