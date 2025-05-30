import { TestBed } from '@angular/core/testing';

import { NewProductResolver } from './new-product.resolver';

describe('NewProductResolver', () => {
  let resolver: NewProductResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(NewProductResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
