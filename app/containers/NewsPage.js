import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as NewsActions from '../actions/news';
import ReadView from '../components/ReadView';
import Collection from '../components/Collection';
// style

import styles from './HomePage.css';


class NewsPage extends Component {

  state = {
    refreshScrollTop: false
  }

  componentWillMount() {
    this.props.initNews();
  }

  render() {
    return (
      <div className={styles.main} data-tid="main">
        <Collection
          lastCursor={this.props.news.lastCursor}
          count={this.props.news.count}
          category={this.props.news.category}
          collection={this.props.news.collection}
          loading={this.props.news.loading}
          moreLoading={this.props.news.moreLoading}
          setCurrentUrl={this.props.setNewsCurrentUrl}
          initList={this.props.initNews}
          setting={this.props.setting}
          loadMoreList={this.props.loadMoreNews}
          fetchLatestCollection={this.props.fetchLatestCollection}
          fetchTime={3000}
        />


        <ReadView currentUrl={this.props.news.currentUrl} />
      </div>

    );
  }
}
function mapStateToProps(state) {
  return {
    news: state.news,
    setting: state.setting
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NewsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
