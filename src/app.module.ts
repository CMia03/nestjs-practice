import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module'; 
import { User } from './users/entities/user.entity';
import { LoginModule } from './login/login.module';
import { JwtModule } from '@nestjs/jwt';
import { RevenuModule } from './revenu/revenu.module';
import { Revenu } from './revenu/entities/revenu.entity';
import { ExpenseModule } from './expense/expense.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),


    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST, 
      port: +process.env.DB_PORT, 
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Revenu],
      synchronize: true,
    }),

    UsersModule,
    LoginModule,
    RevenuModule,
    ExpenseModule,
    AccountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
