import React from 'react';
import { Dimensions, WebView } from 'react-native';
import { Header, Button, Item, Icon } from 'native-base'
import Modal from 'react-native-modalbox';
import PropTypes from 'prop-types';

export default class ModalPago extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.refs.Modal.open();
  }

  componentDidUpdate() {
    this.refs.Modal.open();
  }

  Mensajes = async (e) => {
    console.log(e);
  }
  
  render() {
    const jsCode = `    paypal.Button.render({
      env: 'production',
      client: {
        sandbox: 'AVQx_luQWduTNNaI4UqnGstxP_0SAZFSSl9qQabwT3FS2fCAOFV8PedBGeSlN3USHn6ruk4cjAnAY8nA',
        production: 'AXJGzpvw5v4maBSG9pHqoxyn0ffldJqAy_pRDgb5PA8h4F_F2WsYr4MN6mDj0WWPaCH_Zy6sCstLA2Tk'
      },
      commit: true,
      payment: function (data, actions) {
        return actions.payment.create({
          transactions: [{
            amount: {
              total: ${this.props.Precio} * (document.getElementById("Cantidad").value ? document.getElementById("Cantidad").value : 1),
              currency: 'USD',
            },
          }]
        });
      },
      onCancel: function (data) {
        setTimeout(() => {
          window.postMessage("FALSE");
          swal("Cancelado", "La compra ha sido cancelada", "error");
        }, 1000)
      },
      onAuthorize: function (data, actions) {
        return actions.payment.execute()
          .then(function () {
            setTimeout(() => {
              window.postMessage("TRUE");
              swal("Compra exitosa", "Espere la confirmación de la compra y se enviara al correo", "success");
            }, 1000);
          });
      }
    }, '#Boton');`;
    return (
      <Modal style={{ width: Dimensions.get('window').width - 40, height: Dimensions.get('window').height - 100 }} position={"center"} ref={"Modal"} isDisabled={false} backdropPressToClose={false} swipeToClose={false} onClosed={this.props.Close.bind(this)}>
        <Header style={{ backgroundColor: '#ffff', borderColor: '#ffff' }}>
          <Item style={{ justifyContent: 'flex-end', flex: 1, flexDirection: 'row', marginRight: 15, marginTop: 5 }}>
            <Button iconLeft transparent onPress={() => this.refs.Modal.close()}>
              <Icon active type='FontAwesome' name='close' style={{ color: 'red' }} />
            </Button>
          </Item>
        </Header>
        <WebView source={require('./View.html')} onMessage={this.Mensajes.bind(this)} injectedJavaScript={jsCode} />
      </Modal>
    );
  }
}

ModalPago.propTypes = {
  Close: PropTypes.func.isRequired,
  Precio: PropTypes.number.isRequired
}