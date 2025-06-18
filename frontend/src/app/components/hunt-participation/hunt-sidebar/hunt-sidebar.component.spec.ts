import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuntSidebarComponent } from './hunt-sidebar.component';

describe('HuntSidebarComponent', () => {
  let component: HuntSidebarComponent;
  let fixture: ComponentFixture<HuntSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuntSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuntSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
