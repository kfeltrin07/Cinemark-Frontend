import { Component } from '@angular/core';
import { CommentsService } from '../shared/comments.service';
import { FilmsService } from '../shared/films.service';
import { GenreService } from '../shared/genre.service';
import { BookmarksService } from '../shared/bookmarks.service';
import { environment } from 'src/environments/environment';
import { LoginService } from '../shared/Login.service';
import { StorageService } from '../_services/storage.service';
import { EventBusService } from '../shared/event-bus.service';
import { Subscription,timer } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isLoggedIn = false;
  username?: string;
  eventBusSub?: Subscription;
  
  constructor(
    private storageService: StorageService,private eventBusService: EventBusService, public bookmarkservice:BookmarksService, 
    public genreservice:GenreService, public filmService:FilmsService, public commentsService:CommentsService, public loginservice:LoginService,
    public router:Router
  ) 
{
  this.genreservice.GetFilmGenre();
  this.genreservice.GetGenres();
  this.filmService.getFilms();
  this.commentsService.getComments();
  this.loginservice.GetAllUsers();
  this.isLoggedIn = this.storageService.isLoggedIn();
  console.log(this.isLoggedIn);
  if (this.isLoggedIn) {
      this.bookmarkservice.getBookmarks();
      const user = this.storageService.getUser();
      const userID = this.storageService.getUserID();
      console.log(user);
      this.username = user.username;
      console.log(userID);
      timer(1000);

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();  
  });
}

}

logout(): void {
  this.storageService.clean();
  this.router.navigate(['']);
  window.location.reload(); 
}

checkreload(num:number){
  let reloadstate=num
  if(reloadstate==0){
    this.router.navigateByUrl('navbar', { skipLocationChange: true }).then(() => {
    this.router.navigate(['']);
    reloadstate=1;
  });
  }
}
}
