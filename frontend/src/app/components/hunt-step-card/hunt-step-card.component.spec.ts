import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuntStepCardComponent } from './hunt-step-card.component';

describe('HuntStepCardComponent', () => {
  let component: HuntStepCardComponent;
  let fixture: ComponentFixture<HuntStepCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuntStepCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuntStepCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
