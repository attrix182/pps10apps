import { Component, OnInit } from '@angular/core';

//Validaciones y Alerts
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

///Login
import { User } from '../shared/User.class';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  users =[
    {"email":"uno@gmail.com","clave":"123456"},
    {"email":"jorge@gmail.com","clave":"123456"},
    {"email":"juan@gmail.com","clave":"123456"},
    {"email":"admin@gmail.com","clave":"123456"},
    {"email":"ana@gmail.com","clave":"123456"}
  ];

  constructor(
    private router: Router,
    private authSvc: AuthService,
    private formBuilder: FormBuilder,
  ) { }

  user: User = new User();

  /***  VALIDACIONES ***/
  get email() {
    return this.registrationForm.get('email');
  }
  get password() {
    return this.registrationForm.get('password');
  }

  public errorMessages = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'pattern', message: 'Please enter a valid password' }
    ]
  }

  registrationForm = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$")
      ]
    ],
    password: ['', Validators.required]
  });

  async onLogin() {
    this.user.email = this.email.value;
    this.user.password = this.password.value;
    const user = await this.authSvc.onLogin(this.user);
    if (user) {
      this.authSvc.currentUser = this.user;
      console.log("Logeado!!");
      this.router.navigateByUrl('/home');
    }
  }

  public submit() {
    console.log(this.registrationForm.value);
  }
    ngOnInit(){}

  public LoginFast(id:number){
    this.user.email = this.users[id].email;
    this.user.password = this.users[id].clave;

  }
}
