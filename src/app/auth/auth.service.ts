import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EmailValidator } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { UrlSegment, Router } from '@angular/router';

export interface AuthResponseData{
  userId: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  user = new BehaviorSubject<User>(null);

  tokenExpirationTimer:any;

  signup(username: string, password: string, firstname: string, lastname: string, email: string, mobile: string)
  {
    return this.http.post<AuthResponseData>("http://localhost:8080/users/signup",
    {
      username: username,
      password: password,
      firstName:firstname,
      lastName: lastname,
      email: email,
      mobile:mobile
    }).pipe(
      catchError(this.handleError),
      tap(resData=>{
        this.handleAuthentication(resData.userId, resData.token);
      })
    );

  }

  login(username: string, password: string )
  {
    return this.http.post<AuthResponseData>("http://localhost:8080/login",
    {
      username: username,
      password: password
    }).pipe(
        catchError(this.handleError),
        tap(resData=>{
          this.handleAuthentication(resData.userId, resData.token);
        })
      );
  }

  logout()
  {
    this.user.next(null);
    this.router.navigate(["/auth"]);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer)
    {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogout(expirationDuration: number)
  {
      this.tokenExpirationTimer = setTimeout( ()=>this.logout(),expirationDuration);
  }

  private handleAuthentication(
    userId: string,
    token: string
  )
  {
   // const expirationDate = new Date(new Date().getTime()+ expiresIn * 1000);
    const user = new User(userId, token);
    this.user.next(user);
    //this.autoLogout(expiresIn*1000);
    localStorage.setItem('userData', JSON.stringify(user))
    this.user.next(user);
  }

  autoLogin()
  {
    /*const userData:{
      email:string,
      id: string,
      _token:string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if(!userData)
      return;
    
      const loadedUser = new User(userData.email, userData.id, userData._token);
      if(loadedUser.token)
      {
        this.user.next(loadedUser);
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);
      }  */
  }

  private handleError(errorRes:HttpErrorResponse)
  {
      console.log("inside handleError");
       
      console.log(errorRes);
      
      let errorMessage="An unknown error occured";
      if(!errorRes.error || !errorRes.error.error || !errorRes.error.error.message)
      {
        return throwError(errorMessage);
      }
      switch(errorRes.error.error.message)
      {
        case 'EMAIL_EXISTS':
          errorMessage="User already exists"
          break;
        case 'EMAIL_NOT_FOUND':
        case 'INVALID_PASSWORD':
          errorMessage="Invalid username or password"
          break;
        case 'USER_DISABLED':
          errorMessage="User is disabled"
        break;

         
      }
      return throwError(errorMessage);
  }

  getLoggedInUser(){
    const userData:{
      userId: string,
      _token:string} = JSON.parse(localStorage.getItem('userData'));

      return userData;
  }
  
}
