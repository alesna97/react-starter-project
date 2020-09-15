const env = {};

env.authApi = process.env.REACT_APP_URL_AUTH;
env.masterApi = process.env.REACT_APP_URL_MASTER;
env.managementApi = process.env.REACT_APP_URL_MANAGEMENT
env.financialApi = process.env.REACT_APP_URL_FINANCIAL;
env.apiPrefixV1 = process.env.REACT_APP_API_PREFIX_V1;
env.googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default env;