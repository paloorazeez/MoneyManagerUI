import { User } from "../auth/user.model";

export class Receivable{

    constructor(
        public id:string,
        public user:User,
        public receiveFrom:string,
        public description:string,
        public detail:string,
        public amount: number,
        public receivableDate: string,
        public paymentStatus:string,
        public createdDate: Date

    ){}
}