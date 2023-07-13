import bodyParser from "body-parser"
import { Router } from "express"
import cors from 'cors'

import {login, sigin, update} from "../controller/formControllers.js"
import {calculatePrice, createSession, addCar, cancelPurchaseList, cleanPurchaseList} from "../controller/controlCar";
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

// router.post('/purchase', checkInventory)
router.put('/update', update);

router.get('/administrator', administrator);

router.post('/checkout', createSession)

router.get('/success')

router.get('/cancel')

export default router