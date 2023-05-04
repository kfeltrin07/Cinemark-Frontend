import { StorageService } from './../_services/storage.service';
import { BookmarksService } from './../shared/bookmarks.service';
import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../shared/films.service';
import { LoginStranicaComponent } from '../login-stranica/login-stranica.component';

@Component({
  selector: 'app-naslovna-stranica',
  templateUrl: './naslovna-stranica.component.html',
  styleUrls: ['./naslovna-stranica.component.css']
})
export class NaslovnaStranicaComponent implements OnInit {

  LoginPgStatus=false;
  isLoggedIn=false;

  constructor(public service:FilmsService, public bookmarkservice:BookmarksService, public loginserv:LoginStranicaComponent, public storageService:StorageService) {}

  ngOnInit(): void {
    this.service.getFilms();
  }

  onSearchClick(){
    const val = document.getElementById("inputValue") as HTMLInputElement;
    this.service.getSearchedFilms(val.value);
  }


}
