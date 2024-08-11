const publicVapidKey = 'BFHwv4bQUgF3hY1rCcaVmfUxWYjAGc3FT4YJQbvIl8fKft1abcbOyYffqiPt16O7-lu0W6c9m62IlmvwIgU_yFg';


function subscribe() {
  if ('serviceWorker' in navigator) {
    console.log('Registering service worker');
    run().catch(error => console.error(error));
  }
}
async function run() {
  console.log('Registering service worker');

  // const registration = await navigator.serviceWorker.register('/worker.js');


  navigator.serviceWorker.register('/worker.js', { scope: '/' })
  .then(async (registration) => {
    console.log('Service Worker 注册成功:', registration);
    // registration.pushManager.getSubscription().then((pushSubscription) => {
    //   console.log(pushSubscription)
    // })

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

    const p = document.getElementById("subscribe-content")
    p.textContent = JSON.stringify(subscription);
    // 将新元素添加到div中
    console.log('Sent push', JSON.stringify(subscription));

      console.log('Sending push');
  // await fetch('/subscribe', {
  //   method: 'POST',
  //   body: JSON.stringify(subscription),
  //   headers: {
  //     'content-type': 'application/json'
  //   }
  // });
  })
  .catch(function(error) {
    console.error('Service Worker 注册失败:', error);
  });


  console.log('Registered service worker');

  console.log('Registering push');

  // registration.pushManager.getSubscription().then((pushSubscription) => {
  //   console.log(pushSubscription)
  // })

  // const subscription = await registration.pushManager.subscribe({
  //     userVisibleOnly: true,
  //     applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  //   });
  console.log('Registered push');

  // console.log('Sending push');
  // await fetch('/subscribe', {
  //   method: 'POST',
  //   body: JSON.stringify(subscription),
  //   headers: {
  //     'content-type': 'application/json'
  //   }
  // });

  // const p = document.getElementById("subscribe-content")
  // p.textContent = JSON.stringify(subscription);
  // // 将新元素添加到div中
  // console.log('Sent push', JSON.stringify(subscription));
}

// Boilerplate borrowed from https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
