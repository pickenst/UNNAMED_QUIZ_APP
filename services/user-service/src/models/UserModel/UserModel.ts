import { hash, randomUUID } from "crypto";
import prisma from "../prisma.js";
import * as types from "./UserModel.types.js";
import bcrypt from "bcrypt"
import config from "./UserModel.config.js";
import { Plan } from "../../../generated/client/index.js";
import { PrismaClientKnownRequestError } from "../../../generated/client/runtime/client.js";
import { DeNullified } from "../../lib/types.js";
import { UserServiceError } from "../../lib/UserServiceErrors.js";

/**
 * Create user -> return user id
 */
class UserModel {

  static createUser = async (params: types.CreateUserParams) => {
    const id = randomUUID();
    const hashedPw = await bcrypt.hash(params.password, config.security.bcrypt_salt_rounds)
    return await prisma.user.create({ 
      data: {
        id: id,
        email: params.email,
        firstName: params.firstName,
        lastName: params.lastName,
        passwordHash: hashedPw,
        plan: Plan.FREE
      },
      select: {
        id: true
      }
    })
  }

  static getUser = async (id: string, restricted: boolean=true) => {
    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id: id
        },
        omit: {
          passwordHash: restricted
        }
      })
      return user
    }
    catch(err){
      if(err instanceof PrismaClientKnownRequestError && err.code == 'P2025'){
        return new UserServiceError({message: "USER_DNE", source: "PRISMA"})
      }
    }
  }

  static getUsers = async (params: types.GetMultiUserParams) => {
    const fullParams = {...types.defaultMultiUserParams, ...params} as DeNullified<types.GetMultiUserParams>
    const users = await prisma.user.findMany({
      take: fullParams.limit,
      skip: fullParams.limit! * (fullParams.page! - 1),
      orderBy: fullParams.sort!,
      omit: {
        passwordHash: true
      }
    })
    return users;
  }

  static updateUser = async (params: types.UpdateUserParams) => {    
    return prisma.user.update({
      data: params.data,
      where: {
        id: params.id
      }
    })
  }

}

export default UserModel