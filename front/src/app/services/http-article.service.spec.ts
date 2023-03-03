import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HttpArticleService, url } from './http-article.service';

describe('HttpArticleService', () => {
  let service: HttpArticleService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HttpArticleService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', fakeAsync(() => {
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush([], { status: 200, statusText: 'OK' });
    tick(300);

    expect(service).toBeTruthy();
  }));
});
