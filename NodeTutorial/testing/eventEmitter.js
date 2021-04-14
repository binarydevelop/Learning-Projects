//Event - Emitters : Events handling
const EventEmitter = require('events')
const eventEmitter = new EventEmitter();

eventEmitter.on('emitted', () => {
    console.log('Event Occured')
})

eventEmitter.emit('emitted');



