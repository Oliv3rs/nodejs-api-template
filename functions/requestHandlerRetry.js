require("../config/config");
const slackNotifications = require('../functions/alerts');


async function retryHalndler(failedRequest,section,titleError){
    return new Promise(async (resolve,reject)=>{
        let retries = 0;
        let error = null;
        let promiseResult = null;
        while (process.env.REST_RETRIES >= retries){
            try {
                promiseResult = await exponentialRetry(retries,failedRequest);
                resolve(promiseResult)
                break;
            }catch (e) {
                retries ++;
                error = e;
            }
        }
        if(error != null) {
            slackNotifications.notification("MDF7566", "ALTO", process.env.SERVER_ERROR_CHANEL, section, "All retries filed from: " + titleError, error);
        }
        reject(error);
    })
}

function exponentialRetry(tryNumber,failedRequest){
    return new Promise(async (resolve,reject)=>{
        setTimeout(()=>{
             resolve(failedRequest);
        },(2^tryNumber)*120)
    })
}

exports.retryHalndler = retryHalndler;
