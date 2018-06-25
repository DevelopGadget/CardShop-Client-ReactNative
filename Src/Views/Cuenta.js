import React from 'react';
import { Icon, Content, Button, Container, Header, Item, Text} from 'native-base';
import ModalBox from '../Views/ModalBox';

export default class Cuenta extends React.Component {

  constructor(props) {
    super(props);
    this.state = {ModalView: false, ModalImage: false, ModalImageSet: ''}
  }

  async componentDidMount() {
  }
  
  render() {
    return (
      <Container style={{ backgroundColor: '#222b38' }}>
        {this.state.ModalView ? <ModalBox Text={this.state.ModalTexto} SpinnerComp={!this.state.ModalImage} Close={this.state.ModalImage} Image={this.state.ModalImage} ImageSet={this.state.ModalImageSet} /> : null}
      </Container>
    );
  }
}