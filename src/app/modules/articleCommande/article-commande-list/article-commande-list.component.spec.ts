import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCommandeListComponent } from './article-commande-list.component';

describe('ArticleCommandeListComponent', () => {
  let component: ArticleCommandeListComponent;
  let fixture: ComponentFixture<ArticleCommandeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleCommandeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticleCommandeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
