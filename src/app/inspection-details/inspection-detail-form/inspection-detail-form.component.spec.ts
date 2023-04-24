import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionDetailFormComponent } from './inspection-detail-form.component';

describe('InspectionDetailFormComponent', () => {
  let component: InspectionDetailFormComponent;
  let fixture: ComponentFixture<InspectionDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionDetailFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectionDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
