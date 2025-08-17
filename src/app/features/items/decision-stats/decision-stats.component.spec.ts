import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionStatsComponent } from './decision-stats.component';

describe('DecisionStatsComponent', () => {
  let component: DecisionStatsComponent;
  let fixture: ComponentFixture<DecisionStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecisionStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecisionStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
