import { StorageService } from './../_services/storage.service';
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

  constructor(private http:HttpClient, public storageService:StorageService) { }

  formData:Bookmarks = new Bookmarks();
  readonly baseURL = environment.baseURL+'api/Bookmark/'

  list : Bookmarks[];

  postBookmarks(bookmark:Bookmarks): Observable<any>{
    console.log(bookmark);
    return this.http.post(this.baseURL,bookmark,httpOptions);
  }

  getBookmarks(){
    this.http.get(this.baseURL).toPromise().then(
      res =>{ this.list = res as Bookmarks[];
              console.log(res);
              console.log(this.list); 
      })  
      return this.list;
     
  }

  checkBookmark(bookmark:Bookmarks){
    return this.http.post<any>(`${this.baseURL}find`,bookmark,httpOptions);
  }

  deleteBookmark(id:number){
    return this.http.delete(`${this.baseURL}/${id}`,{ withCredentials: true });
  }
}
