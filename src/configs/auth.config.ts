/* eslint-disable @typescript-eslint/no-explicit-any */
import { registerAs } from '@nestjs/config';

export default registerAs(
  'auth',
  (): Record<string, any> => ({
    password: {
      saltLength: 8,
    },
    prefixAuthorization: 'Bearer',
    accesstoken: {
      accesstokensecretKey: process.env.accesstokensecretKey,
      accesstokenexpirationtime: process.env.accesstokenexpirationtime ?? '1h',
    },
    refreshtoken: {
      refreshtokensecretKey: process.env.refreshtokensecretkey,
      refreshtokenexpirationtime:
        process.env.refreshtokenexpirationtime ?? '30d',
    },
  }),
);
