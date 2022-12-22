import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import MainScreen from './src/screens/Main';
import LoadingScreen from './src/screens/Loading';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoaded, setIsLoaded] = useState(false);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        {isLoaded ? <MainScreen /> : <LoadingScreen onLoad={setIsLoaded} />}
      </SafeAreaView>
    </>
  );
};

export default App;
