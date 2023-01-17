const https = require('https');
const xml2js = require('xml2js');
const { count } = require('console');
const parser = new xml2js.Parser({ attrkey: "ATTR" });

function getPreciosVTEX(){
    return new Promise( async (resolve, reject)=>{
            let req = https.get("https://www.mobo.com.mx/XMLData/doofinder.xml", function(res) {
            let data = '';
            res.on('data', function(stream) {
                data += stream;
            });
            res.on('end', function(){
                parser.parseString(data, function(error, result) {
                    if(error === null) {
                        var array = [];
                        result.products.product.forEach(function(item) {
                            array.push(
                                {
                                    "SKU":item.reference_code[0],
                                    "price-vtex": item.sale_price[0].slice(4)                      
                                }
                                );
                        });
                        //console.log(array)
                        resolve(array);
                    }
                    else {
                        console.log(error);
                        reject(error);
                    }
                });
            });

        });
    })

}

exports.getPreciosVTEX = getPreciosVTEX;