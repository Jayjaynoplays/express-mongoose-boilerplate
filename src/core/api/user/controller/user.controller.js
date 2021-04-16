import { UserService } from '../../../modules/user/service/user.service';
import { RequestFormation } from '../../../../packages/restBuilder/core/requestFormation';
import SearchUserSchema from '../query/searchUser.schema.json';

class Controller {
    constructor() {
        this.service = UserService;
    }

    findAll = req => {
        const reqFormation = new RequestFormation(req.query, SearchUserSchema);
        return this.service.findAll(reqFormation.translate());
    }

    createOne = req => this.service.createOne(req.body)

    findOne = req => this.service.findOne(req.params)

    patchOne = req => this.service.patchOne(req.params, req.body)

    deleteOne = req => this.service.deleteOne(req.params)
}

export const UserController = new Controller();
