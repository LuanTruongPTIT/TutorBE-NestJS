/* eslint-disable @typescript-eslint/no-explicit-any */
import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { RoutesUserModule } from './routes/routes.user.module';
import { RouterModule as NestJsRouterModule } from '@nestjs/core';
import { RoutesAuthModule } from './routes/routes.auth.module';
import { RoutesTutorModule } from './routes/router.tutor.module';
import { RoutesCourseModule } from './routes/router.course.module';
import { RoutesRoomModule } from './routes/router.room.module';
import { RoutesAdminModule } from './routes/router.admin.module';

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
      RoutesTutorModule,
      RoutesCourseModule,
      RoutesRoomModule,
      RoutesAdminModule,
      NestJsRouterModule.register([
        {
          path: '/user',
          module: RoutesUserModule,
        },
        {
          path: '/auth',
          module: RoutesAuthModule,
        },
        {
          path: '/tutor',
          module: RoutesTutorModule,
        },
        {
          path: '/course',
          module: RoutesCourseModule,
        },
        {
          path: '/room',
          module: RoutesRoomModule,
        },
        {
          path: '/admin',
          module: RoutesAdminModule,
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
