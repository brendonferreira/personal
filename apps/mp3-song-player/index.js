const request = require('request')
const decoder = require('@suldashi/lame').Decoder
const Speaker = require('speaker')
const fs = require('fs')
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

module.exports.play = async (params, context) => {
    const url = params.url
    
    let stream;

    if( url.indexOf('http') >= 0 ) {
        stream = request(url)
    } else {
        stream = fs.createReadStream(url)
    }

    const speaker = new Speaker({
        // device: 'hw:2,0'
    })
    
    stream.pipe(decoder())
        .pipe(speaker)

    

    return new Promise( resolve => {

        stream.on('close', resolve)

    } )

}