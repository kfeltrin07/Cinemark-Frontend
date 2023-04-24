import { Component, OnInit } from '@angular/core';
import { InspectionDetailService } from '../shared/inspection-detail.service';

@Component({
  selector: 'app-inspection-details',
  templateUrl: './inspection-details.component.html',
  styleUrls: ['./inspection-details.component.css']
})
export class InspectionDetailsComponent implements OnInit{

  constructor(public service: InspectionDetailService) {}

  ngOnInit(): void {
    this.service.refreshList();
  }

}
