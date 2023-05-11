import { CommentsService } from './shared/comments.service';
import { FilmsService } from './shared/films.service';
import { GenreService } from './shared/genre.service';
import { BookmarksService } from './shared/bookmarks.service';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './shared/Login.service';
import { StorageService } from './_services/storage.service';
import { EventBusService } from './shared/event-bus.service';
import { Subscription,timer } from 'rxjs';
import { Router } from '@angular/router';


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
                private storageService: StorageService,private eventBusService: EventBusService, public bookmarkservice:BookmarksService, 
                public genreservice:GenreService, public filmService:FilmsService, public commentsService:CommentsService, public loginservice:LoginService,
                public router:Router
              ) 
      {    }

  
}
