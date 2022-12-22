import React, {useRef, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import useAd from '../shared/hooks/useAd';

const INTERVAL_MS = 1000;
const STEP_VALUE = 20;
const STEPS = 100;

export default function ({onLoad = () => {}}) {
  const countInterval = useRef(null);
  const [width, setWidth] = useState(0);
  const {isLoaded} = useAd(onLoad);
  const curref = useRef(null);
  const transformValue = useRef(new Animated.Value(-1000)).current;
  const [int, setInt] = useState(0); // kind a timer
  const reactive = useRef(new Animated.Value(-1000)).current; // additional value for updating animation's step

  useEffect(() => {
    countInterval.current = setInterval(
      () => setInt(old => old + STEP_VALUE),
      INTERVAL_MS,
    );

    Animated.timing(transformValue, {
      toValue: reactive,
      duration: 500,
      useNativeDriver: true,
    }).start();

    return () => {
      clearInterval(countInterval);
    };
  }, []);

  useEffect(() => {
    if (int <= STEPS && width > 0) {
      reactive.setValue(-width + width * (int / STEPS));
    }
    if (int > STEPS && !isLoaded) {
      onLoad(true);
    }
  }, [int, width]);

  useEffect(() => {
    if (isLoaded) setInt(STEPS);
  }, [isLoaded]);

  return (
    <View style={styles.wrapper}>
      <Text>Loading...</Text>
      <View
        style={styles.progressBarWrapper}
        ref={curref}
        onLayout={e => {
          const newWidth = e.nativeEvent.layout.width;

          setWidth(newWidth);
        }}>
        <Animated.View
          style={{
            width: '100%',
            height: 20,
            backgroundColor: 'lightblue',
            position: 'absolute',
            left: 0,
            top: 0,
            transform: [{translateX: transformValue}],
          }}></Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
  },
  progressBarWrapper: {
    height: 20,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    position: 'relative',
    overflow: 'hidden',
  },
});
