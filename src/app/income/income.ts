import { User } from "../auth/user.model";

export class Income
{

    constructor(
        public id: string,
        public user: User,
        public category: string,
        public incomeDate: Date,
        public amount:number,
        public description:string,
        public detail:string,
        public createdDate: Date
    ){}
}