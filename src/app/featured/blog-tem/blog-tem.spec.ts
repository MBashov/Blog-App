import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogTem } from './blog-tem';

describe('BlogTem', () => {
  let component: BlogTem;
  let fixture: ComponentFixture<BlogTem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogTem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogTem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
