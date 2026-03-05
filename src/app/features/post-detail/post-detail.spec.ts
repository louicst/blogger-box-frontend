import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailComponent } from './post-detail'; 

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 🚀 Updated to PostDetailComponent
      imports: [PostDetailComponent], 
    }).compileComponents();

    // 🚀 Updated to PostDetailComponent
    fixture = TestBed.createComponent(PostDetailComponent); 
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});