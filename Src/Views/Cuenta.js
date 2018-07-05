import React from 'react';
import { Dimensions } from 'react-native';
import { Icon, Content, Container, Text, Left, Right, Thumbnail, Card, CardItem, View, StyleProvider, Header, Button, Item } from 'native-base';
import ModalBox from '../Views/ModalBox';
import { Col, Row, Grid } from 'react-native-easy-grid';
import ModalConfirm from './ModalConfirm';
import Theme from '../Themes/Tab'
import getTheme from '../Themes/components';
import CardsComp from './CardsComp';
import Modal from 'react-native-modalbox';

const _Client = require('../Firebase/Firebase');
const Avatars = ['https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-512.png', 'https://cdn0.iconfinder.com/data/icons/halloween-avatars/1024/Capt_Spaulding-01.png', 'https://cdn0.iconfinder.com/data/icons/halloween-avatars/1024/Zombie-01.png', 'https://cdn0.iconfinder.com/data/icons/halloween-avatars/1024/Zombie_PVZ-01.png', 'https://cdn4.iconfinder.com/data/icons/avatar-vol-1-3/512/5-512.png', 'https://cdn4.iconfinder.com/data/icons/monsters-vol-2/512/8-512.png'];

export default class Cuenta extends React.Component {

  constructor(props) {
    super(props);
    this.state = { ModalView: false, ModalImage: false, ModalImageSet: '', ModalTexto: '', ModalConfirm: null, Select: false, Load: false }
    this.Favoritos = [];
  }

  async componentDidMount() {
    await fetch('https://cards-cardshop.herokuapp.com/Usuarios')
      .then((response) => response.json())
      .then((responseJson) => {
        this.Cards(responseJson, 'Favoritos', this.Favoritos);
      })
  }

  Cards = async (Array, Id, Push) => {
    _Client.Database.ref(_Client.Auth.currentUser.uid + '/' + Id).on('value', (data) => {
      Push.length = 0;
      data.forEach(value => {
        Array.some(item => {
          var Filter = item.filter(Data => { return Data.Id === value.val() });
          if (Filter[0] !== undefined) {
            Push.push(Filter[0]);
            return Filter[0];
          }
        })
      })
    });
  }

