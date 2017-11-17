import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BodyClassName from 'react-body-classname';
import Switch from 'material-ui/Switch';
import { ipcRenderer } from 'electron';
import IconButton from 'material-ui/IconButton';
import SettingsBackupRestoreIcon from 'material-ui-icons/SettingsBackupRestore';
import SettingsPowerIcon from 'material-ui-icons/SettingsPower';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import * as SettingActions from '../actions/setting';

class SettingPage extends Component {

  state = {
  };

  render() {
    return (
      <BodyClassName className="setting">
        <div className="content">
          <div className="heroTitle">
            <IconButton
              onClick={() => { ipcRenderer.send('apply-setting', 'reload'); }}
              aria-label="Delete"
            >
              <SettingsBackupRestoreIcon />
            </IconButton>
            <span >readhubTron</span>
            <IconButton
              onClick={() => { ipcRenderer.send('apply-setting', 'quit'); }}
              aria-label="Delete"
            >
              <SettingsPowerIcon />
            </IconButton>
          </div>
          <div className="settingFrom">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.props.setting.simpleMode}
                    onChange={() => this.props.switchSimpleMode(!this.props.setting.simpleMode)}
                  />
                }
                label="简洁模式"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={this.props.setting.notificationMode}
                    onChange={
                      () => {
                        this.props.switchNotificationMode(!this.props.setting.notificationMode);
                      }}
                    label="开启通知模式"
                  />
                }
                label="开启通知模式"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={this.props.setting.moblieFirst}
                    onChange={() => {
                      this.props.switchMoblieFirstMode(!this.props.setting.moblieFirst);
                    }}
                  />
                }
                label="优先使用Mobile页面"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={this.props.setting.disabledJavascript}
                    onChange={() => {
                      this.props.switchDisabledJavascript(!this.props.setting.disabledJavascript);
                    }}
                  />
                }
                label="禁止页面运用javascript"
              />
            </FormGroup>
          </div>
        </div>
      </BodyClassName>

    );
  }
}
function mapStateToProps(state) {
  return {
    setting: state.setting
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SettingActions, dispatch);
}
SettingPage.propTypes = {
  switchSimpleMode: PropTypes.func.isRequired,
  switchNotificationMode: PropTypes.func.isRequired,
  switchMoblieFirstMode: PropTypes.func.isRequired,
  switchDisabledJavascript: PropTypes.func.isRequired,
  setting: PropTypes.shape({
    simpleMode: PropTypes.bool,
    notificationMode: PropTypes.bool,
    moblieFirst: PropTypes.bool,
    disabledJavascript: PropTypes.bool
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage);
