import { Films } from './films.model';
import { FilmsService } from './films.service';
import { Film_Genre } from './film_genre.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Genres } from './genre.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http:HttpClient, public filmservice:FilmsService) { }

  GenreData:Genres = new Genres();
  Film_GenreData:Film_Genre=new Film_Genre();

  listGenres:Genres[];
  listFilmGenre: Film_Genre[];

  selectedGenres:string[];
  selectedFilmGenres:number[];

  selectedfilm:Films;

  selectedGenre:Genres;
  selectedFilmGenre:Film_Genre;

  readonly baseURL = environment.baseURL+'api/Genres/'
  readonly baseURL2 = environment.baseURL+'api/Film_Genre/'


  GetGenres(){
    this.http.get(this.baseURL).toPromise().then(
      res =>{ this.listGenres = res as Genres[]; 
      },
      err=>{
              console.log(err);
      }) 
  }

  GetFilmGenre(){
    this.http.get(this.baseURL2).toPromise().then(
      res =>{ this.listFilmGenre = res as Film_Genre[];  
      },
      err=>{
              console.log(err);
      })  
  }

  GenreForFilm(idfilm:number){
    this.GetFilmGenre();
    this.GetGenres();

    this.selectedGenres=[];
    this.selectedFilmGenres=[];

    console.log(idfilm);
    for(var filmgenres of this.listFilmGenre){
      if(idfilm == filmgenres.id_film){
        console.log(filmgenres.id_genre)
        for(var genres of this.listGenres){
          if(genres.id_genre == filmgenres.id_genre){          
            this.selectedGenres.push(genres.name);
            console.log(this.selectedGenres);
          }
        }
      } 
    } 
    
    console.log(this.selectedGenres);   
    return this.selectedGenres;
  }
}

