import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrownBalanceComponent } from './crown-balance.component';

describe('CrownBalanceComponent', () => {
  let component: CrownBalanceComponent;
  let fixture: ComponentFixture<CrownBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrownBalanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrownBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
