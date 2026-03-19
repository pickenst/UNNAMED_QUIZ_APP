import type { Request, Response } from "express";
import {UserServiceApiDict as ApiDict} from "@quizify/api-dictionary";
import UserModel from "../models/UserModel/UserModel";
import { UserServiceError } from "../lib/UserServiceErrors";

export class UserController {
  static registerUser = async (req: ApiDict.RegisterUserRequest, res: Response) => {
    try {
      const userId = await UserModel.createUser({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      })
      res.status(201).json(userId)
    }
    catch(err){
      if(err instanceof UserServiceError){
        res.send(err.message)
      }
    }
  }

  static loadUser = async (req: ApiDict.GetUserRequest, res: Response) => {
    try {
      const data = await UserModel.getUser(req.params.id)

      return data
    }
    catch(err){
      if(err instanceof UserServiceError){
        res.send(err.message)
      }
    }
  }
}