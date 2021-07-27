import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public nav:any
  constructor(public navigation: ChatService) { }

  ngOnInit(): void {
    this.navigation.nav.subscribe(data=>{
      this.nav= data
    })
  }

}
