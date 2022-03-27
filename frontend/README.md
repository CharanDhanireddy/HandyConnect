# Setup guide

## Dev environment setup for local frontend development
- Open `index.js` file, ensure that the line `makeserver()` that runs the cypress mock server is **uncommented**.
- Open `env_setup.js` file, ensure that the `BASE_URL = DEV_MOCK_SERVER_BASE_URL`.

## Prod environment setup for running 
- Open `index.js` file, ensure that the line `makeserver()` that runs the cypress mock server is **commented**.
- Open `env_setup.js` file, ensure that the `BASE_URL = PRODUCTION_BASE_URL`.