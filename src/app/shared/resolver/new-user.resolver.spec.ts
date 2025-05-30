import { TestBed } from '@angular/core/testing';

import { NewUserResolver } from './new-user.resolver';

describe('NewUserResolver', () => {
  let resolver: NewUserResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(NewUserResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
