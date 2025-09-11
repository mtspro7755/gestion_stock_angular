import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCommandeFormComponent } from './article-commande-form.component';

describe('ArticleCommandeFormComponent', () => {
  let component: ArticleCommandeFormComponent;
  let fixture: ComponentFixture<ArticleCommandeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleCommandeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticleCommandeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
