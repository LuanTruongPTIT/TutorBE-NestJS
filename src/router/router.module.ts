/* eslint-disable @typescript-eslint/no-explicit-any */
import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { RoutesUserModule } from './routes/routes.user.module';
import { RouterModule as NestJsRouterModule } from '@nestjs/core';
import { RoutesAuthModule } from './routes/routes.auth.module';

@Module({})
export class RouterModule {
  static forRoot(): DynamicModule {
    const imports: (
      | DynamicModule
      | Type<any>
      | Promise<DynamicModule>
      | ForwardReference<any>
    )[] = [];

    imports.push(
      RoutesUserModule,
      RoutesAuthModule,
      NestJsRouterModule.register([
        {
          path: '/user',
          module: RoutesUserModule,
        },
        {
          path: '/auth',
          module: RoutesAuthModule,
        },
      ]),
    );
    return {
      module: RouterModule,
      providers: [],
      exports: [],
      controllers: [],
      imports,
    };
  }
}
