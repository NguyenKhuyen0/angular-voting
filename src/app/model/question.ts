import { Option } from './option';

export class Question
{
    id : String;
    id_voting : String;
    question : String;
    options : Array<Option>;
    active : Boolean;
}