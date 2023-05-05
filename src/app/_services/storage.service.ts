import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
const USER_KEY2 = 'auth-user-ID';

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
    console.log("Tu sam");
    console.error();
  }

  public saveUserID(ID: any): void {
    window.sessionStorage.removeItem(USER_KEY2);
    window.sessionStorage.setItem(USER_KEY2, JSON.stringify(ID));
    console.log("Tu sam");
    console.error();
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public getUserID(): any {
    const userID = window.sessionStorage.getItem(USER_KEY2);
    if (userID) {
      return JSON.parse(userID);
    }

    return {};
  }
  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    console.log("Tu sam 2");
    if (user) {
      return true;
    }

    return false;
  }
}