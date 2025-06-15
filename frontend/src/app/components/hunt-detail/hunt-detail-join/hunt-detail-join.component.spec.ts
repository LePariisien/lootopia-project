import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuntDetailJoinComponent } from './hunt-detail-join.component';

describe('HuntDetailJoinComponent', () => {
  let component: HuntDetailJoinComponent;
  let fixture: ComponentFixture<HuntDetailJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuntDetailJoinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuntDetailJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
