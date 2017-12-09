export enum ToastrMessageType {
    info = "toaster-info",
    error = "toaster-error"
}

export enum ToastrMessageState {
    shown = "shown",
    closing = "closing"
}

export class ToastrMessage {
    type: ToastrMessageType;
    content: string;
    state: ToastrMessageState;

    constructor(type: ToastrMessageType, content: string) {
        this.type = type;
        this.content = content;
        this.state = ToastrMessageState.shown;
    }
}