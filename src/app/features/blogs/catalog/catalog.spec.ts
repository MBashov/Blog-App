import { ComponentFixture, TestBed } from '@angular/core/testing';

import { catalog } from './catalog';

describe('BlogTem', () => {
  let component: catalog;
  let fixture: ComponentFixture<catalog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [catalog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(catalog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
