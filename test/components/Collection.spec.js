import { spy } from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Moment from 'moment';
import Collection from '../../app/components/Collection';
import { Scrollbars } from 'react-custom-scrollbars';

function setup() {
  const actions = {
    initList: spy(),
    fetchLatestCollection: spy(),
    setCurrentUrl: spy(),
    loadMoreList: spy()
  };

  const component = shallow(
    <Collection
      collection={[{ id: '1' }, { id: '2' }]}
      lastCursor={2011}
      count={3}
      moreLoading={false}
      category={'topic'}
      setting={{
        moblieFirst: true,
        simpleMode: true
      }}
      {...actions} />);
  return {
    component,
    actions,
    list: component.find('.collection-item'),
    button: component.find('button')
  };
}

describe('Collection component', () => {
  it('should render component', () => {
    const { component } = setup();
    expect(component).toMatchSnapshot();
  });

  it('render list ', async () => {
    const { list } = setup();
    expect(list.length).toBe(2);

  });
  it(' scroll load more list ', async () => {
    const { list, component, actions } = setup();

    window.dispatchEvent(new window.UIEvent('scroll', { detail: 1000 }));
    component.setState({ hasScroll: true });
    expect(component.state().hasScroll).toEqual(true);
    component.instance().props.loadMoreList();
    expect(actions.loadMoreList.called).toBe(true);
    component.setProps({ collection: [{ id: '1' }, { id: '2' }, { id: '3' }] });
    component.update();
    expect(component.find('.collection-item').length).toBe(3);
  });
  it('click refresh btn', async () => {
    const { button, component, actions } = setup();
    button.at(0).simulate('click');
    component.instance().props.initList();
    component.instance().props.fetchLatestCollection();
    expect(actions.initList.called).toBe(true);
    expect(actions.fetchLatestCollection.called).toBe(true);
  })
});
