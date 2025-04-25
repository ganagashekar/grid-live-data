import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcrratiosComponent } from './pcrratios.component';

describe('PcrratiosComponent', () => {
  let component: PcrratiosComponent;
  let fixture: ComponentFixture<PcrratiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcrratiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcrratiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
