import { Component } from '@angular/core';
import { FilmsService } from '../_shared/films.service';
import { Films } from '../_shared/films.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../_services/storage.service';
import { Film_Genre } from '../_shared/film_genre.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-unos-stranica',
  templateUrl: './unos-stranica.component.html',
  styleUrls: ['./unos-stranica.component.css']
})
export class UnosStranicaComponent {

  constructor(private http:HttpClient, public storageService:StorageService, private toastr:ToastrService, public filmService:FilmsService) {}

  readonly baseURL = environment.baseURL+'api/Films'
  readonly baseURL2 = environment.baseURL+'api/Film_Genre'
  newFilm:Films = new Films;
  idFilm:number;
  idGenre:number;
  genreFilm:Film_Genre = new Film_Genre;
  selectedGenre:number;
  check:boolean=false;

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
    console.log(this.newFilm);

    this.selectedGenre = parseInt(x.value);

    const films = this.storageService.getFilms();
    for(var film of films){
      if(this.newFilm.title == film.title){
        this.check = true;
      }
    }

   if(this.check == false){
      this.http.post(this.baseURL,this.newFilm).subscribe();
      this.toastr.success("Success!","Movie Added!")
    }
    this.filmService.getFilms();
    this.addGenreToMovie(title.value, this.selectedGenre);
  }

  addGenreToMovie(title:string,genreID:number){
    this.filmService.getFilms();
    const films = this.storageService.getFilms();
    for(var film of films){
      if(film.title == title){
        this.idFilm = film.id_film;
      }
    }

    console.log(films);

    const genres = this.storageService.getGenres();
    for(var genre of genres){
      if(genre.id_genre == genreID){
        this.idGenre = genre.id_genre;
      }
    }

    this.genreFilm.id_film = this.idFilm;
    this.genreFilm.id_genre = this.idGenre;

    console.log(this.genreFilm);

    if(this.check==true){
      this.http.post(this.baseURL2,this.genreFilm).subscribe();
      this.toastr.success("Success!","Genre Updated!")
    }
  }

}
