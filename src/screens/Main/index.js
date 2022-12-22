import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function () {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>I believe i can flyyyyy</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    color: 'red',
  },
});
