import { BookmarksService } from './../shared/bookmarks.service';
import { FilmsService } from './../shared/films.service';
import { Router, Routes } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, FormControl } from '@angular/forms';
import { NgModule, } from '@angular/core';
import { Login } from 'src/app/shared/Login.model';
import { LoginService } from 'src/app/shared/Login.service';
import { NaslovnaStranicaComponent } from 'src/app/naslovna-stranica/naslovna-stranica.component';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';
import { StorageService } from '../_services/storage.service';
import { delay } from 'rxjs';
import { GenreService } from '../shared/genre.service';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-login-stranica',
  templateUrl: './login-stranica.component.html',
  styleUrls: ['./login-stranica.component.css'],

})
export class LoginStranicaComponent{

  form: any = {
    username: null,
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  isSuccessful = false;
  isSignUpFailed = false;
  LoginPgStatus=false;
  errorMessage = '';

  constructor(public service:LoginService,private storageService: StorageService,private toastr:ToastrService, private router: Router,
    public genreService:GenreService, public filmsService: FilmsService, public bookmarkService:BookmarksService, public navbar:NavbarComponent) {

      if (this.storageService.isLoggedIn()) {
        this.isLoggedIn = true;
        this.bookmarkService.getBookmarks();
      const user = this.storageService.getUser();
      const userID = this.storageService.getUserID();
      this.navbar.checkreload(0);
      }
      this.filmsService.getFilms();

    }

  registerACT(){
    var x = document.getElementById("loginID") as HTMLDivElement;
    var y = document.getElementById("registerID") as HTMLDivElement;
    var z = document.getElementById("btn") as HTMLDivElement;
    
    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "110px";
  }

  loginACT(){
    var x = document.getElementById("loginID") as HTMLDivElement;
    var y = document.getElementById("registerID") as HTMLDivElement;
    var z = document.getElementById("btn") as HTMLDivElement;

    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0px";
  }

  onSubmit(form:NgForm):void{
    this.service.postLogins().subscribe({ 
      next: res =>{
        console.log(res);
        this.toastr.success('Submitted successfully','Register');
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.loginACT;
      },
      error: err => {
        console.log(err);
        this.isSignUpFailed = true; 
        this.toastr.error('User exists or error in input','Register');
      }
    });  
  }

  onLogin(form:NgForm){
    this.service.authenticate(form).subscribe(
      res=>{
        console.log(res);
        this.storageService.saveUser(form.value);
        this.storageService.saveUserID(res.user);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.LoginPgStatus=true;
        this.toastr.success('You are logged in');
        window.location.reload();
      },
      err=>{
        console.log(err);
        this.toastr.error('Wrong Username or Password');
        this.isLoginFailed = true;
      }

    );
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new Login();
  }

  reloadPage(): void {
    location.reload();
  }

}
