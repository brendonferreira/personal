const stream = require('youtube-audio-stream')

 const play = async (params, context) => {
    const url = 'https://www.youtube.com/watch?v=oJnF5VxTO5g'
    const decoder = require('@suldashi/lame').Decoder
    const speaker = require('speaker')
        
    stream(url)
        .pipe(decoder())
        .pipe(new speaker())
}

 const play()