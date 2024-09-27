import TagManager from 'react-gtm-module';

export default function dataLayerPush<T>(obj: T) {
  if (window.dataLayer === undefined) {
    console.error('Analytics are not working');
    return;
  }
  window.dataLayer.push(obj);
}

export function initializeGTM() {
  const gtmId = process.env.REACT_APP_GOOGLE_ANALYTICS_ID
  if (gtmId) {
    TagManager.initialize({ gtmId });
  } else {
    console.error('REACT_APP_GOOGLE_ANALYTICS_ID is not defined. Google Tag Manager will not be initialized.');
  }
}