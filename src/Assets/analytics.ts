export default function dataLayerPush(obj: any) {
  if (window.dataLayer === undefined) {
    console.error('Analytics are not working');
    return;
  }
  window.dataLayer.push(obj);
}
