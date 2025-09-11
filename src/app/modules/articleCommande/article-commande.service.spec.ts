import { TestBed } from '@angular/core/testing';

import { ArticleCommandeService } from './article-commande.service';

describe('ArticleCommandeService', () => {
  let service: ArticleCommandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleCommandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
