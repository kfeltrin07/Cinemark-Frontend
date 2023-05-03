import { BookmarkStranicaComponent } from './../bookmark-stranica/bookmark-stranica.component';
import { LoginService } from 'src/app/shared/Login.service';
import { StorageService } from './../_services/storage.service';
import { Component, OnInit } from '@angular/core';
import { Films } from '../shared/films.model';
import { FilmsService } from '../shared/films.service';


@Component({
  selector: 'app-film-stranica',
  templateUrl: './film-stranica.component.html',
  styleUrls: ['./film-stranica.component.css']
})
export class FilmStranicaComponent implements OnInit {
  
  
  constructor(public service:FilmsService, public storage:StorageService,public loginservice:LoginService) {
  }

  
  ngOnInit(): void {
    this.changeToFilm();

    setTimeout(this.openInfo,300)
  }
  selectedFilm:Films;

  changeToFilm(){
    this.selectedFilm = this.service.getFilmByName();
  }

  openInfo(){
    let filmBox = document.getElementById("filmBox") as HTMLDivElement;
    filmBox.classList.remove("hide-details");
  }

  closeInfo(){
    let filmBox = document.getElementById("filmBox") as HTMLDivElement;
    filmBox.classList.add("hide-details");
  }

  trailer(){
    window.open(this.selectedFilm.video_url,"_blank");
  } 

  openPopup(){
    let popup = document.getElementById("popup") as HTMLDivElement;
    
    popup.classList.add("open-popup");
  }

  closePopup(){
    let popup = document.getElementById("popup") as HTMLDivElement;
    
    popup.classList.remove("open-popup");
  }

  saveBookmark(id_film:any){
      //this.bookmark.saveBookmarks(id_film);
  }
}
