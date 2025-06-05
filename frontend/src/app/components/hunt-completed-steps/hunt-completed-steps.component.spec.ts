import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuntCompletedStepsComponent } from './hunt-completed-steps.component';

describe('HuntCompletedStepsComponent', () => {
  let component: HuntCompletedStepsComponent;
  let fixture: ComponentFixture<HuntCompletedStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuntCompletedStepsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuntCompletedStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
