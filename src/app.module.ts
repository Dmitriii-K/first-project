import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './features/users/domain/user.entity';
import { UserQueryRepository } from './features/users/repository/user.query-repository';
import { UserController } from './features/users/api/users.controller';
import { UserService } from './features/users/application/user.service';
import { BcryptService } from './infrastructure/utils/bcrypt';
import { UserRepository } from './features/users/repository/user.repository';
import { SETTINGS } from './settings/app-settings';

@Module({
  imports: [
    MongooseModule.forRoot(SETTINGS.MONGO_URL),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, UserQueryRepository, UserRepository, BcryptService],
})
export class AppModule {}
