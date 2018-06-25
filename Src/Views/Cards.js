import React from 'react';
import { Image, BackHandler } from 'react-native';
import { Text, Icon, Header, Item, Input, Button, Content, Container, StyleProvider, Body, Left, Card, CardItem, Thumbnail, Right, View, Spinner } from 'native-base';
import Theme from '../Themes/Tab';
import getTheme from '../Themes/components';

const _Client = require('../Firebase/Firebase');

export default class Cards extends React.Component {

  constructor(props) {
    super(props);
    this.state = { Cards: [], Elements: [], Load: false, Backup: [], Buscar: '' }
  }

  renderArray = async () => {
    var Element = []
    this.state.Cards.map((Cards, index) => {
      Cards.map((Data) => {
        Element.push(
          <Card style={{ borderWidth: 0, borderRadius: 10, borderColor: '#324054', backgroundColor: '#222b38' }} key={index}>
            <CardItem style={{ borderColor: '#324054', borderWidth: 0, backgroundColor: '#324054', flexDirection: 'row', justifyContent: 'space-around' }} bordered>
              <Left>
                <Thumbnail source={{ uri: Data.UrlIcon }} small />
                <Text style={{ color: '#ffff' }}>GiftCard {Data.Nombre}</Text>
              </Left>
            </CardItem>
            <CardItem cardBody style={{ borderColor: '#324054', borderWidth: 0 }} bordered>
              <Image source={{ uri: 'http://www.rhinotelevisionmedia.co.uk/images/site/pound%20gift%20card.png' }} resizeMode='cover' style={{ height: 200, width: null, flex: 1 }} />
            </CardItem>
            <CardItem style={{ borderColor: '#324054', borderWidth: 0 }} bordered>
              <Left style={{ borderColor: '#324054', borderWidth: 0 }}>
                <Button transparent>
                  <Icon active name="heart" type={'FontAwesome'} style={{ color: '#ffff' }} />
                </Button>
              </Left>
              <Body style={{ flexDirection: "row", justifyContent: "center" }}>
                <Button transparent>
                  <Icon active name="shopping-bag" type={'FontAwesome'} style={{ color: '#ffff' }} />
                </Button>
              </Body>
              <Right style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
                <Icon active name="check-circle" type={'FontAwesome'} style={{ color: '#ffff' }} />
                <Text style={{ color: '#ffff', marginLeft: 5 }}>{Data.Disponible}</Text>
              </Right>
            </CardItem>
          </Card>
        );
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
        this.setState({ Cards: responseJson, Backup: responseJson });
        this.renderArray();
      })
  }

  Update = async () => {
    this.setState({ Load: false });
    await fetch('https://cards-cardshop.herokuapp.com/Usuarios')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ Cards: responseJson, Backup: responseJson });
        this.renderArray();
      })
  }

  Buscar = async () => {
    if (this.state.Buscar.length > 0) {
      this.setState({Load: false, Buscar: ''});
      var Array = [], Cards = [];
      this.state.Backup.map((item) => {
        item.map((CardCom) =>  {
          if(('GIFTCARD ' + CardCom.Nombre.toUpperCase() + ' ' + CardCom.Valor).includes(this.state.Buscar.toUpperCase())){
            Array.push(CardCom);
          }
        })
      })
      Cards.push(Array);
      console.log(Cards);
      this.setState({Cards: Cards});
      this.renderArray();
    } else {
      this.setState({ Cards: this.state.Backup, Load: false });
      this.renderArray();
    }
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#222b38' }}>
        <Header searchBar rounded style={{ backgroundColor: '#d93e3f' }}>
          <Item>
            <Input placeholder="Buscar" onChangeText={(Text) => this.setState({ Buscar: Text })} value={this.state.Buscar}/>
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
      </Container>
    );
  }
}
