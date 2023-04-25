import { Component } from '@angular/core';

@Component({
  selector: 'app-login-stranica',
  templateUrl: './login-stranica.component.html',
  styleUrls: ['./login-stranica.component.css']
})
export class LoginStranicaComponent {
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
}
