/**
 * @format
 * @flow strict-local
 */

//* Modules
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

//* imported components
import Header from './src/components/header';
import Form from './src/components/form';
import Quotation from './src/components/quotation';

//* Main component
const App = () => {
  const [currency, setCurrency] = useState('');
  const [cryptocurrency, setCryptocurrency] = useState('');
  const [requestData, setRequestData] = useState(false);
  const [quotation, setQuotation] = useState({});
  const [loading, setLoading] = useState(false);

  //* price data is requested every time the user interact with the quote button
  useEffect(() => {
    if (requestData) {
      const getPrice = async () => {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${currency}`;
        const {data} = await axios.get(url);

        //* While the data is obtained the system will deploy a loading spinner
        setLoading(true);

        //* when the data is obtained the info is displayed an the spinner remains hidden.
        setTimeout(() => {
          setQuotation(data.DISPLAY[cryptocurrency][currency]);
          setRequestData(false);
          setLoading(false);
        }, 3000);
      };
      getPrice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestData]);

  //* A ternary operator is used to set the behavior of the load spinner.
  const loadingComponent = loading ? (
    <ActivityIndicator size="large" color="#ff006e" style={styles.spinner} />
  ) : (
    <Quotation quotation={quotation} />
  );

  //* code to render
  return (
    <ScrollView>
      <Header />
      <View style={styles.imgContainer}>
        <Image
          style={styles.image}
          source={require('./src/assets/img/cryptomonedas.png')}
        />
      </View>
      <View style={styles.container}>
        <Form
          currency={currency}
          setCurrency={setCurrency}
          cryptocurrency={cryptocurrency}
          setCryptocurrency={setCryptocurrency}
          setRequestData={setRequestData}
        />
      </View>
      <View>{loadingComponent}</View>
    </ScrollView>
  );
};

//* style code
const styles = StyleSheet.create({
  imgContainer: {flexDirection: 'row'},
  image: {flex: 1, height: 150, marginHorizontal: '2.5%'},
  container: {marginHorizontal: '2.5%'},
  spinner: {marginTop: 20},
});

export default App;
