export class Option
{
    id : string;
    title : string;
    votes : number;
    voted_users: Array<string>;
    active: boolean;
}