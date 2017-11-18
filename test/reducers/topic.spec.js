import topic from '../../app/reducers/topic';
// import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../../app/actions/counter';

describe('reducers', () => {
  describe('topic', () => {
    it('should handle initial state', () => {
      expect(topic(undefined, {})).toMatchSnapshot();
    });
    // it('should handle INCREMENT_COUNTER', () => {
    //   expect(counter(1, { type: INCREMENT_COUNTER })).toMatchSnapshot();
    // });
    // it('should handle DECREMENT_COUNTER', () => {
    //   expect(counter(1, { type: DECREMENT_COUNTER })).toMatchSnapshot();
    // });
    // it('should handle unknown action type', () => {
    //   expect(counter(1, { type: 'unknown' })).toMatchSnapshot();
    // });
  });
});
