import { get } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";
import SessisonModel, { SessionDocument } from "../models/session.model";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { findUser } from "./user.service";
import config from 'config';

export async function createSession(userId: string, userAgent: string) {
    const session = await SessisonModel.create({ user: userId, userAgent });
    return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
    return SessisonModel.find(query).lean();
}

export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
    return SessisonModel.updateOne(query, update);
}

export async function reIssueAccessToken({ refreshToken } : { refreshToken : string}) {
    const { decoded } = verifyJwt(refreshToken);
    if(!decoded || !get(decoded, 'session')) return false;
    const session = await SessisonModel.findById(get(decoded, 'session'));
    if(!session || !session.valid) {
        return false;
    }
    const user = await findUser({_id: session.user });
    if(!user) return false;

    const accessToken = signJwt({ ...user, session: session._id } , { expiresIn: config.get('accessTokenTtl') });
    return accessToken;
}