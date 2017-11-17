import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { ipcRenderer } from 'electron';
import Fire from '../../resources/icons8-sales_channels.png';
import Trend from '../../resources/icons8-ovality_sensor_filled.png';
import Developer from '../../resources/icons8-developer.png';

class SideBarNav extends Component {
  state = {}

  render() {
    const { dispatch }: viod = this.props;
    const currentTabNamePath = this.props.router.location.pathname;
    const currentTabName = currentTabNamePath.split('/').pop().trim();
    // if (currentTabName.length == 0) {
    //   currentTabName = 'topic'
    // }
    ipcRenderer.on('touchbar-click-reply', (event, arg) => {
      if (arg === 'topic') {
        dispatch(push('/topic'));
      }
      if (arg === 'news') {
        dispatch(push('/news'));
      }
      if (arg === 'tech') {
        dispatch(push('/tech'));
      }
    });
    return (
      <div className="sidebar">
        <nav>
          <a
            role="presentation"
            className={`item ${(currentTabName === 'topic' || currentTabName.length === 0) ? 'current' : ''}`}
            onClick={() => { dispatch(push('/topic')); }}
          >
            <IconButton color="contrast" aria-label="refresh">
              <img src={Fire} alt="Fire" />
            </IconButton>
            <span className="nav-label">热门话题</span>
          </a>
          <a
            role="presentation"
            className={`item ${currentTabName === 'news' ? 'current' : ''}`}
            onClick={() => { dispatch(push('/news')); }}
          >
            <IconButton color="contrast" aria-label="refresh">
              <img src={Trend} alt="Trend" />
            </IconButton>
            <span className="nav-label">科技动态</span>
          </a>

          <a
            role="presentation"
            className={`item ${currentTabName === 'tech' ? 'current' : ''}`}
            onClick={() => { dispatch(push('/tech')); }}
          >
            <IconButton color="contrast" aria-label="refresh">
              <img src={Developer} alt="Developer" />
            </IconButton>
            <span className="nav-label">开发者资讯</span>

          </a>

        </nav>

      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    router: state.router

  };
}

SideBarNav.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string
    })
  }).isRequired

};

export default connect(mapStateToProps, null)(SideBarNav);

