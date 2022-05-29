import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const Form = ({
  setRequestData,
  currency,
  setCurrency,
  cryptocurrency,
  setCryptocurrency,
}) => {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);

  const getData = async () => {
    const url =
      'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    const {data} = await axios.get(url);
    const response = data;
    setCryptocurrencies(response.Data);
  };

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  const getCurrency = coin => {
    setCurrency(coin);
  };

  const getCryptoCurrency = crypto => {
    setCryptocurrency(crypto);
  };

  const showAlert = () =>
    Alert.alert('¡Error!', 'Ambos campos son obligatorios', [{text: 'OK'}]);
  const quotingprice = () =>
    currency.trim() === '' || cryptocurrency.trim() === ''
      ? showAlert()
      : setRequestData(true);

  return (
    <View>
      <Text style={styles.label}>Currency</Text>
      <Picker
        onValueChange={coin => getCurrency(coin)}
        selectedValue={currency}>
        <Picker.Item label="- Seleccione -" value="" />
        <Picker.Item label="Dolar estadounidense" value="USD" />
        <Picker.Item label="Peso mexicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Yuan" value="CNH" />
      </Picker>
      <Text style={styles.label}>Cryptocurrency</Text>
      <Picker
        onValueChange={crypto => getCryptoCurrency(crypto)}
        selectedValue={cryptocurrency}>
        <Picker.Item label="- Seleccione -" value="" />
        {cryptocurrencies.map(crypto => (
          <Picker.Item
            key={crypto.CoinInfo.Id}
            label={crypto.CoinInfo.FullName}
            value={crypto.CoinInfo.Name}
          />
        ))}
      </Picker>
      <TouchableHighlight style={styles.priceBtn} onPress={quotingprice}>
        <Text style={styles.priceText}>quotation</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    fontSize: 20,
    marginVertical: 20,
    textTransform: 'uppercase',
  },
  priceBtn: {
    backgroundColor: '#ff006e',
    padding: 18,
    borderRadius: 15,
    marginTop: 20,
    width: '65%',
    alignSelf: 'center',
  },
  priceText: {
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Lato-Black',
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});
export default Form;
