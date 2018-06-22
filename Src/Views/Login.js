import React from 'react';
import { ImageBackground, StatusBar } from 'react-native';
import { Container, Content, Item, Icon, Input, Form, Button, Text, Spinner, View } from 'native-base';
import ModalBox from '../Views/ModalBox';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Font: false, Network: true, User: { Username: '', Password: '' }, ModalTexto: '', ModalView: false, ModalImage: false, ModalImageSet: '' };
  }
  componentDidMount() {
    StatusBar.setHidden(true);
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ Font: true });
  }
  Login = () => {
    if (this.state.User.Username.length <= 0 || this.state.User.Password.length <= 0) {
      this.setState({ ModalTexto: 'Se requieren los campos', ModalImage: true, ModalView: true, ModalImageSet: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-512.png' });
    } else {
      this.setState({ ModalTexto: 'Espere validando ingreso...', ModalView: true, ModalImage: false });
    }
  }
  render() {
    if (this.state.Font) {
      return (
        <ImageBackground source={{uri: 'https://image.ibb.co/bWnJVT/Login.png'}} resizeMode='cover' style={{ width: '100%', height: '100%' }}>
          <Container>
            <Content padder contentContainerStyle={{ flex: 1, justifyContent: 'flex-end' }}>
              <Form style={{ marginRight: 15, marginTop: 20 }}>
                <Item>
                  <Icon active type='FontAwesome' name='user-circle' style={{ color: 'white' }} />
                  <Input style={{ color: 'white' }} placeholder="Correo" onChangeText={(Username) => this.setState({ User: { Username: Username, Password: this.state.User.Password }, ModalView: false })} />
                </Item>
                <Item>
                  <Icon active type='MaterialIcons' name='vpn-key' style={{ color: 'white', fontSize: 20, }} />
                  <Input style={{ color: 'white' }} secureTextEntry={true} placeholder="Contraseña" onChangeText={(Password) => this.setState({ User: { Username: this.state.User.Username, Password: Password }, ModalView: false })} />
                </Item>
              </Form>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
                <Button transparent>
                  <Text style={{ color: 'white' }}>Restaurar Contraseña</Text>
                </Button>
              </View>
              <Button block rounded style={{ backgroundColor: '#b33b3c' }} onPress={this.Login.bind(this)}>
                <Text>Login</Text>
              </Button>
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20}}>
                <Button transparent onPress={() => this.props.navigation.push('Registro')}>
                  <Text style={{ color: 'white' }}>Registrar</Text>
                </Button>
              </View>
            </Content>
          </Container>
          {this.state.ModalView ? <ModalBox Text={this.state.ModalTexto} SpinnerComp={!this.state.ModalImage} Close={this.state.ModalImage} Image={this.state.ModalImage} ImageSet={this.state.ModalImageSet} /> : null}
        </ImageBackground>
      );
    } else {
      return (
        <Container>
          <Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
            <Spinner color='blue' size='large' />
          </Content>
        </Container>
      );
    }
  }
}