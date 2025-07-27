import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentBlog } from './current-blog';

describe('CurrentBlog', () => {
  let component: CurrentBlog;
  let fixture: ComponentFixture<CurrentBlog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentBlog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentBlog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
