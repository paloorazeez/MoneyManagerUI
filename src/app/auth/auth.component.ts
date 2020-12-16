import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginMode:boolean = true;
  isLoading: boolean = false;
  error:string = null;
  authObservable: Observable<AuthResponseData>;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSwitchMode()
  {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form:NgForm)
  {
    if(!form.valid)
      return;
    console.log(form.value);
    const username = form.value.username;
    const password = form.value.password;
    this.isLoading = true;
    if(this.loginMode)
    {
        this.authObservable = this.authService.login(username, password);
    }
    else
    {
      const firstname = form.value.firstname;
      const lastname = form.value.lastname;
      const email = form.value.email;
      const mobile = form.value.mobile;
      this.authObservable = this.authService.signup(username, password, firstname, lastname, email, mobile);
    }

    this.authObservable.subscribe(
      resData=>{
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/income']);
      },
      errorMsg=>
      {
        console.log(errorMsg);
        this.isLoading= false;
        this.error = errorMsg;
      }

    );
    
    form.reset();
    
  }

}
