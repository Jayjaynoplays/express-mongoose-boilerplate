import { UserService } from '../../../modules/user/service/user.service';

class Controller {
    constructor() {
        this.service = UserService;
    }

    findAll = req => this.service.findAll(req.query)

    createOne = req => this.service.createOne(req.body)
}

export const UserController = new Controller();
