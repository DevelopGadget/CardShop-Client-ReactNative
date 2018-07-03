import React from 'react';
import { BackHandler } from 'react-native';
import { Icon, Header, Item, Input, Button, Content, Container, StyleProvider, View, Spinner } from 'native-base';
import Theme from '../Themes/Tab';
import getTheme from '../Themes/components';
import GiftCard from './GiftCard';
import ModalPago from './ModalPago';

const _Client = require('../Firebase/Firebase');

export default class Cards extends React.Component {

  constructor(props) {
    super(props);
    this.state = { Elements: [], Load: false, Backup: [], Buscar: '', Pagar: false }
  }

  renderArray = async (Array) => {
    var Element = []
    Array.map((Cards, index) => {
      Cards.map((Data) => {
        Element.push(<GiftCard Nombre={Data.Nombre} UrlIcon={Data.UrlIcon} Image={Data.UrlCard} Disponible={Data.Disponible}  key={index} Id={Data.Id} Pagar={this.Pago}/>);
      })
    })
    this.setState({ Elements: Element, Load: true });
  }

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', function () {
      BackHandler.exitApp();
    });
    await fetch('https://cards-cardshop.herokuapp.com/Usuarios')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ Backup: responseJson });
        this.renderArray(responseJson);
      })
  }

  Update = async () => {
    this.setState({ Load: false });
    await fetch('https://cards-cardshop.herokuapp.com/Usuarios')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ Backup: responseJson });
        this.renderArray(responseJson);
      })
  }

  Buscar = async () => {
    if (this.state.Buscar.length > 0) {
      this.setState({ Load: false});
      var Array = [], Cards = [];
      this.state.Backup.map((item) => {
        item.map((CardCom) => {
          if (('GIFTCARD ' + CardCom.Nombre.toUpperCase() + ' ' + CardCom.Valor).includes(this.state.Buscar.toUpperCase())) {
            Array.push(CardCom);
          }
        })
      })
      Cards.push(Array);
      this.setState({ Buscar: '' });
      this.renderArray(Cards);
    } else {
      this.setState({Load: false });
      this.renderArray(this.state.Backup);
    }
  }

  Pago = async () => {
    this.setState({Pagar: true});
  }

  Close = async () => {
    this.setState({Pagar: false});
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#222b38' }}>
        <Header searchBar rounded style={{ backgroundColor: '#d93e3f' }}>
          <Item>
            <Input placeholder="Buscar" onChangeText={(Text) => this.setState({ Buscar: Text })} value={this.state.Buscar} />
            <Icon name="cards" type='MaterialCommunityIcons' style={{ color: '#d93e3f' }} />
            <Button transparent onPress={this.Update.bind(this)} active={this.state.Load}>
              <Icon name="cloud-sync" type='MaterialCommunityIcons' style={{ color: '#d93e3f' }} />
            </Button>
            <Button transparent onPress={this.Buscar.bind(this)} active={this.state.Load}>
              <Icon name="search" type='FontAwesome' style={{ color: '#d93e3f' }} />
            </Button>
          </Item>
        </Header>
        <Content padder>
          <StyleProvider style={getTheme(Theme)}>
            <View>
              {this.state.Load ? this.state.Elements : <Spinner color='red' size='large' />}
            </View>
          </StyleProvider>
        </Content>
        {this.state.Pagar ? <ModalPago Close={this.Close}/> : null}
      </Container>
    );
  }
}
