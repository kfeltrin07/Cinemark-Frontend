import { Router, Routes } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { NgModule, } from '@angular/core';
import { Login } from 'src/app/shared/Login.model';
import { LoginService } from 'src/app/shared/Login.service';
import { NaslovnaStranicaComponent } from 'src/app/naslovna-stranica/naslovna-stranica.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-stranica',
  templateUrl: './login-stranica.component.html',
  styleUrls: ['./login-stranica.component.css']
})
export class LoginStranicaComponent implements OnInit{

  constructor(public service:LoginService,
    private toastr:ToastrService, private router: Router) {}

    ngOnInit(): void {
      
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

  onSubmit(form:NgForm){
    this.service.postLogins().subscribe(
      res =>{
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Submitted successfully','Register');
        this.loginACT;
      },
      err => {
        console.log(err); 
        this.toastr.error('User exists or error in input','Register');
      }
    );
    
  }

  onLogin(form:NgForm){
    this.service.authenticate(form).subscribe(
      res=>{
        this.toastr.success('You are logged in');

      },
      err=>{
        console.log(err);
        this.toastr.error('Wrong Username or Password');
      }

    );
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new Login();
  }

  onLogIn(){
    alert("Successful log in")
  }
}
