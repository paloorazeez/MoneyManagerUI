import { User } from "../auth/user.model";

export class Expense
{

    constructor(
        public id: string,
        public user: User,
        public category: string,
        public expenseDate: Date,
        public amount:number,
        public description:string,
        public detail:string,
        public createdDate:Date
    ){}
}