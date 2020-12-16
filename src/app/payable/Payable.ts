import { User } from "../auth/user.model";

export class Payable{

    constructor(
        public id:string,
        public user:User,
        public amount:number,
        public description: string,
        public detail: string,
        public paymentDate: Date,
        public createdDate: Date,
        public payTo: string,
        public status: string
    ){}
}