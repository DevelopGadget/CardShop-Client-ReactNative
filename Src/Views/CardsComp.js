import React from 'react';
import { Icon, Content, Container, StyleProvider, Header, Item, Input, Button, Spinner } from 'native-base';
import PropTypes from 'prop-types';
import Theme from '../Themes/Tab'
import getTheme from '../Themes/components';
import GiftCard from './GiftCard';

export default class CardsComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Buscar: '', Elements: [], Load: false }
  }

  GiftCards = async (Cards) => {
    var Element = [];
    Cards.map((Data, index) => {
      Element.push(
        <GiftCard Nombre={Data.Nombre} UrlIcon={Data.UrlIcon} Image={Data.UrlCard} Disponible={Data.Disponible} key={index} Id={Data.Id} />
      );
    })
    this.setState({ Load: true, Elements: Element });
  }

  async componentDidMount() {
    this.GiftCards(this.props.Array);
  }

  Buscar = async () => {
    if (this.state.Buscar.length > 0) {
      this.setState({ Load: false });
      var Array = [];
      this.props.Array.map((CardCom) => {
        if (('GIFTCARD ' + CardCom.Nombre.toUpperCase() + ' ' + CardCom.Valor + ' USD').includes(this.state.Buscar.toUpperCase())) {
          Array.push(CardCom);
        }
      })
      this.setState({ Buscar: '' });
      this.GiftCards(Array);
    }
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#222b38' }}>
        <Header searchBar rounded style={{ backgroundColor: '#d93e3f' }}>
          <Item>
            <Input placeholder="Buscar" onChangeText={(Text) => this.setState({ Buscar: Text })} value={this.state.Buscar} />
            <Icon name="cards" type='MaterialCommunityIcons' style={{ color: '#d93e3f' }} />
            <Button transparent onPress={this.props.Back.bind(this)}>
              <Icon active name="md-arrow-round-back" type='Ionicons' style={{ color: '#d93e3f' }} />
            </Button>
            <Button transparent onPress={this.Buscar.bind(this)} active={this.state.Load}>
              <Icon name="search" type='FontAwesome' style={{ color: '#d93e3f' }} />
            </Button>
          </Item>
        </Header>
        <StyleProvider style={getTheme(Theme)}>
          <Content padder>
            {this.state.Load ? this.state.Elements : <Spinner color='red' size='large' />}
          </Content>
        </StyleProvider>
      </Container>
    );
  }
}
CardsComp.propTypes = {
  Array: PropTypes.array.isRequired,
  Back: PropTypes.func.isRequired
}

