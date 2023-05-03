import { BookmarksService } from './../shared/bookmarks.service';
import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../shared/films.service';
import { Films } from '../shared/films.model';
import { RouterLink } from '@angular/router';
import { FilmStranicaComponent } from '../film-stranica/film-stranica.component';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-bookmark-stranica',
  templateUrl: './bookmark-stranica.component.html',
  styleUrls: ['./bookmark-stranica.component.css']
})

export class BookmarkStranicaComponent implements OnInit {

  form: any = {
    id_bookmark:null,
    id_user:null,
    id_film:null
  };
  
  selectedFilm:Films;
  constructor(public service:FilmsService,public storage:StorageService, public bookmarkservice: BookmarksService) {}

  ngOnInit(): void {
    
  }
 
  updateSelectedFilm(film:string){
    this.service.updateFilmByName(film);
  }

  saveBookmarks(id_film:any){
    if(this.storage.isLoggedIn()==true){
      this.form.id_user=this.storage.getUserID();
      this.form.id_film=id_film;
      this.bookmarkservice.postBookmarks(this.form.value).subscribe(
        res=>{
            console.log("Bookmark added");
        },
        err=>{
            console.log(err);
        }
      );
    }
    else{
      console.error("You Can't bookmark if you are not logged in");
    }
  }
}