  Borrar = async () => {
    this.setState({ ModalTexto: 'Espere...', ModalView: true, ModalImage: false });
    _Client.Auth.currentUser.delete().then(() => {
      this.props.navigation.push('Login');
    }).catch((error) => {
      this.setState({ ModalTexto: error.message, ModalImage: true, ModalView: true, ModalImageSet: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-512.png', ModalConfirm: false });
    })
  }

  ModalClose = async () => {
    this.setState({ ModalConfirm: null });
  }

  Restaurar = async () => {
    this.setState({ ModalTexto: 'Espere validando email', ModalView: true, ModalImage: false });
    await _Client.Auth.sendPasswordResetEmail(_Client.Auth.currentUser.email).then(() => {
      this.setState({ ModalTexto: 'Correo enviado sesión caducada', ModalImage: true, ModalView: true, ModalImageSet: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-512.png', ModalConfirm: false });
    }).catch((error) => {
      this.setState({ ModalTexto: error.message, ModalImage: true, ModalView: true, ModalImageSet: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-512.png', ModalConfirm: false });
    })
  }

  Salir = async () => {
    this.setState({ ModalTexto: 'Espere...', ModalView: true, ModalImage: false });
    await _Client.Auth.signOut().then(() => {
      this.props.navigation.push('Login');
    }).catch((error) => {
      this.setState({ ModalTexto: error.message, ModalImage: true, ModalView: true, ModalImageSet: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-512.png', ModalConfirm: false });
    })
  }

  Back = async () => {
    this.setState({ Select: false });
  }

  render() {
    if (this.state.Select) {
      return (
        <CardsComp Array={this.Favoritos} Back={this.Back} />
      );
    } else {
      return (
        <Container style={{ backgroundColor: '#222b38' }}>
          <Content>
            <Grid style={{ backgroundColor: '#b33b3c', flex: 1 }} >
              <Col style={{ justifyContent: 'center', marginBottom: 10, marginTop: 10, marginLeft: 10 }} size={1}>
                <Thumbnail source={{ uri: _Client.Auth.currentUser.photoURL }} large />
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
            <StyleProvider style={getTheme(Theme)}>
              <View style={{ justifyContent: 'space-between', flexDirection: 'column', flex: 1 }}>
                <Card style={{ borderWidth: 0, borderRadius: 10, borderColor: '#324054', backgroundColor: '#324054' }}>
                  <CardItem button icon onPress={() => this.setState({ Select: true })}>
                    <Left>
                      <Icon name="favorite" type='MaterialIcons' style={{ color: 'white' }} />
                      <Text style={{ color: 'white', fontSize: 18 }}>Favoritos</Text>
                    </Left>
                    <Right>
                      <Icon name="hand-o-right" type='FontAwesome' style={{ color: '#ffff' }} />
                    </Right>
                  </CardItem>
                </Card>
                <Card style={{ borderWidth: 0, borderRadius: 10, borderColor: '#324054', backgroundColor: '#324054' }}>
                  <CardItem button icon>
                    <Left>
                      <Icon name="shopping-bag" type='Entypo' style={{ color: 'white' }} />
                      <Text style={{ color: 'white', fontSize: 18 }}>Comprados</Text>
                    </Left>
                    <Right>
                      <Icon name="hand-o-right" type='FontAwesome' style={{ color: '#ffff' }} />
                    </Right>
                  </CardItem>
                </Card>
                <Card style={{ borderWidth: 0, borderRadius: 10, borderColor: '#324054', backgroundColor: '#324054' }}>
                  <CardItem button icon style={{ flexDirection: 'row' }} onPress={() => this.refs.Modal.open()}>
                    <Left style={{ flex: 1 }}>
                      <Icon name="users" type='FontAwesome' style={{ color: 'white' }} />
                      <Text style={{ color: 'white', fontSize: 18 }}>Cambiar Avatar</Text>
                    </Left>
                    <Right>
                      <Icon name="hand-o-right" type='FontAwesome' style={{ color: '#ffff' }} />
                    </Right>
                  </CardItem>
                </Card>
                <Card style={{ borderWidth: 0, borderRadius: 10, borderColor: '#324054', backgroundColor: '#324054' }}>
                  <CardItem button icon style={{ flexDirection: 'row' }} onPress={() => this.setState({ ModalConfirm: <ModalConfirm Confirm={this.Restaurar} No={this.ModalClose} Text='¿Esta seguro que desea cambiar la contraseña?' /> })}>
                    <Left style={{ flex: 1 }}>
                      <Icon name="tumblr-reblog" type='MaterialCommunityIcons' style={{ color: 'white' }} />
                      <Text style={{ color: 'white', fontSize: 18 }}>Cambiar Contraseña</Text>
                    </Left>
                    <Right>
                      <Icon name="hand-o-right" type='FontAwesome' style={{ color: '#ffff' }} />
                    </Right>
                  </CardItem>
                </Card>
                <Card style={{ borderWidth: 0, borderRadius: 10, borderColor: '#324054', backgroundColor: '#324054' }}>
                  <CardItem button icon onPress={() => this.setState({ ModalConfirm: <ModalConfirm Confirm={this.Salir} No={this.ModalClose} Text='¿Esta seguro que desea salir?' /> })}>
                    <Left>
                      <Icon name="md-log-out" type='Ionicons' style={{ color: 'white' }} />
                      <Text style={{ color: 'white', fontSize: 18 }}>Cerrar Sesión</Text>
                    </Left>
                    <Right>
                      <Icon name="hand-o-right" type='FontAwesome' style={{ color: '#ffff' }} />
                    </Right>
                  </CardItem>
                </Card>
                <Card style={{ borderWidth: 0, borderRadius: 10, borderColor: '#324054', backgroundColor: '#324054' }}>
                  <CardItem button icon onPress={() => this.setState({ ModalConfirm: <ModalConfirm Confirm={this.Borrar} No={this.ModalClose} Text='¿Esta seguro que desea borrar la cuenta?' /> })}>
                    <Left>
                      <Icon name="remove" type='FontAwesome' style={{ color: 'white' }} />
                      <Text style={{ color: 'white', fontSize: 18 }}>Borrar Cuenta</Text>
                    </Left>
                    <Right>
                      <Icon name="hand-o-right" type='FontAwesome' style={{ color: '#ffff' }} />
                    </Right>
                  </CardItem>
                </Card>
                <Card style={{ borderWidth: 0, borderRadius: 10, borderColor: '#324054', backgroundColor: '#324054' }}>
                  <CardItem button icon>
                    <Left>
                      <Icon name="info" type='Entypo' style={{ color: 'white' }} />
                      <Text style={{ color: 'white', fontSize: 18 }}>Sobre CardShop</Text>
                    </Left>
                    <Right>
                      <Icon name="hand-o-right" type='FontAwesome' style={{ color: '#ffff' }} />
                    </Right>
                  </CardItem>
                </Card>
              </View>
            </StyleProvider>
          </Content>
          {this.state.ModalView ? <ModalBox Text={this.state.ModalTexto} SpinnerComp={!this.state.ModalImage} Close={this.state.ModalImage} Image={this.state.ModalImage} ImageSet={this.state.ModalImageSet} /> : null}
          {this.state.ModalConfirm}
          <Modal style={{ borderRadius: 20, shadowRadius: 20, width: Dimensions.get('window').width - 60, height: 400 }} position={"center"} ref={"Modal"} isDisabled={false} backdropPressToClose={false} swipeToClose={false}>
            <Header style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: '#ffff', borderColor: '#ffff' }}>
              <Item style={{ justifyContent: 'center', flex: 1, flexDirection: 'row', marginRight: 15, marginTop: 5 }}>
                <Text style={{ fontSize: 20 }}>Seleccione Avatar</Text>
              </Item>
              <Item style={{ justifyContent: 'flex-end', flex: 1, flexDirection: 'row', marginRight: 15, marginTop: 5 }}>
                <Button iconLeft transparent onPress={() => this.refs.Modal.close()}>
                  <Icon active type='FontAwesome' name='close' style={{ color: 'red' }} />
                </Button>
              </Item>
            </Header>
            <Grid style={{ marginTop: 20 }}>
              <Row>
                <Col style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
                  <Thumbnail source={{ uri: Avatars[0] }} large />
                </Col>
                <Col style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
                  <Thumbnail source={{ uri: Avatars[1] }} large />
                </Col>
              </Row>
              <Row>
                <Col style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
                  <Thumbnail source={{ uri: Avatars[2] }} large />
                </Col>
                <Col style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
                  <Thumbnail source={{ uri: Avatars[3] }} large />
                </Col>
              </Row>
              <Row>
                <Col style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
                  <Thumbnail source={{ uri: Avatars[4] }} large />
                </Col>
                <Col style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
                  <Thumbnail source={{ uri: Avatars[5] }} large />
                </Col>
              </Row>
            </Grid>
          </Modal>
        </Container>
      );
    }
  }
}