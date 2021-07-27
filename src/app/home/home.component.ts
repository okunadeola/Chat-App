import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public nav: ChatService, public route: Router) { }

  ngOnInit(): void {
    this.nav.nav.next(true)
  }

  routToRegister(){
    this.route.navigate(["/register"])
  }
}
