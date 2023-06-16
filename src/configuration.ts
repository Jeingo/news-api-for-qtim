export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt: {
    access_secret: process.env.JWT_ACCESS_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    access_expire: process.env.JWT_ACCESS_EXPIRE,
    refresh_expire: process.env.JWT_REFRESH_EXPIRE,
  },
  database: {
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT, 10) || 5432,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    db_name: process.env.PG_DB_NAME,
    ssl: process.env.PG_SSL,
  },
});

export type ConfigType = {
  port: number;
  jwt: {
    access_secret: string;
    refresh_secret: string;
    access_expire: string;
    refresh_expire: string;
  };
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    db_name: string;
    ssl: string;
  };
};
