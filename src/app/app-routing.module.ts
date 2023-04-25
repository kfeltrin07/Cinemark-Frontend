import { LoginService } from 'src/app/shared/Login.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginsComponent } from './Logins/Logins.component';
import { NaslovnaStranicaComponent } from './naslovna-stranica/naslovna-stranica.component';


const routes: Routes = [
  {path: '', component: NaslovnaStranicaComponent},
  {path: 'login', component: LoginsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
