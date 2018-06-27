import React from 'react';
import { Icon, Content, Container, Text, Body, Left, Right, Thumbnail, Card, CardItem, View, StyleProvider } from 'native-base';
import ModalBox from '../Views/ModalBox';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Theme from '../Themes/Tab'
import getTheme from '../Themes/components';

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
    /* _Client.Auth.signOut().then(() => {
   
     }).catch((error) => {
   
     }) */
  }

  AlertConfirm = async (Result, Mensaje) => {
    alert('Confirmación', 'Esta seguro que desea ' + Mensaje, [{ text: 'Si', onPress: () => Result() }, { text: 'No' }], { cancelable: false })
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
          <StyleProvider style={getTheme(Theme)}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'column', flex: 1 }}>
              <Card style={{ borderWidth: 0, borderRadius: 10, borderColor: '#324054', backgroundColor: '#324054' }}>
                <CardItem icon>
                  <Left>
                    <Icon active name='cards' type='MaterialCommunityIcons' style={{ color: '#ffff' }} />
                    <Text style={{ color: 'white', fontSize: 22 }}>Movimientos</Text>
                  </Left>
                </CardItem>
              </Card>
              <Card style={{ borderWidth: 0, borderRadius: 10, borderColor: '#324054', backgroundColor: '#324054' }}>
                <CardItem button icon>
                  <Left>
                    <Icon name="favorite" type='MaterialIcons' style={{ color: 'white' }} />
                    <Text style={{ color: 'white', fontSize: 22 }}>Favoritos</Text>
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
                    <Text style={{ color: 'white', fontSize: 22 }}>Comprados</Text>
                  </Left>
                  <Right>
                    <Icon name="hand-o-right" type='FontAwesome' style={{ color: '#ffff' }} />
                  </Right>
                </CardItem>
              </Card>
              <Card style={{ borderWidth: 0, borderRadius: 10, borderColor: '#324054', backgroundColor: '#324054' }}>
                <CardItem icon>
                  <Left>
                    <Icon name="account-settings-variant" type='MaterialCommunityIcons' style={{ color: 'white' }} />
                    <Text style={{ color: 'white', fontSize: 22 }}>Cuenta</Text>
                  </Left>
                </CardItem>
              </Card>
              <Card style={{ borderWidth: 0, borderRadius: 10, borderColor: '#324054', backgroundColor: '#324054' }}>
                <CardItem button icon style={{ flexDirection: 'row' }}>
                  <Left style={{flex: 1}}>
                    <Icon name="tumblr-reblog" type='MaterialCommunityIcons' style={{ color: 'white' }} />
                    <Text style={{ color: 'white', fontSize: 22 }}>Cambiar Contraseña</Text>
                  </Left>
                  <Right>
                    <Icon name="hand-o-right" type='FontAwesome' style={{ color: '#ffff' }} />
                  </Right>
                </CardItem>
              </Card>
              <Card style={{ borderWidth: 0, borderRadius: 10, borderColor: '#324054', backgroundColor: '#324054' }}>
                <CardItem button icon>
                  <Left>
                    <Icon name="md-log-out" type='Ionicons' style={{ color: 'white' }} />
                    <Text style={{ color: 'white', fontSize: 22 }}>Cerrar Sesión</Text>
                  </Left>
                  <Right>
                    <Icon name="hand-o-right" type='FontAwesome' style={{ color: '#ffff' }} />
                  </Right>
                </CardItem>
              </Card>
              <Card style={{ borderWidth: 0, borderRadius: 10, borderColor: '#324054', backgroundColor: '#324054' }}>
                <CardItem button icon>
                  <Left>
                    <Icon name="remove" type='FontAwesome' style={{ color: 'white' }} />
                    <Text style={{ color: 'white', fontSize: 22 }}>Borrar Cuenta</Text>
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
                    <Text style={{ color: 'white', fontSize: 22 }}>Sobre CardShop</Text>
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
      </Container>
    );
  }
}