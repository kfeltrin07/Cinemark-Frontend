import { Injectable } from '@angular/core';
import { Films } from './films.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class FilmGenreService {

  readonly baseURL = environment.baseURL+'api/Film_Genre';

  addGenreToMovie(newFilm: Films, genre: Number): Observable<any> {
    
    const body = ({
      newFilm: Films,
      genre: Number
    });

    return this.http.post<any>(`${this.baseURL}`,body,httpOptions);
  }


  constructor(private http:HttpClient) { }
}
