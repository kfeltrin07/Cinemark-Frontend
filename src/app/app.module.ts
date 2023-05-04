import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { NaslovnaStranicaComponent } from './naslovna-stranica/naslovna-stranica.component';
import { LoginStranicaComponent } from './login-stranica/login-stranica.component';
import { RouterModule } from '@angular/router';
import { BookmarkStranicaComponent } from './bookmark-stranica/bookmark-stranica.component';
import { SortByStranicaComponent } from './sort-by-stranica/sort-by-stranica.component';
import { FilmStranicaComponent } from './film-stranica/film-stranica.component';
import { environment } from 'src/environments/environment';
import { SearchStranicaComponent } from './search-stranica/search-stranica.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { BookmarksService } from './shared/bookmarks.service';
import { FilmsService } from './shared/films.service';
import { LoginService } from './shared/Login.service';

@NgModule({
  declarations: [
    AppComponent,
    NaslovnaStranicaComponent,
    LoginStranicaComponent,
    BookmarkStranicaComponent,
    SortByStranicaComponent,
    FilmStranicaComponent,
    SearchStranicaComponent,
    BookmarkStranicaComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [httpInterceptorProviders,
              BookmarksService,
              FilmsService,
              LoginService,
              BookmarkStranicaComponent
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
