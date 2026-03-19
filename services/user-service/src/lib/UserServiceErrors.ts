export interface UserServiceErrorParams {
  message: string,
  source?: string
}


export class UserServiceError extends Error{
  static message: string;
  static source?: string;
  constructor(params: UserServiceErrorParams){
    UserServiceError.message = params.message;
    UserServiceError.source = params.source
    super();
  }
}