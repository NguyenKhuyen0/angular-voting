import { Question } from './question';

export class Voting
{
    id : string;
    title : string;
    options : Array<Question>;
    active : boolean;
}