import { Option } from './option';

export class Question
{
    id : String;
    voting_id : String;
    question : String;
    options : Array<Option>;
    active : Boolean;
}