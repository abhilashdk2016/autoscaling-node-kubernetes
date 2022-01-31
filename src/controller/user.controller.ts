import { Request, Response } from "express";
import { omit } from 'lodash';
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../services/user.service";
import logger from '../utils/logger';

export async function createUserhandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response) {
    try {
        const user = await createUser(req.body);
        return res.send(user);
    } catch (e: any) {
        logger.error(e.error);
        return res.status(409).send(e.message);
    }
}