/** @type { import("drizzle-kit").Config } */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    schema: "./utils/schema.ts",
    dialect: 'postgresql',
    dbCredentials: {
      url:"postgresql://corina-ai_owner:gy6jieUZQSz1@ep-long-frog-a5ylu1cp.us-east-2.aws.neon.tech/developer_porfolio?sslmode=require",
    }
  };