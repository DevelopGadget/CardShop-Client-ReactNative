import React from 'react';
import { ImageBackground } from 'react-native';
import { Container, Content, Item, Icon, Input, Form, Button, Text, View } from 'native-base';
import ModalBox from '../Views/ModalBox';

const _Client = require('../Firebase/Firebase');

export default class Registro extends React.Component {

  constructor(props) {
    super(props);
    this.state = { User: { Nombre: '', Apellido: '', Email: '', Password: '' }, ModalView: false, ModalImage: false, ModalImageSet: '' }
  }

  Registrar = async () => {
    if (this.state.User.Nombre.length <= 0 || this.state.User.Apellido.length <= 0 || this.state.User.Email.length <= 0 || this.state.User.Password.length <= 0) {
      this.setState({ ModalTexto: 'Se requieren los campos', ModalImage: true, ModalView: true, ModalImageSet: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-512.png' });
    } else {
      this.setState({ ModalTexto: 'Espere...', ModalView: true, ModalImage: false });
      await _Client.Auth.createUserWithEmailAndPassword(this.state.User.Email, this.state.User.Password).then(() => {
        _Client.Auth.currentUser.updateProfile({ displayName: this.state.User.Nombre + ' ' + this.state.User.Apellido, photoURL: 'https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-512.png' }).then(() => {
          _Client.Auth.currentUser.sendEmailVerification().then(() => {
            this.setState({ ModalTexto: 'Revise su email para la verificación', ModalImage: true, ModalView: true, ModalImageSet: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-512.png', User: { Nombre: '', Apellido: '', Email: '', Password: '' } });
          })
        });
      }).catch((error) => {
        this.setState({ ModalTexto: error.message, ModalImage: true, ModalView: true, ModalImageSet: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-512.png' });
      })
    }
  }

  ModalClose = () => {
    this.setState({ ModalView: false });
  }

  render() {
    return (
      <ImageBackground source={{ uri: 'https://image.ibb.co/bWnJVT/Login.png' }} resizeMode='cover' style={{ width: '100%', height: '100%' }}>
        <Container>
          <Content padder contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
            <Form style={{ marginRight: 15 }}>
              <Item style={{ marginBottom: 20 }}>
                <Icon active type='FontAwesome' name='user' style={{ color: 'white', fontSize: 20, }} />
                <Input style={{ color: 'white' }} placeholder="Nombre" onChangeText={(Nombre) => this.setState({ User: { Email: this.state.User.Email, Password: this.state.User.Password, Nombre: Nombre, Apellido: this.state.User.Apellido }, ModalView: false })} value={this.state.User.Nombre} />
              </Item>
              <Item style={{ marginBottom: 20 }}>
                <Icon active type='FontAwesome' name='user' style={{ color: 'white', fontSize: 20, }} />
                <Input style={{ color: 'white' }} placeholder="Apellido" onChangeText={(Apellido) => this.setState({ User: { Email: this.state.User.Email, Password: this.state.User.Password, Nombre: this.state.User.Nombre, Apellido: Apellido }, ModalView: false })} value={this.state.User.Apellido} />
              </Item>
              <Item style={{ marginBottom: 20 }}>
                <Icon active type='Entypo' name='email' style={{ color: 'white' }} />
                <Input style={{ color: 'white' }} placeholder="Email" onChangeText={(Email) => this.setState({ User: { Email: Email, Password: this.state.User.Password, Nombre: this.state.User.Nombre, Apellido: this.state.User.Apellido }, ModalView: false })} value={this.state.User.Email} />
              </Item>
              <Item style={{ marginBottom: 40 }}>
                <Icon active type='MaterialIcons' name='vpn-key' style={{ color: 'white', fontSize: 20, }} />
                <Input style={{ color: 'white' }} secureTextEntry={true} placeholder="Contraseña" onChangeText={(Password) => this.setState({ User: { Email: this.state.User.Email, Password: Password, Nombre: this.state.User.Nombre, Apellido: this.state.User.Apellido }, ModalView: false })} value={this.state.User.Password} />
              </Item>
            </Form>
            <Button block rounded style={{ backgroundColor: '#b33b3c' }} onPress={this.Registrar.bind(this)}>
              <Text>Registrar</Text>
            </Button>
            <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
              <Button transparent onPress={() => this.props.navigation.push('Login')}>
                <Text style={{ color: 'white' }}>Login</Text>
              </Button>
            </View>
            {this.state.ModalView ? <ModalBox Text={this.state.ModalTexto} SpinnerComp={!this.state.ModalImage} Close={this.state.ModalImage} Image={this.state.ModalImage} ImageSet={this.state.ModalImageSet} CloseFun={this.ModalClose} /> : null}
          </Content>
        </Container>
      </ImageBackground>
    );
  }
}