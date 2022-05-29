import React from 'react';
import {Text, StyleSheet, Platform} from 'react-native';

const Header = () => {
  return <Text style={styles.header}>crypto quoter</Text>;
};

const styles = StyleSheet.create({
  //* condicionamos estilos dependiendo de el OS del dispositivo
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
    paddingBottom: 10,
    fontFamily: 'Lato-Black',
    fontSize: 18,
    backgroundColor: '#ff006e',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 1,
    color: '#FFF',
  },
});

export default Header;
