export interface EchoRequest {
    id: string | number;
    method: string;
    params: {
        message: string;
    };
}

export interface EchoResponse {
    id: string | number;
    result: {
        message: string;
    };
}
