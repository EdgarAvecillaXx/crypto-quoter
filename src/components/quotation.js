import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Quotation = ({quotation}) => {
  return (
    Object.keys(quotation).length !== 0 && (
      <View style={styles.quotation}>
        <Text style={styles.text}>
          <Text style={styles.price}>{quotation.PRICE}</Text>
        </Text>
        <Text style={styles.text}>
          Highest price of the day:{'  '}
          <Text style={styles.span}>{quotation.HIGHDAY}</Text>
        </Text>
        <Text style={styles.text}>
          Lowest price of the day:{'  '}
          <Text style={styles.span}>{quotation.LOWDAY}</Text>
        </Text>
        <Text style={styles.text}>
          variation of the last 24 hours :{'  '}
          <Text style={styles.span}>{quotation.CHANGEPCT24HOUR} %</Text>
        </Text>
        <Text style={styles.text}>
          Last update: <Text style={styles.span}>{quotation.LASTUPDATE}</Text>
        </Text>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  quotation: {
    backgroundColor: '#ff006e',
    marginTop: 20,
    padding: 20,
  },
  price: {fontSize: 26, fontFamily: 'Lato-Black'},
  text: {fontFamily: 'Lato-Regular', color: '#fff', fontSize: 15},
  span: {fontFamily: 'Lato-Black'},
});
export default Quotation;
