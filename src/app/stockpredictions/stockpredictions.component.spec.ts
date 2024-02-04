import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockpredictionsComponent } from './stockpredictions.component';

describe('StockpredictionsComponent', () => {
  let component: StockpredictionsComponent;
  let fixture: ComponentFixture<StockpredictionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockpredictionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockpredictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
