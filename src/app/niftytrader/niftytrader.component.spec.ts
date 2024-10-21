import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiftytraderComponent } from './niftytrader.component';

describe('NiftytraderComponent', () => {
  let component: NiftytraderComponent;
  let fixture: ComponentFixture<NiftytraderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiftytraderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NiftytraderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
