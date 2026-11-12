import BaseFutureTechnology from '@civ-clone/base-science-advance-future-technology/FutureTechnology';
import { FutureTechnology } from '../Advances';
import { expect } from 'chai';

describe('FutureTechnology', (): void => {
  it('is the base advance itself, under the same name, and repeatable', (): void => {
    expect(FutureTechnology).equal(BaseFutureTechnology);
    expect(FutureTechnology.name).equal('FutureTechnology');
    expect(FutureTechnology.repeatable).true;
  });
});
