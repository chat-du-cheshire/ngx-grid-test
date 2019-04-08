import { TestBed } from '@angular/core/testing';

import { MoviesStateService } from './movies-state.service';

describe('MoviesStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoviesStateService = TestBed.get(MoviesStateService);
    expect(service).toBeTruthy();
  });
});
