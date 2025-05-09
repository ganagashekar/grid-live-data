import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiftyoptionsComponent } from './niftyoptions.component';

describe('NiftyoptionsComponent', () => {
  let component: NiftyoptionsComponent;
  let fixture: ComponentFixture<NiftyoptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiftyoptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NiftyoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
