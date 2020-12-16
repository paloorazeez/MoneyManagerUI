export class User
{

    constructor(
        public userId: string,
        
        private _token: string,
    ){}

    get token()
    {
        /*if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate)
        {
            return null;
        }*/
        return this._token;
    }
}