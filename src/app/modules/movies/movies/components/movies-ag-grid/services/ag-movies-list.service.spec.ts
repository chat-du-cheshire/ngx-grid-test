import { TestBed } from '@angular/core/testing';

import { AgMoviesListService } from './ag-movies-list.service';

describe('AgMoviesListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgMoviesListService = TestBed.get(AgMoviesListService);
    expect(service).toBeTruthy();
  });
});
