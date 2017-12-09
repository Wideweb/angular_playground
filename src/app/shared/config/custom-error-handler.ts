import { ErrorHandler, Injector, Injectable } from "@angular/core";
import { ToastsManager } from "ng2-toastr";

@Injectable()
export default class CustomErrorHandler extends ErrorHandler {

    constructor(private injector: Injector) {
        super();
    }

    handleError(error) {
        // send the error to the server

        console.log('CustomErrorHandler');

        const toastr = this.injector.get(ToastsManager);
        toastr.error(error.message);

        
        // delegate to the default handler
        super.handleError(error);
    }
}