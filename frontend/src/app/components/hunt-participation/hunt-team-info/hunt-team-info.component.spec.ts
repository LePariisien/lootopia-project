import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuntTeamInfoComponent } from './hunt-team-info.component';

describe('HuntTeamInfoComponent', () => {
  let component: HuntTeamInfoComponent;
  let fixture: ComponentFixture<HuntTeamInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuntTeamInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuntTeamInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
