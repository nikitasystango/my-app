import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import browserHistory from './utils/history'
import { toast } from 'react-toastify'
import * as serviceWorker from './serviceWorker'
import App from './containers/App'
import 'rc-tree-select/assets/index.css'
import 'semantic-ui-css/semantic.min.css'
import 'semantic-ui-css/components/reset.min.css'
import 'semantic-ui-css/components/site.min.css'
import 'semantic-ui-css/components/button.min.css'
import 'semantic-ui-css/components/container.min.css'
import 'semantic-ui-css/components/dimmer.min.css'
import 'semantic-ui-css/components/dropdown.min.css'
import 'semantic-ui-css/components/grid.min.css'
import 'semantic-ui-css/components/modal.min.css'
import 'semantic-ui-css/components/transition.min.css'
import 'semantic-ui-css/components/icon.min.css'

import 'react-toastify/dist/ReactToastify.css'
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


toast.configure()

ReactDOM.render((
    <Suspense fallback={'...Loading'}>
      <Router history={browserHistory} >
        <App />
      </Router>
    </Suspense>
), document.getElementById('root'))

const configuration = {
  onUpdate: (registration) => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage('skipWaiting')
      navigator.serviceWorker.ready.then((registrationSW) => {

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


serviceWorker.register(configuration)
