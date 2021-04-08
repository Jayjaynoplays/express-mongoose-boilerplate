import { NotFoundException } from '../../../common/exceptions/NotFoundException';
import { UserModel } from '../model/userModel';

class Service {
    findAll({ page = 1, size = 10 }) {
      return UserModel.find()
        .limit(size)
        .skip((page - 1) * size)
        .exec();
    }

    createOne({ email, password, roles }) {
      const userModel = new UserModel();
      userModel.email = email;
      userModel.password = password;
      userModel.roles = roles;
      return userModel.save();
    }

    findOne({ id }) {
      return UserModel.findById(id).exec();
    }

    async patchOne({ id }, { email, password, roles }) {
      const user = await UserModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      user.email = email;
      user.password = password;
      user.roles = roles;
      return user.save();
    }

    deleteOne({ id }) {
      return UserModel.findByIdAndDelete(id).exec();
    }
}

export const UserService = new Service();
