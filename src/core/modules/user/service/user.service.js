import { NotFoundException } from '../../../../packages/httpException';
import { UserModel } from '../model/userModel';
import { BcryptService } from '../../auth/bcrypt';

class Service {
    constructor() {
        this.bcrypt = BcryptService;
    }

    findAll({ page = 1, size = 10 }) {
      return UserModel.find()
        .limit(size)
        .skip((page - 1) * size)
        .exec();
    }

    createOne({ email, password, roles }) {
        const userModel = new UserModel();
        userModel.email = email;
        userModel.password = this.bcrypt.hash(password);
        userModel.roles = roles;
      return userModel.save();
    }

    async findOne({ id }) {
      const user = await UserModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    }

    async patchOne({ id }, { email, password, roles }) {
      const user = await UserModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      user.email = email || user.email;
      user.password = password || user.password;
      user.roles = roles || user.roles;
      return user.save();
    }

    async deleteOne({ id }) {
      const user = await UserModel.findByIdAndDelete(id).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    }
}

export const UserService = new Service();
