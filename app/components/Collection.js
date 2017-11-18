import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Moment from 'moment';
import { CircularProgress } from 'material-ui/Progress';
import { IconButton, Badge } from 'material-ui';

import 'material-ui/Form/FormHelperText';
import 'material-ui/colors/lightBlue';
import styles from './Collection.css';

Moment.locale('zh-CN');

export default class Collection extends Component {

  state = {
    hasScroll: false,
  }

  get getClientHeight() {
    return this.scrollBars.getClientHeight();
  }
  get getScrollTop() {
    return this.scrollBars.getScrollTop();
  }
  get getScrollHeight() {
    return this.scrollBars.getScrollHeight();
  }
  handlerRefresh() {
    this.props.initList();
    this.props.fetchLatestCollection(this.props.lastCursor);
    this.scrollBars.scrollToTop();
  }
  renderNewCollection() {
    const { collection, setting } = this.props;
    return collection.map((item) => {
      const clickUrl = () => {
        let topicUrl = '';
        if (item.newsArray) { topicUrl = item.newsArray[0].mobileUrl ? item.newsArray[0].mobileUrl : ''; }
        const singleUrl = setting.moblieFirst ? item.mobileUrl : item.url;
        switch (this.props.category) {
          case 'topic':
            return topicUrl;
          case 'news':
            return singleUrl;
          case 'tech':
            return singleUrl;
          default:
            return topicUrl;
        }
      };
      const setCurrentUrlAction = () => {
        switch (this.props.category) {
          case 'topic':
            return this.props.setCurrentUrl(clickUrl())
              && this.props.setTopicTotalUrls(item.newsArray);
          case 'news':
            return this.props.setCurrentUrl(clickUrl());
          case 'tech':
            return this.props.setCurrentUrl(clickUrl());
          default:
            return this.props.setCurrentUrl(clickUrl());
        }
      };
      return (
        <div key={item.id}>
          <ListItem
            button
            className={`${styles.collectionItem} collection-item`}
            data-tid="collectionItem"
            onClick={() => { setCurrentUrlAction(); }}
          >

            <ListItemText primary={item.title} secondary={setting.simpleMode ? '' : item.summary} />
          </ListItem>
          <div className={`${styles.fromNow}`} data-tid="fromNow">
            <span>{item.siteName}</span>
            <span> {Moment(item.publishDate).fromNow()}</span>
          </div>
          <Divider light />
        </div>
      );
    });
  }

  render() {
    return (
      <div className={`${styles.listCotent}`} data-tid="listCotent">

        <div className={` ${styles.toolbar}`} data-tid="toolbar">
          <IconButton
            color="default"
            aria-label="refresh"
            onClick={this.handlerRefresh.bind(this)}
          >
            <Badge
              className={`${this.props.count > 0 ? '' : styles.hideNumber} ${styles.refreshBadge}`}
              data-tid="refreshBadge"
              badgeContent={
                this.props.count}
              color="primary"
            >
              <i className="fa fa-refresh" aria-hidden="true" />
            </Badge>
          </IconButton>
        </div>

        <div className={styles.list} data-tid="list">
          <div className={styles.collection} data-tid="collection">
            <Scrollbars
              ref={(c) => { this.scrollBars = c; }}
              autoHide
              style={{ width: 280 }}
              onScroll={() => {
                if (parseFloat(this.getScrollTop) >=
                  parseFloat(this.getScrollHeight - this.getClientHeight)) {
                  // const hasScroll = false;
                  if (!this.state.hasScroll) {
                    this.props.loadMoreList();
                    this.setState({ hasScroll: true });
                    setTimeout(() => {
                      this.setState({ hasScroll: false });
                    }, 500);
                  }
                }
              }}
            >
              <List className="collection-list">
                {this.renderNewCollection()}
              </List>
              <div className={`${this.props.moreLoading ? '' : 'hide'} ${styles.loadmore}`} data-tid="loadmore">
                <CircularProgress size={20} />
              </div>
            </Scrollbars>

          </div>
        </div>
      </div>
    );
  }
}
Collection.propTypes = {
  initList: PropTypes.func.isRequired,
  fetchLatestCollection: PropTypes.func.isRequired,
  setCurrentUrl: PropTypes.func.isRequired,
  lastCursor: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  setTopicTotalUrls: PropTypes.func,
  setting: PropTypes.shape({
    moblieFirst: PropTypes.bool,
    simpleMode: PropTypes.bool
  }).isRequired,
  count: PropTypes.number.isRequired,
  loadMoreList: PropTypes.func.isRequired,
  moreLoading: PropTypes.bool.isRequired,
  collection: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
};

Collection.defaultProps = {
  setTopicTotalUrls: null
};

