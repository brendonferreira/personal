
const cron = require('cron').CronJob;


module.exports.boot = (params, {$event}) => {
    const job = new cron(params.schedule, function() {
        console.log('Alarm was triggered');
        $event.emit('alarm')
    }, null, true, 'America/Sao_Paulo');
    job.start();
} 
