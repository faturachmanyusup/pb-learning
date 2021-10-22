const config = {
  development: {
    url: {
      base: "http://localhost:3000"
    },
    db: {

    },
    JWT_KEY: process.env.JWT_KEY,
    DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
  production: {
    url: {
      base: "https://pb-learning.vercel.app/"
    },
    db: {
      
    },
    JWT_KEY: process.env.JWT_KEY,
    DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  }
}

export default config[process.env.NODE_ENV]