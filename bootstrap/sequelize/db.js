require('dotenv').config();
module.exports = () => ({
  "development": {
    "username": process.env.PG_USER || "avd",
    "password": process.env.PG_PASS || "avd",
    "database": process.env.PG_NAME || "tada_auth",
    "host": process.env.PG_HOST || "127.0.0.1",
    "dialect": "postgres",
    "timezone": "+07:00"
  },
  "test": {
    "username": process.env.PG_USER || "avd",
    "password": process.env.PG_PASS || "avd",
    "database": process.env.PG_NAME || "tada_auth_test",
    "host": process.env.PG_HOST || "127.0.0.1",
    "dialect": "postgres",
    "timezone": "+07:00"
  },
  "production": {
    "use_env_variable": "PG_URL",
    "dialect": "postgres",
    "timezone": "+07:00",
    "pool": {
			"maxConnections": 5,
			"maxIdleTime": 3000
		}
  }
})