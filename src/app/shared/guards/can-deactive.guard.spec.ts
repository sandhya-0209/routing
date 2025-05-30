import { TestBed } from '@angular/core/testing';

import { CanDeactiveGuard } from './can-deactive.guard';

describe('CanDeactiveGuard', () => {
  let guard: CanDeactiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanDeactiveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
