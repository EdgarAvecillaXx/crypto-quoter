//* modules
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

//* Component
const Form = ({
  setRequestData,
  currency,
  setCurrency,
  cryptocurrency,
  setCryptocurrency,
}) => {
  //* Here is saved the request info of the cryptocurrencies needed
  const [cryptocurrencies, setCryptocurrencies] = useState([]);

  //* API request using Axios
  const getData = async () => {
    //* Here is svaed the endpoint URL
    const url =
      'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    //* Here is requested the info with axios
    const {data} = await axios.get(url);
    const response = data;
    //* save the info in the state
    setCryptocurrencies(response.Data);
  };

  //* API request is call before the component is mounted
  useEffect(() => {
    getData();
  }, []);

  //* Here we set the value obtained in the form for the currency prop
  const getCurrency = coin => {
    setCurrency(coin);
  };

  //* Here we set the value obtained in the form for the cryptocurrency prop
  const getCryptoCurrency = crypto => {
    setCryptocurrency(crypto);
  };
  //*non-selected values Alert
  const showAlert = () =>
    Alert.alert('Error!', 'Both fields are required', [{text: 'OK'}]);
  //* validates the form to avoid unselected values
  const quotingprice = () =>
    currency.trim() === '' || cryptocurrency.trim() === ''
      ? showAlert()
      : setRequestData(true);

  //* block to render
  return (
    <View>
      <Text style={styles.label}>Currency</Text>
      {/*currency values with hard code */}
      <Picker
        onValueChange={coin => getCurrency(coin)}
        selectedValue={currency}>
        <Picker.Item label="- Please Select -" value="" />
        <Picker.Item label="U.S Dollar" value="USD" />
        <Picker.Item label="Mexican peso" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Yuan" value="CNH" />
      </Picker>
      <Text style={styles.label}>Cryptocurrency</Text>
      {/*criptocurrencies values mapping the state that contains the requested data */}
      <Picker
        onValueChange={crypto => getCryptoCurrency(crypto)}
        selectedValue={cryptocurrency}>
        <Picker.Item label="- Please select -" value="" />
        {cryptocurrencies.map(crypto => (
          <Picker.Item
            key={crypto.CoinInfo.Id}
            label={crypto.CoinInfo.FullName}
            value={crypto.CoinInfo.Name}
          />
        ))}
      </Picker>
      {/*Quoter button*/}
      <TouchableHighlight style={styles.priceBtn} onPress={quotingprice}>
        <Text style={styles.priceText}>quotation</Text>
      </TouchableHighlight>
    </View>
  );
};

//* style code
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
