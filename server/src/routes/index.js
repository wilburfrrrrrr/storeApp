import bodyParser from "body-parser"
import { Router } from "express"
import cors from 'cors'

import {checkInventory, login, sigin} from "../controller/formControllers.js"

const router = Router()

router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())
router.use(cors())

router.get("/", (req, res) => {
    res.sendFile(path.resolve("../index.html"));
  });


router.post('/register',sigin)

router.post('/login', login);

router.post('/purchase', checkInventory)

export default router