import type { Plan } from "../../../generated/client"
import type { User } from "../../../generated/client"
import { Nullable, DeNullified } from "../../lib/types"
import config from "./UserModel.config"

export interface CreateUserParams {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

export interface UpdateUserParams {
  id: string,
  data: {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    plan?: Plan
  }
}

export type UserSortableParam = { 
  [K in keyof Omit<User, "id" | "passwordHash">]?: "asc" | "desc" 
}

export interface GetMultiUserParams {
  limit?: number,
  page?: number,
  sort?: UserSortableParam
}

export interface getUserParams {
  id: string,
  password?: string,
  restrictedReturn?: boolean,
  protectedAccess?: boolean
}

export const defaultMultiUserParams: DeNullified<GetMultiUserParams> = {
  limit: config.query.user_query_default_limit!,
  page: 0!,
  sort: {
    lastName: "desc"!
  }!
}