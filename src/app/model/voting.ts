import { Question } from './question';

export class Voting
{
    id : string;
    title : string;
    description: string;
    image: string;
    options : Array<Question>;
    active : boolean;
}