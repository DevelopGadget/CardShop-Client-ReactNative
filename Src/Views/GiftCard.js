import React from 'react';
import { Image } from 'react-native';
import { Text, Icon, Button, Body, Left, Card, CardItem, Thumbnail, Right } from 'native-base';
import PropTypes from 'prop-types';

const _Client = require('../Firebase/Firebase');

export default class GiftCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = { Favorito: false, Color: 'white' }
  }

  Favorito = async () => {
    if (this.state.Favorito) {
      await _Client.Database.ref(_Client.Auth.currentUser.uid + '/Favoritos').orderByValue().equalTo(this.props.Id).once("child_added", (data) => {
        data.ref.remove().then(() => {
          this.setState({ Favorito: false, Color: 'white' });
        })
      });
    } else {
      await _Client.Database.ref(_Client.Auth.currentUser.uid + '/Favoritos').push(this.props.Id).then(() => {
        this.setState({ Favorito: true, Color: 'red' });
      })
    }
  }

  async componentDidMount() {
    await _Client.Database.ref(_Client.Auth.currentUser.uid + '/Favoritos').orderByValue().equalTo(this.props.Id).once("child_added", (data) => {
      this.setState({ Favorito: true, Color: 'red' });
    });
  }

  render() {
    return (
      <Card style={{ borderWidth: 0, borderRadius: 10, borderColor: '#324054', backgroundColor: '#222b38' }}>
        <CardItem style={{ borderColor: '#324054', borderWidth: 0, backgroundColor: '#324054', flexDirection: 'row', justifyContent: 'space-around' }} bordered>
          <Left>
            <Thumbnail source={{ uri: this.props.UrlIcon }} small />
            <Text style={{ color: '#ffff' }}>GiftCard {this.props.Nombre}</Text>
          </Left>
        </CardItem>
        <CardItem cardBody style={{ borderColor: '#324054', borderWidth: 0, flex: 1, height: 200 }} bordered>
          <Image source={{ uri: this.props.Image }} resizeMode='stretch' style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }} />
        </CardItem>
        <CardItem style={{ borderColor: '#324054', borderWidth: 0 }} bordered>
          <Left style={{ borderColor: '#324054', borderWidth: 0 }}>
            <Button transparent onPress={this.Favorito.bind(this)}>
              <Icon active name="heart" type={'FontAwesome'} style={{ color: this.state.Color }} />
            </Button>
          </Left>
          <Body style={{ flexDirection: "row", justifyContent: "center" }}>
            <Button transparent>
              <Icon active name="shopping-bag" type={'FontAwesome'} style={{ color: '#ffff' }} />
            </Button>
          </Body>
          <Right style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
            <Icon active name="check-circle" type={'FontAwesome'} style={{ color: '#ffff' }} />
            <Text style={{ color: '#ffff', marginLeft: 5 }}>{this.props.Disponible}</Text>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

GiftCard.propTypes = {
  UrlIcon: PropTypes.string.isRequired,
  Nombre: PropTypes.string.isRequired,
  Image: PropTypes.string.isRequired,
  Disponible: PropTypes.number.isRequired,
  Id: PropTypes.string.isRequired
}