export default () => ({
    JWT_KEY: process.env.JWT_KEY,
    JWT_DURATION: "600s",
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    AWS_REGION: process.env.AWS_REGION,
    AWS_KEY_ID: process.env.AWS_KEY_ID,
    AWS_SECRET: process.env.AWS_SECRET,
    AWS_ACCOUNT_ID: process.env.AWS_ACCOUNT_ID,
    AWS_REVIEWS_TOPIC_NAME: "reviews"
  });