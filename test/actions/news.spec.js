import { spy } from 'sinon';
import * as actions from '../../app/actions/news';

describe('actions', () => {
  it('initNews action', () => {
    expect(actions.initNews()).toMatchSnapshot();
  });

});
