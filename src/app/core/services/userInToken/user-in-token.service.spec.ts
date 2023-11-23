import { TestBed } from '@angular/core/testing';

import { UserInTokenService } from './user-in-token.service';

describe('UserInTokenService', () => {
  let service: UserInTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
