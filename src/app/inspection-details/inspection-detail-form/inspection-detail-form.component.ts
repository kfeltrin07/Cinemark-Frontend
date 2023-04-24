import { Component, OnInit } from '@angular/core';
import { InspectionDetailService } from 'src/app/shared/inspection-detail.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Login } from 'src/app/shared/inspection-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inspection-detail-form',
  templateUrl: './inspection-detail-form.component.html',
  styleUrls: ['./inspection-detail-form.component.css']
})
export class InspectionDetailFormComponent implements OnInit {

  constructor(public service:InspectionDetailService,
    private toastr:ToastrService) {}

  ngOnInit(): void {  
  }

  onSubmit(form:NgForm){
    this.service.postLogins().subscribe(
      res =>{
        this.resetForm(form);
        this.toastr.success('Submitted successfully','Inspection Detail');
      },
      err => {console.log(err); }
    );
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new Login();
  }

}
