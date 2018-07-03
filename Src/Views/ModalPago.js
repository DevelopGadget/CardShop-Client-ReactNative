import React from 'react';
import { Dimensions, WebView } from 'react-native';
import { Header, Button, Item, Icon } from 'native-base'
import Modal from 'react-native-modalbox';
import PropTypes from 'prop-types';

export default class ModalPago extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.refs.Modal.open();
  }
  componentDidUpdate() {
    this.refs.Modal.open();
  }
  render() {
    return (
      <Modal style={{ borderRadius: 20, shadowRadius: 20, width: Dimensions.get('window').width - 40, height: Dimensions.get('window').height - 100 }} position={"center"} ref={"Modal"} isDisabled={false} backdropPressToClose={false} swipeToClose={false} onClosed={this.props.Close.bind(this)}>
        <Header style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: '#ffff', borderColor: '#ffff' }}>
          <Item style={{ justifyContent: 'flex-end', flex: 1, flexDirection: 'row', marginRight: 15, marginTop: 5 }}>
            <Button iconLeft transparent onPress={() => this.refs.Modal.close()}>
              <Icon active type='FontAwesome' name='close' style={{ color: 'red' }} />
            </Button>
          </Item>
        </Header>
        <WebView source={require('./View.html')} />
      </Modal>
    );
  }
}

ModalPago.propTypes = {
  Close: PropTypes.func.isRequired
}