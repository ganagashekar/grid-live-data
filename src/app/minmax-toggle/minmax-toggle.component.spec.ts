import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinmaxToggleComponent } from './minmax-toggle.component';

describe('MinmaxToggleComponent', () => {
  let component: MinmaxToggleComponent;
  let fixture: ComponentFixture<MinmaxToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinmaxToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinmaxToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
