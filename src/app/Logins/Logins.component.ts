import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/Login.service';

@Component({
  selector: 'app-Logins',
  templateUrl: './Logins.component.html',
  styleUrls: ['./Logins.component.css']
})
export class LoginsComponent implements OnInit{

  constructor(public service: LoginService) {}

  ngOnInit(): void {
    this.service.refreshList();
  }

}
