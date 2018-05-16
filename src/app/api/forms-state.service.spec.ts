import { TestBed, inject } from '@angular/core/testing';

import { FormsStateService } from './forms-state.service';

describe('FormsStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormsStateService]
    });
  });

  it('should be created', inject([FormsStateService], (service: FormsStateService) => {
    expect(service).toBeTruthy();
  }));
});
