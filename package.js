Package.describe({
  name: 'axon-patent'
})

Package.onUse(api => {
  api.use([
    'vulcan:core',
    'vulcan:forms',
    'vulcan:accounts'
  ])

  api.mainModule('lib/main.js', 'client')
  // api.mainModule('lib/main.js', 'server')

  api.addAssets(['lib/assets/user-image.png'], ['client'])
})
