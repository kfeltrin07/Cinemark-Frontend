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

  ratingOfFilm:number=0;
  
  ngOnInit(): void {
    this.changeToFilm();
    this.service.updateRating();

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
    
    var rate1 = document.getElementById("rate-1") as HTMLInputElement;
    var rate2 = document.getElementById("rate-2") as HTMLInputElement;
    var rate3 = document.getElementById("rate-3") as HTMLInputElement;
    var rate4 = document.getElementById("rate-4") as HTMLInputElement;
    var rate5 = document.getElementById("rate-5") as HTMLInputElement;

    if(rate1.checked){
      this.ratingOfFilm=parseInt(rate1.value,10);
      this.service.postNewRating(this.ratingOfFilm);
    }
    if(rate2.checked){
      this.ratingOfFilm=parseInt(rate2.value,10);
      this.service.postNewRating(this.ratingOfFilm);
    }
    if(rate3.checked){
      this.ratingOfFilm=parseInt(rate3.value,10);
      this.service.postNewRating(this.ratingOfFilm);
    }
    if(rate4.checked){
      this.ratingOfFilm=parseInt(rate4.value,10);
      this.service.postNewRating(this.ratingOfFilm);
    }
    if(rate5.checked){
      this.ratingOfFilm=parseInt(rate5.value,10);
      this.service.postNewRating(this.ratingOfFilm);
    }  
    
  }

  saveBookmark(id_film:any){
      //this.bookmark.saveBookmarks(id_film);
  }
}
