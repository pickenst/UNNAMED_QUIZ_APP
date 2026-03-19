import type { Request } from "express";
export interface RegisterUserRequestBody {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}
export type RegisterUserRequest = Request<{}, {}, RegisterUserRequestBody>;
export interface GetUserRequestParams {
    id: string;
}
export type GetUserRequest = Request<GetUserRequestParams>;
export interface GetMultiUserRequestQuery {
    page?: string;
    limit?: string;
    orderBy?: string;
    desc?: string;
}
export type GetMultiUserRequest = Request<{}, {}, {}, GetMultiUserRequestQuery>;
//# sourceMappingURL=UserService.api-dict.d.ts.map