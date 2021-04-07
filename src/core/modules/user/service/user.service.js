import { UserModel } from '../model/userModel';

class Service {
    findAll({ page = 1, size = 10 }) {
        return UserModel.find()
            .limit(size)
            .skip((page - 1) * size)
            .exec();
    }

    createOne({ email, password }) {
        const userModel = new UserModel();
        userModel.email = email;
        userModel.password = password;
        return userModel.save();
    }
}

export const UserService = new Service();
