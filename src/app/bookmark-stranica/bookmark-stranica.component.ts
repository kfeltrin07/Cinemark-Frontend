import { BookmarksService } from './../shared/bookmarks.service';
import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../shared/films.service';
import { Films } from '../shared/films.model';
import { RouterLink } from '@angular/router';
import { FilmStranicaComponent } from '../film-stranica/film-stranica.component';
import { StorageService } from '../_services/storage.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-bookmark-stranica',
  templateUrl: './bookmark-stranica.component.html',
  styleUrls: ['./bookmark-stranica.component.css']
})

export class BookmarkStranicaComponent implements OnInit {

  form: any = {
    id_user:null,
    id_film:null
  };
  
  selectedFilm:Films;
  constructor(public service:FilmsService,public storage:StorageService,private toastr:ToastrService, public bookmarkservice: BookmarksService) {}

  ngOnInit(): void {
    
  }
 
  updateSelectedFilm(film:string){
    this.service.updateFilmByName(film);
  }

  saveBookmarks(id_film:any){
    if(this.storage.isLoggedIn()==true){
      var id=this.storage.getUserID();
      this.form.id_user=id.id_user;
      this.form.id_film=id_film;
      this.bookmarkservice.checkBookmark(this.form).subscribe(
        res=>{
          this.bookmarkservice.postBookmarks(this.form).subscribe(
            res=>{
              console.log("Dodan Bookmark");
              },
            err=>{
              console.log(err);
              console.log("Greška kod unosa");
              }
            );
            },
        err=>{
          this.toastr.error("Već ste bookmarkali određen film");
          console.log("Već ste bookmarkali određen film");
          console.log(err);
        });
    }
    else{
      this.toastr.error("You Can't bookmark if you are not logged in");
      console.error("You Can't bookmark if you are not logged in");
    }
  }
}
