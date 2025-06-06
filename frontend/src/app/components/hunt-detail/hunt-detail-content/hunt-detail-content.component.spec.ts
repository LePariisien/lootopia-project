import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuntDetailContentComponent } from './hunt-detail-content.component';

describe('HuntDetailContentComponent', () => {
  let component: HuntDetailContentComponent;
  let fixture: ComponentFixture<HuntDetailContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuntDetailContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuntDetailContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
