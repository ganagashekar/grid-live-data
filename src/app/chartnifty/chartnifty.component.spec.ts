import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartniftyComponent } from './chartnifty.component';

describe('ChartniftyComponent', () => {
  let component: ChartniftyComponent;
  let fixture: ComponentFixture<ChartniftyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartniftyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartniftyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
