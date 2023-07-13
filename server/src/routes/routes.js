import bodyParser from "body-parser"
import { Router } from "express"
import cors from 'cors'


import { calculatePrice, createSession, addCar } from "../controller/controlCar.js"
import {login, sigin} from "../controller/formControllers.js"
import {update} from "../controller/formControllers.js"
import {administrator} from "../controller/adminControl.js"

const router = Router()

router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())
router.use(cors())

router.get("/", (req, res) => {
    res.sendFile(path.resolve("../index.html"));
  });


router.post('/register',sigin)

router.post('/login', login);

router.post('/purchase', calculatePrice)

router.put('/update', update);

router.get('/administrator', administrator);

router.get('/create-checkout-session', createSession)

router.get('/success')

router.get('/cancel')

export default router