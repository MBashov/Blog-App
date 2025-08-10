import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSnagBar } from './custom-snag-bar';

describe('CustomSnagBar', () => {
  let component: CustomSnagBar;
  let fixture: ComponentFixture<CustomSnagBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSnagBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomSnagBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
