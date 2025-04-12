import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendchartmultipleComponent } from './trendchartmultiple.component';

describe('TrendchartmultipleComponent', () => {
  let component: TrendchartmultipleComponent;
  let fixture: ComponentFixture<TrendchartmultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendchartmultipleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendchartmultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
