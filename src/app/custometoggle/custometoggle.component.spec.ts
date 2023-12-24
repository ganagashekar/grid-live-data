import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustometoggleComponent } from './custometoggle.component';

describe('CustometoggleComponent', () => {
  let component: CustometoggleComponent;
  let fixture: ComponentFixture<CustometoggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustometoggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustometoggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
