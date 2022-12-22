import {useEffect, useState} from 'react';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

const useAd = onLoad => {
  const [loaded, setLoaded] = useState(false);

  const handleLoadedAd = () => {
    // waiting for load
    interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });
  };

  const handleCloseAd = () => {
    // handling ad close event
    interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      // going to next screen
      onLoad(true);
    });
  };

  useEffect(() => {
    // slow internet ))
    setTimeout(() => {
      interstitial.load();
    }, 1000);

    handleLoadedAd();
    handleCloseAd();
  }, []);

  useEffect(() => {
    if (loaded) {
      // showing Ad
      interstitial.show();
    }
  }, [loaded]);

  return {
    isLoaded: loaded,
    ad: interstitial,
  };
};

export default useAd;
