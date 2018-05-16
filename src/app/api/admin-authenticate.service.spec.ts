import { TestBed, inject } from '@angular/core/testing';

import { AdminAuthenticateService } from './admin-authenticate.service';

describe('AdminAuthenticateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminAuthenticateService]
    });
  });

  it('should be created', inject([AdminAuthenticateService], (service: AdminAuthenticateService) => {
    expect(service).toBeTruthy();
  }));
});
