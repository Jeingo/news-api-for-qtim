import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { ConfigType } from './configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersRepository } from './users/user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtAdapter } from './adapters/jwt.service';
import { JwtService } from '@nestjs/jwt';
import { SessionService } from './sessions/session.service';
import { SessionRepository } from './sessions/session.repository';
import { Session } from './sessions/session.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<ConfigType>) => ({
        type: 'postgres',
        host: configService.get('pg_host'),
        port: configService.get('pg_port'),
        username: configService.get('pg_username'),
        password: configService.get('pg_password'),
        database: configService.get('pg_db_name'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Post, Session]),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersRepository,
    JwtAdapter,
    JwtService,
    SessionService,
    SessionRepository,
  ],
})
export class AppModule {}
