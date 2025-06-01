import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuntStepComponent } from './hunt-step.component';

describe('HuntStepComponent', () => {
  let component: HuntStepComponent;
  let fixture: ComponentFixture<HuntStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuntStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuntStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
