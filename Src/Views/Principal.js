import React from 'react';
import { Container, Content, Icon, Footer, Button, Text, Spinner, FooterTab, StyleProvider } from 'native-base';
import Theme from '../Themes/Tab'
import getTheme from '../Themes/components';
import Cards from '../Views/Cards';
import Categorias from '../Views/Categorias';
import Cuenta from '../Views/Cuenta';
import { createBottomTabNavigator } from 'react-navigation';


export default Tabs = createBottomTabNavigator({
  Cards: { screen: Cards },
  Categorias: { screen: Categorias },
  Cuenta: { screen: Cuenta }
}, {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    navigationOptions: ({ navigation }) => ({
      tabBarComponent: (props) => {
        const { routeName } = navigation.state;
        return (
          <Footer>
            <StyleProvider style={getTheme(Theme)}>
              <FooterTab>
                <Button vertical active={routeName === 'Cards'} onPress={() => props.navigation.navigate('Cards')}>
                  <Icon type='MaterialCommunityIcons' name="wallet-giftcard" color='#d93e3f' />
                  <Text active={routeName === 'Cards'}>Cards</Text>
                </Button>
                <Button vertical active={routeName === 'Categorias'} onPress={() => props.navigation.navigate('Categorias')}>
                  <Icon type='FontAwesome' name="list-ul" color='#d93e3f' />
                  <Text active={routeName === 'Categorias'}>categorías</Text>
                </Button>
                <Button vertical active={routeName === 'Cuenta'} onPress={() => props.navigation.navigate('Cuenta')}>
                  <Icon type='MaterialCommunityIcons' name="account" color='#d93e3f' />
                  <Text active={routeName === 'Cuenta'}>Cuenta</Text>
                </Button>
              </FooterTab>
            </StyleProvider>
          </Footer>
        );
      }
    })
  }
);