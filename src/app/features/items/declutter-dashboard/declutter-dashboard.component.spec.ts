import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclutterDashboardComponent } from './declutter-dashboard.component';

describe('DeclutterDashboardComponent', () => {
  let component: DeclutterDashboardComponent;
  let fixture: ComponentFixture<DeclutterDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclutterDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclutterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
