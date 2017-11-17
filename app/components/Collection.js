import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Moment from 'moment';
import { CircularProgress } from 'material-ui/Progress';
import { IconButton, Badge } from 'material-ui';

import styles from './Collection.css';

Moment.locale('zh-CN');

export default class Collection extends Component {

  state = {
    hasScroll: false,
  }

  get getClientHeight() {
    return this.refs.scrollbars.getClientHeight();
  }
  get getScrollTop() {
    return this.refs.scrollbars.getScrollTop();
  }
  get getScrollHeight() {
    return this.refs.scrollbars.getScrollHeight();
  }
  handlerRefresh() {
    this.props.initList();
    this.props.fetchLatestCollection(this.props.lastCursor);
    this.refs.scrollbars.scrollToTop();
  }
  renderNewCollection() {
    return this.props.collection.map((item, key) => {
      const clickUrl = () => {
        switch (this.props.category) {
          case 'topic':
            const topicUrl = this.props.setting.moblieFirst ? item.newsArray[0].mobileUrl : item.newsArray[0].url;
            return topicUrl;
          case 'news':
            return item.url;
          case 'tech':
            return item.url;
        }
      };
      const setCurrentUrlAction = () => {
        switch (this.props.category) {
          case 'topic':
            return this.props.setCurrentUrl(clickUrl()) && this.props.setTopicTotalUrls(item.newsArray);
          case 'news':
            return this.props.setCurrentUrl(clickUrl());
          case 'tech':
            return this.props.setCurrentUrl(clickUrl());
        }
      };
      return (
        <div key={key}>
          <ListItem
            button
            className={styles.collectionItem}
            data-tid="collectionItem"
            onClick={() => { setCurrentUrlAction(); }}
          >

            <ListItemText primary={item.title} secondary={this.props.setting.simpleMode ? '' : item.summary} />
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
          <div className={styles.collection} data-tid="collection" >
            <Scrollbars
              ref="scrollbars"
              autoHide
              style={{ width: 280 }}
              onScroll={(e) => {
                if (~~this.getScrollTop >= ~~(this.getScrollHeight - this.getClientHeight)) {
                  const hasScroll = false;
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
              <List>
                {this.renderNewCollection()}
              </List>
              <div className={`${this.props.moreLoading ? '' : 'hide'} ${styles.loadmore}`} data-tid="loadmore">
                <CircularProgress size={20} />
              </div>
            </Scrollbars>

          </div>
        </div >
        {/* <div className={`${this.props.loading ? '' : 'hide'} ${styles.loading}`} data-tid="loading">
          <CircularProgress size={50} />
        </div> */}

      </div >

    );
  }
}
