import {EventEmitter} from "events";

const eventEmitter = new EventEmitter();

const eventService = {
    subscribe(eventName , listener){
        eventEmitter.on(eventName , listener)
    },
    unsubscribe(eventName , listener){
        eventEmitter.off(eventName , listener)
    },
    emitEvent(eventName , eventData){
        eventEmitter.emit(eventName , eventData)
    }
}

export default eventService;