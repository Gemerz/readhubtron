import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from 'material-ui/Progress';
import WebView from 'react-electron-web-view';
import IconButton from 'material-ui/IconButton';
import ComputerIcon from 'material-ui-icons/Computer';
import CollectionsIcon from 'material-ui-icons/Collections';
import Dialog from 'material-ui/Dialog';
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import Slide from 'material-ui/transitions/Slide';
// import { push } from 'react-router-redux';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import { ipcRenderer } from 'electron';
import styles from './ReadView.css';


export default class ReadView extends Component {

  state = {
    WebViewLoading: true,
    open: false

  }


  componentDidMount() {

  }

  componentWillUnmount() {

  }
  handleRequestOpen() {
    this.setState({ open: true });
  }
  handleRequestClose() {
    this.setState({ open: false });
  }
  renderTotalUrls() {
    if (this.props.totalUrls) {
      const totalUrls: {} = this.props.totalUrls;
      return Object.keys(totalUrls).map((key, item) => (
        <div key={key}>

          <ListItem button onClick={() => { ipcRenderer.send('apply-open-url', totalUrls[item].url); }}>
            <ListItemAvatar>
              <Avatar >{totalUrls[item].siteName.charAt(0)}</Avatar>
            </ListItemAvatar>

            <ListItemText primary={`${totalUrls[item].title}  -- ${totalUrls[item].siteName}`} className={styles.totalUrlsCotent} data-tid="totalUrlsCotent" />

          </ListItem >

          <Divider light />
        </div>


      ));
    }
  }

  render() {
    const insertCss = '::-webkit-scrollbar{ background-color: #fff;width:6px;height:6px;}::-webkit-scrollbar-thumb:window-inactive,::-webkit-scrollbar-thumb{background:rgba(0,0,0,0.2);border-radius:5px; }';

    return (
      <div className={styles.readCotent} data-tid="readCotent">

        <div className={styles.toolsBar} data-tid="toolsBar">
          <IconButton
            className={this.props.totalUrls ? '' : 'hide'}
            onClick={this.handleRequestOpen.bind(this)}
            aria-label="Send"
          >
            <CollectionsIcon />
          </IconButton>


          <IconButton
            aria-label="Send"
            onClick={() => { ipcRenderer.send('apply-open-url', this.props.currentUrl); }}
          >
            <ComputerIcon />
          </IconButton>

        </div>

        <div className={styles.webviewContent} data-tid="webviewContent">
          <div style={{ width: '100%' }} className={`${this.state.WebViewLoading ? '' : 'hide'}`} >
            <LinearProgress />
          </div>
          <div className={styles.views} data-tid="views">
            <WebView
              ref={(c) => { this.webView = c; }}
              className="readWebview"
              nodeintegration
              autosize
              webpreferences={`allowRunningInsecureContent,${this.props.disabledJavascript ? 'javascript=no' : ''}`}
              style={{ width: '100%', height: '100%', overflow: 'hidden' }}
              src={this.props.currentUrl}
              onDomReady={() => {
                console.log('done');
                this.setState({ WebViewLoading: false });
                this.webView.insertCSS(insertCss);
              }}
              onDidStartLoading={() => {
                console.log('loading');
                this.setState({ WebViewLoading: true });
                this.webView.insertCSS(insertCss);
              }}
              onDidStopLoading={() => {
                console.log('stoploading');
                this.setState({ WebViewLoading: false });
              }}
            />
          </div>

          <Dialog
            onRequestClose={this.handleRequestClose.bind(this)}
            transition={Slide}
            open={this.state.open}
          >
            {/* <DialogTitle >Set backup account</DialogTitle> */}
            <List className={styles.totalUrls} data-tid="totalUrls" >
              {this.renderTotalUrls()}
            </List>
          </Dialog>
        </div>
      </div >
    );
  }
}
ReadView.propTypes = {
  totalUrls: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  currentUrl: PropTypes.string.isRequired,
  disabledJavascript: PropTypes.bool,
};

ReadView.defaultProps = {
  totalUrls: [],
  disabledJavascript: true
};
