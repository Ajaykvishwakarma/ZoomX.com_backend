const express = require("express");
const cors = require("cors");

const mongoConnector = require('./configs/db');


const { register, login } = require('./controllers/user.controller');
const photobookController = require('./controllers/photobook.controller')
const cartController = require('./controllers/cart.controller');
const calenderController = require('./controllers/calenders.contoller')
const cardstockController = require('./controllers/cardstock.controller');
const displayController = require('./controllers/display.controller');
const stationaryController = require('./controllers/stationary.controller');


const app = express();
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 5000;

app.use('/signup', register);
app.use('/signin', login);
app.use('/', photobookController)
app.use('/', cartController)
app.use('/', calenderController)
app.use('/', cardstockController)
app.use('/', displayController)
app.use('/', stationaryController)

module.exports = () => {

    app.listen(port, async () => {
        try{
            await mongoConnector()
            console.log(`Listening on port ${port}...`)
        } catch (error) {
            console.log({
                message : error.message,
                status : "something goes wrong"
            })
        }
    })
}