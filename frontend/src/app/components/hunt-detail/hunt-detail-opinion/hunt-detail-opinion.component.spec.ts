import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuntDetailOpinionComponent } from './hunt-detail-opinion.component';

describe('HuntDetailOpinionComponent', () => {
  let component: HuntDetailOpinionComponent;
  let fixture: ComponentFixture<HuntDetailOpinionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuntDetailOpinionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuntDetailOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
