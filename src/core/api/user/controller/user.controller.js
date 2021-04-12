import { UserService } from '../../../modules/user/service/user.service';

class Controller {
    constructor() {
        this.service = UserService;
    }

    findAll = req => this.service.findAll(req.query)

    createOne = req => this.service.createOne(req.body)

    findOne = req => this.service.findOne(req.params)

    patchOne = req => this.service.patchOne(req.params, req.body)

    deleteOne = req => this.service.deleteOne(req.params)
}

export const UserController = new Controller();