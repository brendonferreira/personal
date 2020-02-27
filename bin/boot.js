const settings = require(__dirname + '/../settings.json')
const EventEmitter = require('events');

const bootstrapApp = (settings, context) => {

    context.$event = new EventEmitter()
    
    const app = require('../' + settings.modulePath)

    for( const eventName in settings.on ){
        context.$event.on(eventName, async (data) => {
            const actions = settings.on[eventName]
            await executeActions(actions, context)
        })
    }

    return app
}

const executeAction = async ({name, type, method, params = {}}, context) => {
    if( type === 'execute-app' ) {
        const app = context.apps[name]
        const action = app.instance[method]

        const mergedParams = {
            ...params,
            ...app._settings.params,
        }
        
        
        // TODO: add more execution methods async, sync, blablabla
        console.log('Started app execution:', name)
        await action( mergedParams, context)
        console.log('Finished/ app execution:', name)
    }
} 

const executeActions = async (actions, context) => {
    for( const action of actions ) {
        await executeAction(action, context)
    }
}

const startApps = async (settings) => {

    const context = {apps: {}}

    for ( const appSettings of settings.apps ){
        const app = await bootstrapApp(appSettings, context)

        context.apps[appSettings.name] = {
            instance: app,
            _settings: appSettings
        }

        if( app.boot ) {
            await executeAction( { 
                name: appSettings.name, 
                method: 'boot',
                type: 'execute-app'
            }, context)
        }
    }

}

startApps(settings)