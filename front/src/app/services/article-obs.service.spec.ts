import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ArticleObsService } from './article-obs.service';

describe('ArticleObsService', () => {
  let service: ArticleObsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ArticleObsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
