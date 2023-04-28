import { LoginService } from 'src/app/shared/Login.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginStranicaComponent } from './login-stranica/login-stranica.component';
import { NaslovnaStranicaComponent } from './naslovna-stranica/naslovna-stranica.component';
import { BookmarkStranicaComponent } from './bookmark-stranica/bookmark-stranica.component';
import { SortByStranicaComponent } from './sort-by-stranica/sort-by-stranica.component';
import { FilmStranicaComponent } from './film-stranica/film-stranica.component';
import { SearchStranicaComponent } from './search-stranica/search-stranica.component';


const routes: Routes = [
  {path: '', component: NaslovnaStranicaComponent},
  {path: 'login', component: LoginStranicaComponent},
  {path: 'bookmarks', component: BookmarkStranicaComponent},
  {path: 'sort', component:SortByStranicaComponent},
  {path: 'film', component:FilmStranicaComponent},
  {path: 'search', component:SearchStranicaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
