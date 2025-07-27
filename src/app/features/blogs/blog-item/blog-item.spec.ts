import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogItem } from './blog-item';

describe('BlogTem', () => {
  let component: BlogItem;
  let fixture: ComponentFixture<BlogItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
