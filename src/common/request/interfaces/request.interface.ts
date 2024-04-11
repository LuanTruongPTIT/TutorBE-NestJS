import { Request } from 'express';
import { AuthAccessPayloadSerialization } from 'src/modules/auth/serializations/auth.acess-payload.serialization';

import { IResult } from 'ua-parser-js';

export interface IRequestApp<T = AuthAccessPayloadSerialization>
  extends Request {
  // apiKey?: IApiKeyPayload;
  user?: T;

  __id: string;
  __xTimestamp?: number;
  __timestamp: number;
  __timezone: string;
  __customLang: string[];
  __xCustomLang: string;
  __version: string;
  __repoVersion: string;
  __userAgent: IResult;

  __class?: string;
  __function?: string;

  // __pagination?: RequestPaginationSerialization;
}
