import express from "express"
import {test} from "../controllers/query.controller.ts"

const router = express.Router()

router.post("/", test);

export default router