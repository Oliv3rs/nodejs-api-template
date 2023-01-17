var express = require('express');
const cors = require("cors");
const preciosVTEX = require("../functions/getPreciosVTEX");
const axios = require('axios');
const {
    json
} = require("body-parser");
const app = express();

const https = require('https');
const xml2js = require('xml2js');
const { count } = require('console');
const parser = new xml2js.Parser({ attrkey: "ATTR" });

app.use(cors());

app.get('/', (request, response) => {
    let req = https.get("https://www.mobo.com.mx/XMLData/doofinder.xml", function(res) {
    let data = '';
    res.on('data', function(stream) {
        data += stream;
    });
    res.on('end', function(){
        parser.parseString(data, function(error, result) {
            if(error === null) {
                var array = [];
                const total = Object.keys(data).length;
                result.products.product.forEach(function(item) {
                    array.push(
                        {
                            "SKU":item.reference_code[0],
                            "price-vtex": item.sale_price[0].slice(4)                      
                        }
                        );
                });
                console.log(array)
                response.json(array);
            }
            else {
                response.json(error);
            }
        });
    });
});

});

app.get('/getPreciosHANA', (req,res) => {

    let url= 'https://mobo360.mobo.com.mx/Api/CatalogoExtendido/Precios';
    
    axios.get(url ,
    {
    headers:{
        'Accept': 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8',
        'User': process.env["USER_HANA"],
        'X-Api-Key': process.env["API_KEY_HANA"]
    },
    params:{
        'Petition':'{"FilterEq":{"Codigo":"319"}}'
    }
    })
        .then(response => {
            let datos = response.data;
            let resp = datos.Data;
                    var array = [];
                    const total = Object.keys(resp).length;
                    console.log(`Se encontraron: ${total} de SKUs`);
                    resp.forEach(function(item) {
                                    array.push({
                                            "SKU": item['SKU'],
                                            "price-hana": item['Importe/Descuento']
                                        });
                                });
                    
            res.json(array)
        })
        .catch(error => {
            console.log(error);
        });
});


module.exports = app;