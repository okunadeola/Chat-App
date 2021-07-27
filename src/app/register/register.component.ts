import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../service/chat.service';

interface Register {
  name: string;
  email: string;
  password: any;
  username: any;
  messageCatalogue: any;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public username: string = '';
  public fullname: string = '';
  public email: string = '';
  public password: string = '';
  public error: string = '';
  public success: string = '';

  public userForm: FormGroup = this.form.group({});

  public registerLog: Array<Register> = [];
  constructor(
    public route: Router,
    public form: FormBuilder,
    public nav: ChatService
  ) {}

  ngOnInit(): void {
    this.nav.nav.next(true);
    this.userForm = this.form.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
      fullname: ['', [Validators.required]],
      username: ['', [Validators.required]],
    });
  }

  get f() {
    return this.userForm.controls;
  }

  register() {
    if (
      this.fullname !== '' &&
      this.email !== '' &&
      this.username !== '' &&
      this.password !== ''
    ) {
      this.registerLog.push({
        name: this.fullname,
        email: this.email,
        username: this.username,
        messageCatalogue: [],
        password: this.password,
      });

      if (localStorage.getItem('chatRegister') === null) {
        localStorage.setItem('chatRegister', JSON.stringify(this.registerLog));
        this.success = 'Your registration is successful!';
        this.infoNullifier();
        setTimeout(() => {
          this.route.navigate(['/login']);
        }, 2000);
      } else {
        let data: any = localStorage.getItem('chatRegister');
        let newData = JSON.parse(data);
        let finder: any = newData.find(
          (val: any) => val.username === this.username
        );
        let findEmail: any = newData.find(
          (val: any) => val.email === this.email
        );
        if (!finder) {
          if (!findEmail) {
            newData.push(this.registerLog[this.registerLog.length - 1]);
            localStorage.setItem('chatRegister', JSON.stringify(newData));
            this.success = 'Your registration is successful!';
            this.infoNullifier();
            setTimeout(() => {
              this.route.navigate(['/login']);
            }, 2000);
          } else {
            this.error = 'email is not availabe';
            this.alertNullifier();
          }
        } else {
          this.error = 'username is not availabe';
          this.alertNullifier();
        }
      }
    } else {
      this.error = 'all field should filled';
      this.alertNullifier();
    }
  }

  usernameValidator() {
    if (
      this.username !== '' &&
      this.username !== 'unknown' &&
      this.username !== 'null'
    ) {
      if (localStorage.getItem('chatRegister') !== null) {
        let arr: any = localStorage.getItem('chatRegister');
        let arrData: any = JSON.parse(arr);
        let finder: any = arrData.find(
          (val: any) => val.username === this.username
        );

        if (finder) {
          this.error = 'username is not availabe';
          this.alertNullifier();
        }
      }
    } else if (this.username === 'unknown' || this.username === 'null') {
      this.error = 'username is not valid';
    }
  }

  removeAlert() {
    this.error = '';
  }

  alertNullifier() {
    setTimeout(() => {
      this.error = '';
    }, 5000);
  }

  infoNullifier() {
    setTimeout(() => {
      this.success = '';
    }, 1000);
  }

  logUp() {
    this.route.navigate(['/login']);
  }
}
