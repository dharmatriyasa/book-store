const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartIem = require('./models/cart-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// const { use } = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            // console.log('========================================');
            // console.log(req.user);
            // console.log('========================================');
            // console.log(req);
            next();
        })
        .catch(err => console.log(err));
})

app.use('/admin',adminRoutes.router);
app.use(shopRoutes);

app.use(errorController.getError404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartIem });
Product.belongsToMany(Cart, { through: CartIem });


sequelize
    .sync()
    // .sync({ force: true })
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if(!user) {
            return User.create({ name: 'Dinda', email: 'nadindaputri@fisioterapist.com'});
        }
        return user;
    })
    .then(user => {
        return user.createCart();
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err)
    });
