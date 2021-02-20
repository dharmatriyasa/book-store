const fs = require('fs');
const path = require('path');

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
    constructor(title, imageUrl, description, price){
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    // method to save to JSON
    save(){
        this.id = Math.random().toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(pathFile, JSON.stringify(products) , err => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb){
        getProductsFromFile(cb);
    }
}