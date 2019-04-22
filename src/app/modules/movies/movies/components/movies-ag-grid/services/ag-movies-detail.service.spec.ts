import { TestBed } from '@angular/core/testing';

import { AgMoviesDetailService } from './ag-movies-detail.service';

describe('AgMoviesDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgMoviesDetailService = TestBed.get(AgMoviesDetailService);
    expect(service).toBeTruthy();
  });
});
