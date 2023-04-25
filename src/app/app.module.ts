import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import { LoginsComponent } from './Logins/Logins.component';
import { LoginFormComponent } from './Logins/Login-form/Login-form.component';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NaslovnaStranicaComponent } from './naslovna-stranica/naslovna-stranica.component';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { NaslovnaStranicaComponent } from './naslovna-stranica/naslovna-stranica.component';
import { LoginStranicaComponent } from './login-stranica/login-stranica.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    LoginsComponent,
    NaslovnaStranicaComponent,
    LoginFormComponent,
    NaslovnaStranicaComponent,
    LoginStranicaComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
