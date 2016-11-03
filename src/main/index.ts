import {UtterUnderstanding} from 'utter-understanding/dist/main/UtterUnderstanding';
import RequestNames from 'utter-understanding/dist/main/handlers/request/RequestNames';
import {IntentHandler} from 'utter-understanding/dist/main/handlers/intent/IntentHandler';
import {AlexaResponse} from 'utter-understanding/dist/main/response/AlexaResponse';
import {RequestHandler} from 'utter-understanding/dist/main/handlers/request/RequestHandler';
import {IntentRequestHandler} from 'utter-understanding/dist/main/handlers/request/IntentRequestHandler';
import {RequestPostProcessor} from 'utter-understanding/dist/main/handlers/request/RequestPostProcessor';
import IntentNames from 'utter-understanding/dist/main/handlers/intent/IntentNames';

export class MyPreProcessor extends RequestHandler {
    handleRequest(event: any, context: any): Promise<AlexaResponse> {
        this.logger.debug('W00T::Preprocessing Request!');
        return new Promise((resolve: any) => { resolve('Preprocessed'); });
    }
}

export class MyAmazonHelpIntentHandler extends IntentHandler {
    handleIntent(event: any, context: any): Promise<AlexaResponse> {
        this.logger.debug('W00T::Handling a Help Intent!');
        return new Promise((resolve: any) => { resolve(AlexaResponse.defaultInstance); });
    }
}

export class MyPostProcessHandler extends RequestPostProcessor {
    handleRequest(event: any, context: any, response: AlexaResponse): Promise<AlexaResponse> {
        this.logger.debug('W00T::Post-processing Request!');
        return new Promise((resolve: any) => { resolve(response); });
    }
}

export function handler(event: any, context: any) {
    let myPreProcessor = new MyPreProcessor('MyPreProcessor');
    let myHelpHandler = new MyAmazonHelpIntentHandler('MyAmazonHelpIntentHandler');
    let myRequestHandler = new IntentRequestHandler();
    let myPostProcessHandler = new MyPostProcessHandler('MyPostProcessHandler');

    myRequestHandler.registerIntentHandler(IntentNames.Amazon.HelpIntent, myHelpHandler);


    let utter = new UtterUnderstanding();
    utter.registerPreProcessHandler(myPreProcessor);
    utter.registerRequestHandler(RequestNames.IntentRequest, myRequestHandler);
    utter.registerPostProcessHandler(myPostProcessHandler);

    utter
        .handleRequest(event, context)
        .then((response: any) => {
            context.succeed(response);
        })
        .catch((error: any) => {
            context.fail(error);
        });
}
