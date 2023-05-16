import { Component } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Films } from '../_shared/films.model';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { FilmsService } from '../_shared/films.service';

@Component({
  selector: 'app-movie-management-stranica',
  templateUrl: './movie-management-stranica.component.html',
  styleUrls: ['./movie-management-stranica.component.css']
})
export class MovieManagementStranicaComponent {

  film:Films = new Films();
  filmList:Films[];
  readonly baseURL = environment.baseURL+'api/Films'
  
  constructor(public storageService:StorageService, private toastr:ToastrService, private http:HttpClient, public filmService:FilmsService) {

    this.refreshList();
  }

  onSubmit(form:NgForm){
    this.updateFilm(form);
    this.resetForm(form);
    this.refreshList();
  }

  populateForm(selectedFilm:Films){
    this.film = Object.assign({},selectedFilm);
  }

  refreshList(){
    this.filmService.getFilms();
    this.filmList = this.storageService.getFilms();
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.film = new Films();
  }

  updateFilm(form: NgForm){
    this.http.put(`${this.baseURL}/${this.film.id_film}`,this.film).subscribe();
    this.toastr.info("All changes saved.","Updated!")
    this.refreshList();
  }
}
