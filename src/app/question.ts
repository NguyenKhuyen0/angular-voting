import { Option } from './option';

export class Question
{
    id : string;
    question : string;
    options : Array<Option>;
    active : string;
}