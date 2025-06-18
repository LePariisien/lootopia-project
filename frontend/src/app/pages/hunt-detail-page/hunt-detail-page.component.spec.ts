import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuntDetailPageComponent } from './hunt-detail-page.component';

describe('HuntDetailPageComponent', () => {
  let component: HuntDetailPageComponent;
  let fixture: ComponentFixture<HuntDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuntDetailPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuntDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
