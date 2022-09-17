import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useScan} from '../../hooks/HotKeys';

const HomeScreen = () => {
  // useScan(() => console.log('sss'));
  return (
    <View style={styles.contaioner}>
      <Text>Home</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
});
