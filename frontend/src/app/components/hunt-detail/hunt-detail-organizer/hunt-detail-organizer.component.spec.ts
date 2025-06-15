import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuntDetailOrganizerComponent } from './hunt-detail-organizer.component';

describe('HuntDetailOrganizerComponent', () => {
  let component: HuntDetailOrganizerComponent;
  let fixture: ComponentFixture<HuntDetailOrganizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuntDetailOrganizerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuntDetailOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
