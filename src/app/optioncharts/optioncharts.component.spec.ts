import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionchartsComponent } from './optioncharts.component';

describe('OptionchartsComponent', () => {
  let component: OptionchartsComponent;
  let fixture: ComponentFixture<OptionchartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionchartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
