if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/4.3.0/workbox-sw.js'
  )
  /* global workbox */
  if (workbox) {
    // console.log('Workbox is loaded')

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([], {
      cleanupOutdatedCaches: true
    })

    workbox.precaching.cleanupOutdatedCaches()

    /* custom cache rules*/
    // Comment below code to exclude index.html from service worker cache in create-react-app
    // workbox.routing.registerNavigationRoute('/index.html', {
    //   blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/]
    // })

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg|ico|webp|json|html|ttf|woff|)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 100,
            purgeOnQuotaError: true,
            maxAgeSeconds: 86400 * 60 // 60 Days
          })
        ]
      })
    )

    workbox.routing.registerRoute(
      /\.(?:css|js)$/,
      new workbox.strategies.StaleWhileRevalidate({
        "cacheName": "assets",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 1000,
            maxAgeSeconds: 86400 * 60 // 60 Days
          })
        ]
      })
    )
    workbox.routing.registerRoute(
      // new RegExp('(https:\/\/wp-rff-admin\.rewardtravel\.net\/index.php\/)((?:[a-z][a-z0-9_]*))'),
      new RegExp('(https:\/\/isq15nrg6g\.execute-api\.eu-west-2\.amazonaws\.com\/staging\/)((?:[a-z][a-z0-9_]*))'),
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'wp-cms-cache',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 30,
            purgeOnQuotaError: true,
            maxAgeSeconds: 3600 // 1 hour
          })
        ]
      })
    )
    workbox.routing.registerRoute(
      // new RegExp('(https:\/\/backend\.rewardflightfinder\.com\/airlines'),
      new RegExp('(https:\/\/yb8p7zro2h\.execute-api\.eu-west-2\.amazonaws\.com\/airlines)'),
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'available-airlines-api-cache',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 20,
            purgeOnQuotaError: true,
            maxAgeSeconds: 86400 * 30 // 30 Days
          })
        ]
      })
    )

    workbox.routing.registerRoute(
      // new RegExp('(https:\/\/backend\.rewardflightfinder\.com\/api\/v1\/airlines\/british-airways\/airports'),
      new RegExp('(https:\/\/yb8p7zro2h\.execute-api\.eu-west-2\.amazonaws\.com\/british-airways\/airports)'),
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'airports-api-cache',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 20,
            purgeOnQuotaError: true,
            maxAgeSeconds: 86400 * 1 // 1 Day
          })
        ]
      })
    )

    workbox.routing.registerRoute(
      // new RegExp('(https:\/\/backend\.rewardflightfinder\.com\/api\/v1\/airlines\/british-airways\/possible_routes'),
      new RegExp('(https:\/\/yb8p7zro2h\.execute-api\.eu-west-2\.amazonaws\.com\/british-airways\/possible_routes)'),
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'routes-api-cache',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 20,
            purgeOnQuotaError: true,
            maxAgeSeconds: 86400 * 1 // 1 Day
          })
        ]
      })
    )

    workbox.routing.registerRoute(
      // new RegExp('(https:\/\/backend\.rewardflightfinder\.com\/api\/v1\/airlines\/british-airways\/availability?)((?:[a-z][a-z0-9_]*))'),
      new RegExp('(https:\/\/yb8p7zro2h\.execute-api\.eu-west-2\.amazonaws\.com\/british-airways\/availability?)((?:[a-z][a-z0-9_]*))'),
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'flightsAvailability-api-cache',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 20,
            purgeOnQuotaError: true,
            maxAgeSeconds: 1800 // 30 minute
          })
        ]
      })
    )
  }
}
