import { GenreService } from '../_shared/genre.service';
import { BookmarkStranicaComponent } from './../bookmark-stranica/bookmark-stranica.component';
import { LoginService } from 'src/app/_shared/Login.service';
import { StorageService } from './../_services/storage.service';
import { Component, Renderer2, OnInit, ElementRef } from '@angular/core';
import { Films } from '../_shared/films.model';
import { FilmsService } from '../_shared/films.service';
import { CommentsService } from '../_shared/comments.service';
import { ToastrService } from 'ngx-toastr';
import { Comments } from '../_shared/comments.model';
import { Login } from '../_shared/Login.model';
import { BookmarksService } from '../_shared/bookmarks.service';
import { RatingsService } from '../_shared/ratings.service';
import { UserStoreService } from '../_services/user-store.service';


@Component({
  selector: 'app-film-stranica',
  templateUrl: './film-stranica.component.html',
  styleUrls: ['./film-stranica.component.css'],
})

export class FilmStranicaComponent {

  ratingOfFilm: number = 0;

  form: any = {
    id_user: null,
    id_film: null
  };

  selectedFilm: Films;
  genre: string[];
  allComments: Comments[];
  selectedComments: Comments[];
  allUsers: Login[];
  usernameList: string[];
  dateList: any;
  bookmarked = false;
  public id_user$: string = "";
  public role$: string = "";


  constructor(public service: FilmsService, public storageService: StorageService, public loginService: LoginService, public bookmark: BookmarkStranicaComponent,
    public commentService: CommentsService, private toastr: ToastrService, public genreservice: GenreService, public ratingService: RatingsService,
    public bookmarkService: BookmarksService, private userstore: UserStoreService, private renderer: Renderer2, private el: ElementRef) {

    this.userstore.getIDUserFromStore()
      .subscribe(val => {
        let id_userFromToken = this.loginService.getIDUserFromToken();
        this.id_user$ = val || id_userFromToken
      })

    this.userstore.getRoleFromStore()
      .subscribe(val => {
        let RoleFromToken = this.loginService.getRoleFromToken();
        this.role$ = val || RoleFromToken
      })

    this.selectedFilm = this.storageService.getFilm();
    this.genre = this.genreservice.GenreForFilm(this.selectedFilm.id_film);
    this.service.updateRating();
    this.changeToFilm();
    this.Checkifbookmarked();
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(this.openInfo, 400)
  }

  async changeToFilm() {
    this.selectedComments = [];
    this.allComments = [];
    this.usernameList = [];
    this.dateList = [];

    await this.UpdateLists();

    if (this.allComments != null)
      this.LoadComments();
    else
      console.log("there are no comments");

  }

  async UpdateLists() {

    await this.loginService.GetAllUsers().then(x => {
      this.storageService.saveUsers(x);
      this.allUsers = x;
    });

    await this.commentService.getComments().then((comments) => {
      this.storageService.saveComments(comments);
      this.allComments = comments;
      this.selectedComments = this.allComments.filter((comment) => comment.id_film === this.selectedFilm.id_film);
    });

  }

  LoadComments() {

    for (var comments of this.allComments) {
      if (this.selectedFilm.id_film == comments.id_film) {
        this.selectedComments.push(comments);
      }
    }

    for (var comm of this.selectedComments) {
      var dateObj = comm.insert_date.toString().substring(0,10);
      this.dateList.push(dateObj);
    }

    for (var comuser of this.selectedComments) {
      for (var user of this.allUsers) {
        if (user.id_user == comuser.id_user) {
          this.usernameList.push(user.username);
        }
      }
    }
  }

  openInfo() {
    let filmBox = document.getElementById("filmBox") as HTMLDivElement;
    filmBox.classList.remove("hide-details");
  }

  closeInfo() {
    let filmBox = document.getElementById("filmBox") as HTMLDivElement;
    filmBox.classList.add("hide-details");
  }

  trailer() {
    window.open(this.selectedFilm.video_url, "_blank");
  }

  openPopup() {
    let popup = document.getElementById("popup") as HTMLDivElement;

    popup.classList.add("open-popup");
  }

  closePopup() {
    let popup = document.getElementById("popup") as HTMLDivElement;

    popup.classList.remove("open-popup");

    var rate1 = document.getElementById("rate-1") as HTMLInputElement;
    var rate2 = document.getElementById("rate-2") as HTMLInputElement;
    var rate3 = document.getElementById("rate-3") as HTMLInputElement;
    var rate4 = document.getElementById("rate-4") as HTMLInputElement;
    var rate5 = document.getElementById("rate-5") as HTMLInputElement;

    if (this.storageService.isLoggedIn() == true) {

      if (rate1.checked) {
        this.ratingOfFilm = parseInt(rate1.value, 10);
        this.service.postNewRating(this.ratingOfFilm);
      }
      if (rate2.checked) {
        this.ratingOfFilm = parseInt(rate2.value, 10);
        this.service.postNewRating(this.ratingOfFilm);
      }
      if (rate3.checked) {
        this.ratingOfFilm = parseInt(rate3.value, 10);
        this.service.postNewRating(this.ratingOfFilm);
      }
      if (rate4.checked) {
        this.ratingOfFilm = parseInt(rate4.value, 10);
        this.service.postNewRating(this.ratingOfFilm);
      }
      if (rate5.checked) {
        this.ratingOfFilm = parseInt(rate5.value, 10);
        this.service.postNewRating(this.ratingOfFilm);
      }
    }
    else {
      this.toastr.error("You can't rate if you are not logged in!", "Rating error.")
    }

  }

  saveBookmark(id_film: any) {
    console.log(id_film)
    this.bookmark.saveBookmarks(id_film);
    this.Checkifbookmarked();
  }

  async saveComment() {
    const val = document.getElementById("commentInput") as HTMLInputElement;
    this.commentService.postComment(this.selectedFilm, val.value);
    val.value = "";

    await this.UpdateLists();
    this.LoadComments;
  }

  Checkifbookmarked() {
    if (this.storageService.isLoggedIn() == true) {
      const filmid = this.storageService.getFilm();
      this.form.id_user = this.id_user$;
      this.form.id_film = filmid.id_film;
      this.bookmarkService.checkBookmark(this.form).subscribe(
        res => {
          this.bookmarked = true;
        },
        err => {
          this.bookmarked = false;
        });
    }
  }

  deleteComment(id: number, usid: number) {
    console.log(id);
    if (this.role$ === "admin" || this.role$ === "superadmin") {
      this.commentService.deleteComment(id);
      this.toastr.success("User's comment will be permanently deleted after refresh");
      history.go(0);
    }
    else if (+this.id_user$ === usid) {
      this.commentService.deleteComment(id);
      this.toastr.success("User's comment will be permanently deleted after refresh");
      history.go(0);
    } else {
      this.toastr.error("You cannot delete this comment");

    }
  }
}