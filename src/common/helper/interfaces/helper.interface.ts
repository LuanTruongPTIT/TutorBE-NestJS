// Helper Encryption
export interface IHelperJwtVerifyOptions {
  secretKey: string;
}

export interface IHelperJwtOptions
  extends Omit<IHelperJwtVerifyOptions, 'ignoreExpiration'> {
  expiredIn: number | string;
  notBefore?: number | string;
}

// Helper String
export interface IHelperStringRandomOptions {
  upperCase?: boolean;
  safe?: boolean;
}

export interface IHelperStringCurrencyOptions {
  locale?: string;
}

export interface IHelperStringPasswordOptions {
  length: number;
}

// Helper Date
export interface IHelperDateSetTimeOptions {
  hour?: number;
  minute?: number;
  second?: number;
  millisecond?: number;
}

export interface IHelperDateCreateOptions {
  startOfDay?: boolean;
}

export interface IHelperDateForwardOptions {
  fromDate?: Date;
}

export type IHelperDateBackwardOptions = IHelperDateForwardOptions;

export interface IHelperDateRoundDownOptions {
  hour: boolean;
  minute: boolean;
  second: boolean;
  millisecond: boolean;
}

// Helper File

export interface IHelperFileRows<T = any> {
  data: T[];
  sheetName?: string;
}

export interface IHelperFileReadOptions {
  password?: string;
}

// Helper google

export interface IHelperGooglePayload {
  email: string;
}

export interface IHelperGoogleRefresh {
  accessToken: string;
}
