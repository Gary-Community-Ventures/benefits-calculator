export default function dataLayerPush<T>(obj: T) {
  if (window.dataLayer === undefined) {
    // eslint-disable-next-line
    console.error('Analytics are not working');
    return;
  }
  window.dataLayer.push(obj);
}
