import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserModelType } from './features/users/domain/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private userModel: UserModelType,
  ) {}
  
  getHello(): string {
    return 'Hi World!';
  }

  async deleteAllData(): Promise<void> {
    await this.userModel.deleteMany({});
    // await this.blogModel.deleteMany({});
    // await this.postModel.deleteMany({});
    // await this.commentModel.deleteMany({});
    // await this.apiModel.deleteMany({});
    // await this.sessionModel.deleteMany({});
    // await this.likesModel.deleteMany({});
    console.log('All data is deleted');
  }
}
