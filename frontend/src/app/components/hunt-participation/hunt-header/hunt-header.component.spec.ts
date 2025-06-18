import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuntHeaderComponent } from './hunt-header.component';

describe('HuntHeaderComponent', () => {
  let component: HuntHeaderComponent;
  let fixture: ComponentFixture<HuntHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuntHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuntHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
