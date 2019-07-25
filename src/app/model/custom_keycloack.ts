export class CustomKeyCloak
{
    flow : string;
    subject : string;
    token: string;
    tokenParsed: object;
    refreshToken: string;
    timeSkew: number;
    authenticated : boolean;
}