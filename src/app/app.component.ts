import { CommentsService } from './shared/comments.service';
import { FilmsService } from './shared/films.service';
import { GenreService } from './shared/genre.service';
import { BookmarksService } from './shared/bookmarks.service';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './shared/Login.service';
import { StorageService } from './_services/storage.service';
import { EventBusService } from './shared/event-bus.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  username?: string;
  title = 'Cinemark';
  env = environment;
  
  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,private eventBusService: EventBusService, public bookmarkservice:BookmarksService
    , public genreservice:GenreService, public filmService:FilmsService, public commentsService:CommentsService, public loginservice:LoginService
      ) {}

  ngOnInit(): void {
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
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
        this.storageService.clean();
        window.location.reload(); 
  }
}
