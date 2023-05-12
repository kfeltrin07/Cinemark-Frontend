import { Component } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { Login } from '../shared/Login.model';
import { NgModule, } from '@angular/core';
import { LoginService } from '../shared/Login.service';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-stranica',
  templateUrl: './admin-stranica.component.html',
  styleUrls: ['./admin-stranica.component.css']
})
export class AdminStranicaComponent {


  user:Login = new Login();
  userList:Login[];

  constructor(public storageService:StorageService, public loginService:LoginService, private toastr:ToastrService, private http:HttpClient) {

    this.refreshList();
    
  }

  readonly baseURL = environment.baseURL+'api/Users'

  onSubmit(form:NgForm){
    if(this.user.id_user ==0){
      this.insertUser(form);
      this.resetForm(form);
      this.refreshList();
    }
    else{
      this.updateUser(form);
      this.resetForm(form);
      this.refreshList();
    }
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.user = new Login();
  }

  refreshList(){
    this.loginService.GetAllUsers();
    this.userList = this.storageService.getUsers();
  }

  populateForm(selectedUser:Login){
    this.user = Object.assign({},selectedUser);
  }
  
  updateUser(form: NgForm){
    this.http.put(`${this.baseURL}/${this.user.id_user}`,this.user).subscribe();
    this.toastr.info("All changes saved.","Updated!")
    this.refreshList();
  }

  insertUser(form:NgForm){
    this.http.post(this.baseURL,this.user).subscribe();
    this.toastr.success("New User Added.", "Success!");
    this.refreshList();
  }

  onDelete(id:number){
    this.deleteUser(id);
    this.refreshList();
  }

  deleteUser(id:number){
    console.log(id);
    this.http.delete(`${this.baseURL}/${id}`).subscribe();
    this.refreshList();
    this.toastr.error("User Viped Out.","Deleted!")
    this.refreshList();

  }
}
