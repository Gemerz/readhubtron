import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as TechActions from '../actions/tech';
import ReadView from '../components/ReadView';
import Collection from '../components/Collection';
// style

import styles from './HomePage.css';


class TechPage extends Component {

  state = {
    refreshScrollTop: false
  }

  componentWillMount() {
    this.props.initTech();
  }

  render() {
    return (
      <div className={styles.main} data-tid="main">
        <Collection
          lastCursor={this.props.tech.lastCursor}
          count={this.props.tech.count}
          category={this.props.tech.category}
          collection={this.props.tech.collection}
          loading={this.props.tech.loading}
          moreLoading={this.props.tech.moreLoading}
          setCurrentUrl={this.props.setTechCurrentUrl}
          initList={this.props.initTech}
          setting={this.props.setting}
          loadMoreList={this.props.loadMoreTech}
          fetchLatestCollection={this.props.fetchLatestCollection}
        />


        <ReadView currentUrl={this.props.tech.currentUrl} />
      </div>

    );
  }
}
function mapStateToProps(state) {
  return {
    tech: state.tech,
    setting: state.setting
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TechActions, dispatch);
}
TechPage.propTypes = {
  initTech: PropTypes.func.isRequired,
  fetchLatestCollection: PropTypes.func.isRequired,
  loadMoreTech: PropTypes.func.isRequired,
  setTechCurrentUrl: PropTypes.func.isRequired,
  setting: PropTypes.shape({
    disabledJavascript: PropTypes.bool.isRequired
  }).isRequired,
  tech: PropTypes.shape({
    lastCursor: PropTypes.string,
    count: PropTypes.number,
    category: PropTypes.string,
    collection: PropTypes.object,
    loading: PropTypes.bool,
    moreLoading: PropTypes.bool,
    totalUrls: PropTypes.string,
    currentUrl: PropTypes.string
  }).isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(TechPage);
