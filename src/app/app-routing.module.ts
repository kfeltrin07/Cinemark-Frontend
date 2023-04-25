import { LoginService } from 'src/app/shared/Login.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginStranicaComponent } from './login-stranica/login-stranica.component';
import { NaslovnaStranicaComponent } from './naslovna-stranica/naslovna-stranica.component';


const routes: Routes = [
  {path: '', component: NaslovnaStranicaComponent},
  {path: 'login', component: LoginStranicaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
