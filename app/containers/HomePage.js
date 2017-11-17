import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TopicActions from '../actions/topic';
import ReadView from '../components/ReadView';
import Collection from '../components/Collection';
// style

import styles from './HomePage.css';


class HomePage extends Component {

  state = {
    refreshScrollTop: false
  }

  componentWillMount() {
    this.props.initTopic();
  }

  componentDidMount() {
    this.timeBeeFetch = setInterval(() => {
      if (this.props.topic.lastCursor > 0) {
        this.props.fetchLatestCollection(this.props.topic.lastCursor);
      }
    }, 3000);
  }
  componentWillUnmount() {
    clearInterval(this.timeBeeFetch);
  }

  render() {
    return (
      <div className={styles.main} data-tid="main">

        <Collection
          lastCursor={this.props.topic.lastCursor}
          count={this.props.topic.count}
          category={this.props.topic.category}
          collection={this.props.topic.collection}
          loading={this.props.topic.loading}
          moreLoading={this.props.topic.moreLoading}
          setCurrentUrl={this.props.setTopicCurrentUrl}
          setTopicTotalUrls={this.props.setTopicTotalUrls}
          initList={this.props.initTopic}
          loadMoreList={this.props.loadMoreTopic}
          setting={this.props.setting}
          fetchLatestCollection={this.props.fetchLatestCollection}
        />


        <ReadView
          disabledJavascript={this.props.setting.disabledJavascript}
          totalUrls={this.props.topic.totalUrls}
          setting={this.props.setting}
          currentUrl={this.props.topic.currentUrl}
        />
      </div>

    );
  }
}
function mapStateToProps(state) {
  return {
    topic: state.topic,
    setting: state.setting
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TopicActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
