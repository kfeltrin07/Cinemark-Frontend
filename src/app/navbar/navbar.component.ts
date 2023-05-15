import { Component } from '@angular/core';
import { CommentsService } from '../_shared/comments.service';
import { FilmsService } from '../_shared/films.service';
import { GenreService } from '../_shared/genre.service';
import { BookmarksService } from '../_shared/bookmarks.service';
import { environment } from 'src/environments/environment';
import { LoginService } from '../_shared/Login.service';
import { StorageService } from '../_services/storage.service';
import { EventBusService } from '../_shared/event-bus.service';
import { Subscription,timer } from 'rxjs';
import { Router } from '@angular/router';
import { UserStoreService } from '../_services/user-store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isLoggedIn = false;
  eventBusSub?: Subscription;
  public username$:string="";
  public role$:string="";
  public id_user$:string="";

  constructor(
    private storageService: StorageService,private eventBusService: EventBusService, public bookmarkservice:BookmarksService, 
    public genreservice:GenreService, public filmService:FilmsService, public commentsService:CommentsService, public loginservice:LoginService,
    public router:Router, private userstore:UserStoreService
  ) 
{


  this.userstore.getUsernameFromStore()
  .subscribe(val=>{
    let usernameFromToken=this.loginservice.getUsernameFromToken();
    this.username$=val||usernameFromToken
  })

  this.userstore.getRoleFromStore()
  .subscribe(val=>{
    let RoleFromToken=this.loginservice.getRoleFromToken();
    this.role$=val||RoleFromToken
  })

  this.userstore.getIDUserFromStore()
  .subscribe(val=>{
    let id_userFromToken=this.loginservice.getIDUserFromToken();
    this.id_user$=val||id_userFromToken
  })

  this.storageService.saveUserID(this.id_user$);

  this.genreservice.GetFilmGenre();
  this.genreservice.GetGenres();
  this.filmService.getFilms();
  this.commentsService.getComments();
  this.loginservice.GetAllUsers();
  this.isLoggedIn = this.storageService.isLoggedIn();
  if (this.isLoggedIn) {
      this.bookmarkservice.getBookmarks();
      const token=this.storageService.getToken();
      timer(1000);
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
