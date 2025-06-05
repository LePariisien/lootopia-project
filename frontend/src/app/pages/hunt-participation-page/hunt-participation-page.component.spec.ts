import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuntParticipationPageComponent } from './hunt-participation-page.component';

describe('HuntParticipationPageComponent', () => {
  let component: HuntParticipationPageComponent;
  let fixture: ComponentFixture<HuntParticipationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuntParticipationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuntParticipationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
