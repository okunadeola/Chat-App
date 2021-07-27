import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../service/chat.service';


interface Login{
  name: string,
  username:any,
  password: any
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public route:Router, public nav:ChatService) { }
  public username:string = ''
  public password: string = "";
  public error: string = "";
  public success: string = "";
  public button: boolean = true;
  public log: Array<Login> = [];
  ngOnInit(): void {
    this.nav.nav.next(true)
  }

  login(){

      if(localStorage.getItem('chatRegister') !== null) {
        let arr: any  = localStorage.getItem("chatRegister")
        let arrData: any = JSON.parse(arr)
        let finder:any = arrData.find((val:any)=> val.username === this.username && val.password === this.password)

        if (finder) {
          let user: any = []
          user.push({
            email: finder.email,
            password: finder.password
          })
          localStorage.setItem("chatLogin", JSON.stringify(user))
          this.route.navigate([`/chat/${finder.username}`])
        }
        else{
          this.error = "Sorry this username is not found, kindly navigate to the registration page"
          this.alertNullifier()
         
        }
      }
      else{
        this.error ="You are not register, kindly navigate to the registration page"
        this.alertNullifier()
        }

  }

  btnLocker(){
    if (this.username && this.password) {
      this.button = false
    }
  }
  removeAlert(){
    this.error= ''
  }

  alertNullifier(){
    setTimeout(()=>{
      this.error = ''
    }, 10000)
  }

  signUp(){
     this.route.navigate(["/register"])
  }

}