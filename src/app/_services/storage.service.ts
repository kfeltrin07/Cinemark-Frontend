import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
const USERS_KEY = 'users';
const USER_KEY2 = 'auth-user-ID';
const BOOKMARKS_KEY= 'bookmark';
const FILMS_KEY= 'films';
const FILM_KEY= 'film';
const GENRES_KEY= 'genres';
const FILMGENRES_KEY= 'filmgenres';
const COMMENTS_KEY= 'comments';
const RATINGS_KEY= 'ratings';



@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    console.error();
  }

  public saveUserID(ID: any): void {
    window.sessionStorage.removeItem(USER_KEY2);
    window.sessionStorage.setItem(USER_KEY2, JSON.stringify(ID));
    console.error();
  }

  public saveUsers(users: any): void {
    window.sessionStorage.removeItem(USERS_KEY);
    window.sessionStorage.setItem(USERS_KEY, JSON.stringify(users));
    console.error();
  }

  public saveBookmarks(bookmarks: any): void {
    window.sessionStorage.removeItem(BOOKMARKS_KEY);
    window.sessionStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    console.error();
  }

  public saveFilms(films: any): void {
    window.sessionStorage.removeItem(FILMS_KEY);
    window.sessionStorage.setItem(FILMS_KEY, JSON.stringify(films));
    console.error();
  }

  public saveFilm(film: any): void {
    window.sessionStorage.removeItem(FILM_KEY);
    window.sessionStorage.setItem(FILM_KEY, JSON.stringify(film));
    console.error();
  }

  public saveGenres(genres: any): void {
    window.sessionStorage.removeItem(GENRES_KEY);
    window.sessionStorage.setItem(GENRES_KEY, JSON.stringify(genres));
    console.error();
  }

  public saveFilmGenres(filmgenres: any): void {
    window.sessionStorage.removeItem(FILMGENRES_KEY);
    window.sessionStorage.setItem(FILMGENRES_KEY, JSON.stringify(filmgenres));
    console.error();
  }

  public saveComments(comments: any): void {
    window.sessionStorage.removeItem(COMMENTS_KEY);
    window.sessionStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
    console.error();
  }

  public saveRatings(ratings: any): void {
    window.sessionStorage.removeItem(RATINGS_KEY);
    window.sessionStorage.setItem(RATINGS_KEY, JSON.stringify(ratings));
    console.error();
  }

  public getUser(): any {
    const vars = window.sessionStorage.getItem(USER_KEY);
    if (vars) {
      return JSON.parse(vars);
    }

    return {};
  }

  public getUsers(): any {
    const vars = window.sessionStorage.getItem(USERS_KEY);
    if (vars) {
      return JSON.parse(vars);
    }

    return {};
  }

  public getFilms(): any {
    const vars = window.sessionStorage.getItem(FILMS_KEY);
    if (vars) {
      return JSON.parse(vars);
    }

    return {};
  }

  public getFilm(): any {
    const vars = window.sessionStorage.getItem(FILM_KEY);
    if (vars) {
      return JSON.parse(vars);
    }

    return {};
  }

  public getBookmarks(): any {
    const vars = window.sessionStorage.getItem(BOOKMARKS_KEY);
    if (vars) {
      return JSON.parse(vars);
    }

    return {};
  }

  public getGenres(): any {
    const vars = window.sessionStorage.getItem(GENRES_KEY);
    if (vars) {
      return JSON.parse(vars);
    }

    return {};
  }

  public getFilmGenres(): any {
    const vars = window.sessionStorage.getItem(FILMGENRES_KEY);
    if (vars) {
      return JSON.parse(vars);
    }

    return {};
  }

  public getComments(): any {
    const vars = window.sessionStorage.getItem(COMMENTS_KEY);
    if (vars) {
      return JSON.parse(vars);
    }

    return {};
  }

  public getUserID(): any {
    const vars = window.sessionStorage.getItem(USER_KEY2);
    if (vars) {
      return JSON.parse(vars);
    }

    return {};
  }

  public getRatings(): any {
    const vars = window.sessionStorage.getItem(RATINGS_KEY);
    if (vars) {
      return JSON.parse(vars);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}