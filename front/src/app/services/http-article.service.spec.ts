import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { newArticle } from 'src/test/articles.data';

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

  it('should be created with refresh in error', fakeAsync(() => {
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush('', { status: 404, statusText: 'Not found' });
    expect(service).toBeTruthy();
  }));

  it('should call add', fakeAsync(() => {
    let req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush([], { status: 200, statusText: 'OK' });
    tick(300);

    service.add(newArticle);
    req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush('', { status: 201, statusText: 'Created' });
    tick(300);

    expect(service).toBeTruthy();
  }));

  it('should call add in error', fakeAsync(() => {
    let req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush([], { status: 200, statusText: 'OK' });
    tick(300);

    service.add(newArticle);
    req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush('', { status: 500, statusText: 'Internal Server Error' });
    tick(300);

    expect(service).toBeTruthy();
  }));

  it('should call delete', fakeAsync(() => {
    let req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush([], { status: 200, statusText: 'OK' });
    tick(300);

    service.remove([]);
    req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('DELETE');
    req.flush('', { status: 204, statusText: 'No Content' });
    tick(300);

    expect(service).toBeTruthy();
  }));

  it('should call delete in error', fakeAsync(() => {
    let req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush([], { status: 200, statusText: 'OK' });
    tick(300);

    service.remove([]);
    req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('DELETE');
    req.flush('', { status: 500, statusText: 'Internal Server Error' });
    tick(300);

    expect(service).toBeTruthy();
  }));
});
