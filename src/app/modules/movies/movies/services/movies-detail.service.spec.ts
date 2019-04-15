import { TestBed } from '@angular/core/testing';

import { MoviesDetailService } from './movies-detail.service';

describe('MoviesDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoviesDetailService = TestBed.get(MoviesDetailService);
    expect(service).toBeTruthy();
  });
});
