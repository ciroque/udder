"use strict";
const UtterUnderstanding_1 = require('utter-understanding/dist/main/UtterUnderstanding');
const RequestNames_1 = require('utter-understanding/dist/main/handlers/request/RequestNames');
const IntentHandler_1 = require('utter-understanding/dist/main/handlers/intent/IntentHandler');
const AlexaResponse_1 = require('utter-understanding/dist/main/response/AlexaResponse');
const RequestHandler_1 = require('utter-understanding/dist/main/handlers/request/RequestHandler');
const IntentRequestHandler_1 = require('utter-understanding/dist/main/handlers/request/IntentRequestHandler');
const RequestPostProcessor_1 = require('utter-understanding/dist/main/handlers/request/RequestPostProcessor');
const IntentNames_1 = require('utter-understanding/dist/main/handlers/intent/IntentNames');
class MyPreProcessor extends RequestHandler_1.RequestHandler {
    handleRequest(event, context) {
        this.logger.debug('W00T::Preprocessing Request!');
        return new Promise((resolve) => { resolve('Preprocessed'); });
    }
}
exports.MyPreProcessor = MyPreProcessor;
class MyAmazonHelpIntentHandler extends IntentHandler_1.IntentHandler {
    handleIntent(event, context) {
        this.logger.debug('W00T::Handling a Help Intent!');
        return new Promise((resolve) => { resolve(AlexaResponse_1.AlexaResponse.defaultInstance); });
    }
}
exports.MyAmazonHelpIntentHandler = MyAmazonHelpIntentHandler;
class MyPostProcessHandler extends RequestPostProcessor_1.RequestPostProcessor {
    handleRequest(event, context, response) {
        this.logger.debug('W00T::Post-processing Request!');
        return new Promise((resolve) => { resolve(response); });
    }
}
exports.MyPostProcessHandler = MyPostProcessHandler;
function handler(event, context) {
    let myPreProcessor = new MyPreProcessor('MyPreProcessor');
    let myHelpHandler = new MyAmazonHelpIntentHandler('MyAmazonHelpIntentHandler');
    let myRequestHandler = new IntentRequestHandler_1.IntentRequestHandler();
    let myPostProcessHandler = new MyPostProcessHandler('MyPostProcessHandler');
    myRequestHandler.registerIntentHandler(IntentNames_1.default.Amazon.HelpIntent, myHelpHandler);
    let utter = new UtterUnderstanding_1.UtterUnderstanding();
    utter.registerPreProcessHandler(myPreProcessor);
    utter.registerRequestHandler(RequestNames_1.default.IntentRequest, myRequestHandler);
    utter.registerPostProcessHandler(myPostProcessHandler);
    utter
        .handleRequest(event, context)
        .then((response) => {
        context.succeed(response);
    })
        .catch((error) => {
        context.fail(error);
    });
}
exports.handler = handler;
//# sourceMappingURL=index.js.map