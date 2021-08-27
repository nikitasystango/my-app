import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

const configuration = {
  onUpdate: (registration) => {
    console.log('inside onUpdate function', registration)
    if (registration && registration.waiting) {
      console.log('registration.waiting', registration)
      registration.waiting.postMessage('skipWaiting')
      navigator.serviceWorker.ready.then((registrationSW) => {
      console.log('registrationSW index file', registrationSW)

        registrationSW.unregister().then(() => {
          caches.keys().then(function (names) {
            // console.log(names, 'names of caches')
            // delete the available cache for
            caches.delete('workbox-precache')
            caches.delete('images')
            caches.delete('api-cache')
          })
          window.location.reload()
        })
      })
    }
  }
}


serviceWorker.register()
