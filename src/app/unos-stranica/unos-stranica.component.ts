import { Component } from '@angular/core';
import { FilmsService } from '../_shared/films.service';
import { FilmGenreService } from '../_shared/film-genre.service';
import { Films } from '../_shared/films.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../_services/storage.service';
import { Film_Genre } from '../_shared/film_genre.model';
import { ToastrService } from 'ngx-toastr';
import { UserStoreService } from '../_services/user-store.service';
import { LoginService } from '../_shared/Login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unos-stranica',
  templateUrl: './unos-stranica.component.html',
  styleUrls: ['./unos-stranica.component.css']
})
export class UnosStranicaComponent {

  public role$:string="";

  constructor(private http:HttpClient, public storageService:StorageService, private toastr:ToastrService, public filmService:FilmsService, 
    public filmGenreService:FilmGenreService,private userstore:UserStoreService, private loginService:LoginService, private router:Router) {

    this.userstore.getRoleFromStore()
  .subscribe(val=>{
    let RoleFromToken=this.loginService.getRoleFromToken();
    this.role$=val||RoleFromToken
  })
    
    if(this.role$==="user"){
      this.router.navigate(['']);
    }
  }

  readonly baseURL = environment.baseURL+'api/Films'
  newFilm:Films = new Films;
  idFilm:number;
  idGenre:number;
  genreFilm:Film_Genre = new Film_Genre;
  selectedGenre:number;
  check:boolean=false;
  films: any;

  addNewMovie(){
    const title = document.getElementById("titleID") as HTMLInputElement;
    const director = document.getElementById("directorID") as HTMLInputElement;
    const actor = document.getElementById("actorID") as HTMLInputElement;
    const date = document.getElementById("dateID") as HTMLInputElement;
    const picture = document.getElementById("pictureID") as HTMLInputElement;
    const trailer = document.getElementById("trailerID") as HTMLInputElement;
    const summary = document.getElementById("summaryID") as HTMLInputElement;
    
    this.newFilm.title = title.value;
    this.newFilm.director = director.value;
    this.newFilm.main_actor = actor.value;
    this.newFilm.release_date = date.value;
    this.newFilm.picture_url = picture.value;
    this.newFilm.video_url = trailer.value;
    this.newFilm.summary = summary.value;

    var x = document.getElementById("selectedGenre") as HTMLSelectElement;

    this.selectedGenre = parseInt(x.value);
    

    this.films = this.storageService.getFilms();
    
    for(var film of this.films){
      if(this.newFilm.title == film.title){
        this.check = true;
      }
    }

   if(this.check == false)
    this.AddMovie(this.newFilm, this.selectedGenre);

    //else
      //this.addGenreToMovie(title.value, this.selectedGenre);
  }

   AddMovie(newFilm: Films, genre:Number) {

    this.filmService.newMovie(newFilm).subscribe({ 
      next: res =>{
      this.toastr.success("Success!","Movie Added!")
      },
      error: err => {
        const json = JSON.parse(JSON.stringify(err.error));
        const messageReceived = json.message;
        this.toastr.error(messageReceived);
      }
    });

    this.filmGenreService.addGenreToMovie(newFilm,genre).subscribe({ 
      next: res =>{
      this.toastr.success("Success!","Genre added!")
      },
      error: err => {
        const json = JSON.parse(JSON.stringify(err.error));
        const messageReceived = json.message;
        this.toastr.error(messageReceived);
      }
    });


  }

  /*addGenreToMovie(title:string,genreID:number){
    this.filmService.getFilms();
     this.films = this.storageService.getFilms();
    for(var film of this.films){
      if(film.title == title){
        this.idFilm = film.id_film;
      }
    }

    const genres = this.storageService.getGenres();
    for(var genre of genres){
      if(genre.id_genre == genreID){
        this.idGenre = genre.id_genre;
      }
    }

    this.genreFilm.id_film = this.idFilm;
    this.genreFilm.id_genre = this.idGenre;

    if(this.check==true){
      this.http.post(this.baseURL2,this.genreFilm).subscribe();
      this.toastr.success("Success!","Genre Updated!")
    }
  }*/

  
}


