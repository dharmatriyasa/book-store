const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const pathFile = path.join(
    path.dirname(require.main.filename),
    'data',
    'product.json'            
);

const getProductsFromFile = (cb) => {
    fs.readFile(pathFile, (err, fileContent) =>{
        if(err){
            cb([]);
        }
        cb(JSON.parse(fileContent));
    });
}


module.exports = class Product {
    constructor(id, title, imageUrl, description, price){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    // method to save to JSON
    save(){
        getProductsFromFile(products => {
            if(this.id){
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProduct = [...products];
                updatedProduct[existingProductIndex] = this;
                fs.writeFile(pathFile, JSON.stringify(updatedProduct) , err => {
                    console.log(err);
                });
            }else{
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(pathFile, JSON.stringify(products) , err => {
                    console.log(err);
                });
            }
        });
    }

    static deleteById(id){
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter( prod => prod.id !== id);
            fs.writeFile(pathFile, JSON.stringify(updatedProducts), err => {
                if(!err){
                    console.log(product);
                    Cart.deleteProduct(id, product.price);
                }
            });
        });
    }

    static fetchAll(cb){
        getProductsFromFile(cb);
    }

    static findById(id, cb){
        getProductsFromFile(products => {
            const product = products.find( p => p.id === id);
            cb(product);
        });
    }
}