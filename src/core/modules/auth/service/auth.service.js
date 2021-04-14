import { UserModel } from '../../user/model/userModel';
import { BcryptService } from '../bcrypt';
import { JwtSingleton } from '../jwt';
import { JwtPayload } from '../dto/index';
import { UnAuthorizedException } from '../../../common/exceptions/httpException';

class Service {
    constructor() {
        this.bcrypt = BcryptService;
        this.jwt = JwtSingleton;
    }

    async login(loginDto) {
        const userData = await UserModel.findOne({ email: loginDto.email });
        if (!userData) {
            throw new UnAuthorizedException('User not found');
        }
        const isAuthen = this.bcrypt.compare(loginDto.password, userData.password);
        if (!isAuthen) {
            throw new UnAuthorizedException('User name or password is incorrect');
        }
        const token = this.jwt.sign(JwtPayload(userData));
        return token;
        // validated
    }
}

export const LoginService = new Service();
