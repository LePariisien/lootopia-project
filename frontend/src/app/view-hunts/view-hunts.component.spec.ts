import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHuntsComponent } from './view-hunts.component';

describe('ViewHuntsComponent', () => {
  let component: ViewHuntsComponent;
  let fixture: ComponentFixture<ViewHuntsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewHuntsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHuntsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
