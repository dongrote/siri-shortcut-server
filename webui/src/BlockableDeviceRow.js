import React, {Component} from 'react';
import {Grid, Button, Icon} from 'semantic-ui-react';
import BlockableDeviceButton from './BlockableDeviceButton';
import OnlineLabel from './OnlineLabel';

class BlockableDeviceRow extends Component {
  state = {onlineStatus: 'checking', loading: false, error: false};

  async updateOnlineStatus() {
    this.setState({onlineStatus: 'checking'});
    var res = await fetch(`/api/devices/online?hostname=${encodeURIComponent(this.props.device)}`);
    var json = await res.json();
    this.setState({
      onlineStatus: json.online ? 'online' : 'offline',
    });
    setTimeout(() => this.updateOnlineStatus(), 60000);
  }

  componentDidMount() {
    this.updateOnlineStatus();
  }

  async removeDevice(hostname) {
    this.setState({loading: true});
    var res = await fetch(`/api/devices?hostname=${encodeURIComponent(hostname)}`, {method: 'DELETE'});
    this.setState({loading: false, error: !res.ok});
  }

  render() {
    return (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Grid columns={1}>
              <Grid.Row>
                <Grid.Column>
                  <OnlineLabel
                    onClick={() => this.updateOnlineStatus()}
                    canonicalName={this.props.canonicalDevice}
                    onlineStatus={this.state.onlineStatus}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column verticalAlign='middle'>
                  <BlockableDeviceButton
                    device={this.props.device}
                    blocked={this.props.blocked}
                    onUnauthorized={this.props.onUnauthorized}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Button
                    negative
                    icon
                    loading={this.state.loading}
                    error={this.state.error}
                    onClick={() => this.removeDevice(this.props.device)}
                  >
                    <Icon name='trash alternate' />
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default BlockableDeviceRow;
