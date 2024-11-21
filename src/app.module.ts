import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module'; 
import { User } from './users/entities/user.entity';
import { LoginModule } from './login/login.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // Charger les variables d'environnement du fichier .env
    ConfigModule.forRoot({
      isGlobal: true, // Les variables seront accessibles globalement
    }),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),


    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST, // Utilisation de la variable d'environnement
      port: +process.env.DB_PORT, // Conversion en nombre
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User],
      synchronize: true,
    }),

    UsersModule,
    LoginModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
