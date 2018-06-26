import React from 'react';
import { Icon, Content, Button, Container, Header, Item, Text, List, ListItem, Body, Left, Right, Thumbnail } from 'native-base';
import ModalBox from '../Views/ModalBox';
import { Col, Row, Grid } from 'react-native-easy-grid';

const _Client = require('../Firebase/Firebase');

export default class Cuenta extends React.Component {

  constructor(props) {
    super(props);
    this.state = { ModalView: false, ModalImage: false, ModalImageSet: '' }
  }

  async componentDidMount() {
  }

  Borrar = async () => {
    _Client.Auth.currentUser.delete().then(() => {

    }).catch(() => {

    })
  }

  Restaurar = async () => {
    this.setState({ ModalTexto: 'Espere validando email', ModalView: true, ModalImage: false });
    await _Client.Auth.sendPasswordResetEmail(_Client.Auth.currentUser.email).then(() => {
      this.setState({ ModalTexto: 'Correo enviado', ModalImage: true, ModalView: true, ModalImageSet: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-512.png' });
    }).catch((error) => {
      this.setState({ ModalTexto: error.message, ModalImage: true, ModalView: true, ModalImageSet: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-512.png' });
    })
}

Salir = async () => {
  _Client.Auth.signOut().then(() => {

  }).catch((error) => {

  })
}

render() {
  return (
    <Container style={{ backgroundColor: '#222b38' }}>
      <Content>
        <Grid style={{ backgroundColor: '#b33b3c', flex: 1 }} >
          <Col style={{ justifyContent: 'center', marginBottom: 10, marginTop: 10, marginLeft: 10 }} size={1}>
            <Thumbnail source={{ uri: 'https://image.flaticon.com/icons/png/512/126/126317.png' }} large />
          </Col>
          <Col style={{ justifyContent: 'center', marginBottom: 10, marginTop: 10 }} size={2}>
            <Row>
              <Text style={{ color: 'white', fontSize: 17 }}>Hola, {_Client.Auth.currentUser.displayName}</Text>
            </Row>
            <Row>
              <Text style={{ color: 'white', fontSize: 17 }}>{_Client.Auth.currentUser.email}</Text>
            </Row>
          </Col>
        </Grid>
        <List style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'column' }}>
          <ListItem icon noBorder>
            <Left>
              <Icon active name='cards' type='MaterialCommunityIcons' style={{ color: '#ffff' }} />
            </Left>
            <Body>
              <Text style={{ color: 'white', fontSize: 22 }}>Movimientos</Text>
            </Body>
          </ListItem>
          <ListItem icon noBorder>
            <Left>
              <Icon name="favorite" type='MaterialIcons' style={{ color: 'white' }} />
            </Left>
            <Body>
              <Text style={{ color: 'white', fontSize: 22 }}>Favoritos</Text>
            </Body>
            <Right>
              <Icon name="hand-o-right" type='FontAwesome' style={{ color: '#ffff' }} />
            </Right>
          </ListItem>
          <ListItem icon noBorder>
            <Left>
              <Icon name="shopping-bag" type='Entypo' style={{ color: 'white' }} />
            </Left>
            <Body>
              <Text style={{ color: 'white', fontSize: 22 }}>Comprados</Text>
            </Body>
            <Right>
              <Icon name="hand-o-right" type='FontAwesome' style={{ color: '#ffff' }} />
            </Right>
          </ListItem>
          <ListItem icon noBorder>
            <Left>
              <Icon name="account-settings-variant" type='MaterialCommunityIcons' style={{ color: 'white' }} />
            </Left>
            <Body>
              <Text style={{ color: 'white', fontSize: 22 }}>Cuenta</Text>
            </Body>
          </ListItem>
          <ListItem icon noBorder>
            <Left>
              <Icon name="tumblr-reblog" type='MaterialCommunityIcons' style={{ color: 'white' }} />
            </Left>
            <Body>
              <Text style={{ color: 'white', fontSize: 22 }}>Cambiar Contraseña</Text>
            </Body>
            <Right>
              <Icon name="hand-o-right" type='FontAwesome' style={{ color: '#ffff' }} />
            </Right>
          </ListItem>
          <ListItem icon noBorder>
            <Left>
              <Icon name="md-log-out" type='Ionicons' style={{ color: 'white' }} />
            </Left>
            <Body>
              <Text style={{ color: 'white', fontSize: 22 }}>Cerrar Sesión</Text>
            </Body>
            <Right>
              <Icon name="hand-o-right" type='FontAwesome' style={{ color: '#ffff' }} />
            </Right>
          </ListItem>
          <ListItem icon noBorder>
            <Left>
              <Icon name="remove" type='FontAwesome' style={{ color: 'white' }} />
            </Left>
            <Body>
              <Text style={{ color: 'white', fontSize: 22 }}>Borrar Cuenta</Text>
            </Body>
            <Right>
              <Icon name="hand-o-right" type='FontAwesome' style={{ color: '#ffff' }} />
            </Right>
          </ListItem>
        </List>
      </Content>
      {this.state.ModalView ? <ModalBox Text={this.state.ModalTexto} SpinnerComp={!this.state.ModalImage} Close={this.state.ModalImage} Image={this.state.ModalImage} ImageSet={this.state.ModalImageSet} /> : null}
    </Container>
  );
}
}