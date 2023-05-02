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


@Component({
  selector: 'app-login-stranica',
  templateUrl: './login-stranica.component.html',
  styleUrls: ['./login-stranica.component.css']
})
export class LoginStranicaComponent implements OnInit{

  form: any = {
    username: null,
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(public service:LoginService,private storageService: StorageService,
    private toastr:ToastrService, private router: Router, private appcomponent: AppComponent,) {}

    

    ngOnInit(): void {
      if (this.storageService.isLoggedIn()) {
        this.isLoggedIn = true;
      }
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
        this.storageService.saveUser(form.value);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.toastr.success('You are logged in');
        this.router.navigate(['']);
        this.reloadPage();
        console.log(this.isLoggedIn);
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
/*
  logout(): void {
    this.isUserLoggedIn = false;
       localStorage.removeItem('isUserLoggedIn'); 
    }*/

  reloadPage(): void {
    window.location.reload();
  }
}
