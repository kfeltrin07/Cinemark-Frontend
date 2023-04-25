import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/Login.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Login } from 'src/app/shared/Login.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Login-form',
  templateUrl: './Login-form.component.html',
  styleUrls: ['./Login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(public service:LoginService,
    private toastr:ToastrService) {}

  ngOnInit(): void {  
  }

  onSubmit(form:NgForm){
    if (this.service.formData.id_user==0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form:NgForm){
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

  updateRecord(form:NgForm){
    this.service.putLogins().subscribe(
      res =>{
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Updated successfully','Login');
      },
      err => {console.log(err); }
    );
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new Login();
  }

}
