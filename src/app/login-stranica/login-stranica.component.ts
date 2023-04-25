import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/Login.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Login } from 'src/app/shared/Login.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-stranica',
  templateUrl: './login-stranica.component.html',
  styleUrls: ['./login-stranica.component.css']
})
export class LoginStranicaComponent implements OnInit{

  constructor(public service:LoginService,
    private toastr:ToastrService) {}

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
        this.toastr.success('Submitted successfully','Login');
      },
      err => {
        console.log(err); 
        this.toastr.error('User postoji ili grška kod unosa','Login');
      }
    );
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new Login();
  }
}
