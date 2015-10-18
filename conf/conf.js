module.exports = {
  development: {
    mongo: {
      uri: 'mongodb://localhost/mweb',
      opt: {
        server: {}
      }
    }
  },
  production: {
    mongo: {
      uri: 'mongodb://localhost/mweb',
      opt: {}
    }
  }
}
