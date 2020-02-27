const stream = require('youtube-audio-stream')

module.exports.play = async (params, context) => {
    const url = 'http://youtube.com/watch?v=34aQNMvGEZQ'
        const decoder = require('@suldashi/lame').Decoder
        const speaker = require('speaker')
        
    stream(url)
        .pipe(decoder())
        .pipe(new speaker())
}

module.exports.play()