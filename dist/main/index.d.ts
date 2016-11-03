import { IntentHandler } from 'utter-understanding/dist/main/handlers/intent/IntentHandler';
import { AlexaResponse } from 'utter-understanding/dist/main/response/AlexaResponse';
import { RequestHandler } from 'utter-understanding/dist/main/handlers/request/RequestHandler';
import { RequestPostProcessor } from 'utter-understanding/dist/main/handlers/request/RequestPostProcessor';
export declare class MyPreProcessor extends RequestHandler {
    handleRequest(event: any, context: any): Promise<AlexaResponse>;
}
export declare class MyAmazonHelpIntentHandler extends IntentHandler {
    handleIntent(event: any, context: any): Promise<AlexaResponse>;
}
export declare class MyPostProcessHandler extends RequestPostProcessor {
    handleRequest(event: any, context: any, response: AlexaResponse): Promise<AlexaResponse>;
}
export declare function handler(event: any, context: any): void;
