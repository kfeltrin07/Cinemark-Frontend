import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/Login.service';
import { Login } from '../shared/Login.model';

@Component({
  selector: 'app-Logins',
  templateUrl: './Logins.component.html',
  styleUrls: ['./Logins.component.css']
})
export class LoginsComponent implements OnInit{

  constructor(public service: LoginService, private toastr:ToastrService) {}

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord:Login){
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id:number){
    if(confirm('Are you sure?'))
    {
    this.service.deleteLogin(id)
    .subscribe(
      res=>{
        this.service.refreshList();
        this.toastr.error("Deleted Succsefully", 'Login Register');
      },
      err=>{console.log(err)}
    )
    }
  }
}
