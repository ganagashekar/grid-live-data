import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealcomponentComponent } from './dealcomponent.component';

describe('DealcomponentComponent', () => {
  let component: DealcomponentComponent;
  let fixture: ComponentFixture<DealcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealcomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
