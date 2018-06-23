import React from 'react';
import { ImageBackground } from 'react-native';
import { Container, Content, Item, Icon, Input, Form, Button, Text, Spinner, View } from 'native-base';
import ModalBox from '../Views/ModalBox';
import Users from '../Firebase/Users';

export default class Registro extends React.Component {

  constructor(props) {
    super(props);
    this.state = { User: { Nombre: '', Apellido: '', Email: '', Password: '' } }
  }

  Registrar = () =>{
    Users.Crear(this.state.User).then((User) => {

    }).catch((error) =>{
      translate(error.errorInfo.message, { to: 'es' }).then(Response => {
        console.log(Response.text);
      }).catch(err => {
        console.log(error.message);
      });
    });
  }

  render() {
    return (
      <ImageBackground source={{ uri: 'https://image.ibb.co/bWnJVT/Login.png' }} resizeMode='cover' style={{ width: '100%', height: '100%' }}>
        <Container>
          <Content padder contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
            <Form style={{ marginRight: 15}}>
              <Item style={{marginBottom: 20}}>
                <Icon active type='FontAwesome' name='user' style={{ color: 'white', fontSize: 20, }} />
                <Input style={{ color: 'white' }} secureTextEntry={true} placeholder="Nombre" onChangeText={(Nombre) => this.setState({ User: { Email: this.state.User.Email, Password: this.state.User.Password, Nombre: Nombre, Apellido: this.state.User.Apellido }, ModalView: false })} />
              </Item>
              <Item style={{marginBottom: 20}}>
                <Icon active type='FontAwesome' name='user' style={{ color: 'white', fontSize: 20, }} />
                <Input style={{ color: 'white' }} secureTextEntry={true} placeholder="Apellido" onChangeText={(Apellido) => this.setState({ User: { Email: this.state.User.Email, Password: this.state.User.Password, Nombre: this.state.User.Nombre, Apellido: Apellido }, ModalView: false })} />
              </Item>
              <Item style={{marginBottom: 20}}>
                <Icon active type='Entypo' name='email' style={{ color: 'white' }} />
                <Input style={{ color: 'white' }} placeholder="Email" onChangeText={(Email) => this.setState({ User: { Email: Email, Password: this.state.User.Password, Nombre: this.state.User.Nombre, Apellido: this.state.User.Apellido }, ModalView: false })} />
              </Item>
              <Item style={{marginBottom: 40}}>
                <Icon active type='MaterialIcons' name='vpn-key' style={{ color: 'white', fontSize: 20, }} />
                <Input style={{ color: 'white' }} secureTextEntry={true} placeholder="Contraseña" onChangeText={(Password) => this.setState({ User: { Email: this.state.User.Email, Password: Password, Nombre: this.state.User.Nombre, Apellido: this.state.User.Apellido }, ModalView: false })} />
              </Item>
            </Form>
            <Button block rounded style={{ backgroundColor: '#b33b3c' }} onPress={this.Registrar.bind(this)}>
                <Text>Registrar</Text>
              </Button>
          </Content>
        </Container>
      </ImageBackground>
    );
  }
}