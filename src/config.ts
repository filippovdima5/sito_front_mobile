const SERVER = typeof window === 'undefined'
const LOCAL = !SERVER && window.location.hostname.includes('localhost') && process.env.NODE_ENV === 'development'

function getApiEndpoint() {
  //if (LOCAL) return '/api'
  console.log('config - SERVER', SERVER)
  
  if (SERVER) return 'http://localhost:8080/api/'
  
  return '/api/'
}


export default {
  ssr: SERVER,
  local: LOCAL,
  api: {
    main: {
      endpoint: getApiEndpoint()
    }
  }
}

