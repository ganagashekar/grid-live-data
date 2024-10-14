import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalibstatsComponent } from './talibstats.component';

describe('TalibstatsComponent', () => {
  let component: TalibstatsComponent;
  let fixture: ComponentFixture<TalibstatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalibstatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalibstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
