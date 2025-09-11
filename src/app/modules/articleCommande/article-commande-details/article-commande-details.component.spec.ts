import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCommandeDetailsComponent } from './article-commande-details.component';

describe('ArticleCommandeDetailsComponent', () => {
  let component: ArticleCommandeDetailsComponent;
  let fixture: ComponentFixture<ArticleCommandeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleCommandeDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticleCommandeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
