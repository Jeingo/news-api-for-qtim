export default (): ConfigType => ({
  port: parseInt(process.env.PORT, 10) || 3000,

  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expire: process.env.JWT_ACCESS_EXPIRE,
  jwt_refresh_expire: process.env.JWT_REFRESH_EXPIRE,

  pg_host: process.env.PG_HOST,
  pg_port: parseInt(process.env.PG_PORT, 10) || 5432,
  pg_username: process.env.PG_USERNAME,
  pg_password: process.env.PG_PASSWORD,
  pg_db_name: process.env.PG_DB_NAME,
});

export type ConfigType = {
  port: number;
  jwt_access_secret: string;
  jwt_refresh_secret: string;
  jwt_access_expire: string;
  jwt_refresh_expire: string;
  pg_host: string;
  pg_port: number;
  pg_username: string;
  pg_password: string;
  pg_db_name: string;
};
