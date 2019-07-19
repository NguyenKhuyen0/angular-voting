import { Question } from './question';
import{ VotedUser } from './voted_user';

export class Voting
{
    id : String;
    title : String;
    description: String;
    image: String;
    questions : Array<Question>;
    active : Boolean;
}