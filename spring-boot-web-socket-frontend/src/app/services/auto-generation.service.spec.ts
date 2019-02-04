import { TestBed } from '@angular/core/testing';

import { AutoGenerationService } from './auto-generation.service';

describe('AutoGenerationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoGenerationService = TestBed.get(AutoGenerationService);
    expect(service).toBeTruthy();
  });
});
