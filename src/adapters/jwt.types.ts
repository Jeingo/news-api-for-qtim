export type Token = string;

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type RefreshTokenPayloadType = {
  userId: string;
  exp: number;
  iat: number;
};

export type AccessTokenPayloadType = {
  userId: string;
  exp: number;
  iat: number;
};
