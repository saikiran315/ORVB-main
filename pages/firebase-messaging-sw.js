importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBAX2u96gpYSmM7CuECu6c5scZAB2zl5ks",
  authDomain: "osvb-1.firebaseapp.com",
  projectId: "osvb-1",
  storageBucket: "osvb-1.appspot.com",
  messagingSenderId: "115801201583",
  appId: "1:115801201583:web:87483ef97d8ade89676d5a",
  measurementId: "G-CJF52B9K88",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
