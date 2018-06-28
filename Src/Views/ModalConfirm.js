import React from 'react';
import { Dimensions } from 'react-native';
import Modal from 'react-native-modalbox';
import PropTypes from 'prop-types';
import { Text, Button, Thumbnail } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class ModalBox extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.refs.Modal.open();
  }
  componentDidUpdate() {
    this.refs.Modal.open();
  }
  No = () => {
    this.props.No();
    this.refs.Modal.close();
  }
  Si = () => {
    this.props.Confirm();
    this.refs.Modal.close();
  }
  render() {
    return (
      <Modal style={{width: Dimensions.get('window').width - 60, height: 160 }} position={"center"} ref={"Modal"} isDisabled={false} backdropPressToClose={false} swipeToClose={false}>
        <Grid style={{ flex: 1, }}>
          <Row size={3}>
            <Col size={1} style={{ justifyContent: 'center', marginLeft: 10,}}>
              <Thumbnail source={{ uri: 'https://cdn3.iconfinder.com/data/icons/social-7/500/Help_mark_query_question_support_talk-512.png' }} large />
            </Col>
            <Col size={2} style={{ justifyContent: 'center'}}>
              <Text style={{ color: 'black' }}>{this.props.Text}</Text>
            </Col>
          </Row>
          <Row size={1}>
            <Col size={1} style={{ justifyContent: 'center' }}>
              <Button block style={{ backgroundColor: '#b33b3c' }} onPress={this.Si.bind(this)}>
                <Text>Si</Text>
              </Button>
            </Col>
            <Col size={1} style={{ justifyContent: 'center' }}>
              <Button block info onPress={this.No.bind(this)}>
                <Text>No</Text>
              </Button>
            </Col>
          </Row>
        </Grid>
      </Modal>
    );
  }
}

ModalBox.propTypes = {
  Text: PropTypes.string.isRequired,
  Confirm: PropTypes.func.isRequired,
  No: PropTypes.func.isRequired
}
