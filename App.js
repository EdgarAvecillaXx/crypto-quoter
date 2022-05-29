/**
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Header from './src/components/header';
import Form from './src/components/form';
import Quotation from './src/components/quotation';
import axios from 'axios';

const App = () => {
  const [currency, setCurrency] = useState('');
  const [cryptocurrency, setCryptocurrency] = useState('');
  const [requestData, setRequestData] = useState(false);
  const [quotation, setQuotation] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (requestData) {
      const getPrice = async () => {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${currency}`;
        const {data} = await axios.get(url);

        setLoading(true);

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

  const loadingComponent = loading ? (
    <ActivityIndicator size="large" color="#ff006e" style={styles.spinner} />
  ) : (
    <Quotation quotation={quotation} />
  );

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

const styles = StyleSheet.create({
  imgContainer: {flexDirection: 'row'},
  image: {flex: 1, height: 150, marginHorizontal: '2.5%'},
  container: {marginHorizontal: '2.5%'},
  spinner: {marginTop: 20},
});

export default App;
