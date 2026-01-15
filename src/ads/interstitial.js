import {
  AdMob,
  AdOptions,
  AdLoadInfo,
  InterstitialAdPluginEvents,
} from '@capacitor-community/admob';

const INTERSTITIAL_ID = 'ca-app-pub-2077187211919243/5800911927'
const INTERSTITIAL_ID_TEST = 'ca-app-pub-3940256099942544/1033173712'

export async function interstitial() {
  AdMob.addListener(InterstitialAdPluginEvents.Loaded, (info) => {
    // Subscribe prepared interstitial
  });

  const options = {
    adId: INTERSTITIAL_ID,
    // isTesting: true
    // npa: true
    // immersiveMode: true
  };
  await AdMob.prepareInterstitial(options);
  await AdMob.showInterstitial();
}