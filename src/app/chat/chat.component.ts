import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  constructor(
    public actRoute: ActivatedRoute,
    public route: Router,
    public navigation: ChatService
  ) {}

  public id: any = false;
  public sending: any = true;
  public chatName: any = '';
  public toggle: any = true;
  public username: any = '';
  public recieverFront: any = [];
  public senderFront: any = [];
  public allChatFront: any = [];
  public receiverName: any = '';
  public message: any = '';
  public allUser: any = [];
  public messageLog: any = [];
  public recieverMessageLog: any = [];



  public nav: any;
  ngOnInit(): void {
    this.navigation.nav.next(false);
    this.actRoute.paramMap.subscribe((param) => {
      this.username = param.get('username');
    });
    if (localStorage.getItem('chatRegister') !== null) {
      let storage: any = localStorage.getItem('chatRegister');
      let data = JSON.parse(storage);

      let user = data.filter((val: any) => val.username !== this.username);
      let RealUser = data.find((val: any) => val.username === this.username);
      let loggedUser: any = localStorage.getItem('chatLogin');
      let loggedArr: any = JSON.parse(loggedUser);

      if (user.length !== 0) {
       
        if (loggedArr.lenght !== 0) {
          let logged: any = loggedArr.find(
            (val: any) =>
              val.email === RealUser.email && val.password === RealUser.password
          );
         
          if (!logged) {
            alert('you have not logged in');
            this.route.navigate(['/login']);
          } else {
            this.allUser = user;
          }
        }else{
          alert('you have not logged in');
          this.route.navigate(['/login']);
        }
        
      } else {
        alert('you are not register');
        this.route.navigate(['/register']);
      }
    }else {
      alert('you are not register');
      this.route.navigate(['/register']);
    }
  }

  userData(info: any) {
    this.receiverName = info;
    let data: any = localStorage.getItem('chatRegister');
    let refined: any = JSON.parse(data);

    let finder: any = refined.find((val: any) => val.username === info);
    let findUser: any = refined.find(
      (val: any) => val.username === this.username
    );
    let index: any = refined.indexOf(findUser);
    let ind: any = refined.indexOf(finder);


    let receiverChat: any = finder.messageCatalogue.find(
      (val: any) => val.username === findUser.username
    );
    
    let ourChat: any = findUser.messageCatalogue.find(
      (val: any) => val.username === finder.username
    );

    if (ourChat) {
      this.messageLog = ourChat;
      this.senderFront = ourChat.message[0].myMessage;
     
    } else {
      findUser.messageCatalogue.push({
        username: finder.username,
        message: [],
      });

      let ourNewChat = findUser.messageCatalogue.find(
        (val: any) => val.username === finder.username
      );
      ourNewChat.message.push({
        myMessage: [],
        recieverMessage: [],
      });
      this.messageLog = ourNewChat;
      refined[index] = findUser;
      localStorage.setItem('chatRegister', JSON.stringify(refined));
    }

    if (receiverChat) {
      this.recieverMessageLog = receiverChat;
      this.recieverFront = ourChat.message[0].recieverMessage;
    } else {
      finder.messageCatalogue.push({
        username: this.username,
        message: [],
      });

      let receiverNewChat = finder.messageCatalogue.find(
        (val: any) => val.username === this.username
      );
      receiverNewChat.message.push({
        myMessage: [],
        recieverMessage: [],
      });
      this.recieverMessageLog = receiverNewChat;

      refined[ind] = finder;
      localStorage.setItem('chatRegister', JSON.stringify(refined));
    }

    this.allChatFront = [...this.recieverFront, ...this.senderFront];

    let sorted: any = this.allChatFront.sort((a: any, b: any) => {
      return a.time - b.time;
    });

    this.allChatFront = sorted;
    this.sending = false;
    this.id = false;
  }

  sendMessage() {
    if (this.message !== "") {
      
      let time: any = new Date();
      Date.now();
  
      let data: any = localStorage.getItem('chatRegister');
      let refined: any = JSON.parse(data);
      let receiver: any = refined.find(
        (val: any) => val.username === this.receiverName
      );
      let sender: any = refined.find(
        (val: any) => val.username === this.username
      );
      let index: any = refined.indexOf(sender);
      let ind: any = refined.indexOf(receiver);
  
      let receiverChat: any = receiver.messageCatalogue.find(
        (val: any) => val.username === sender.username
      );
      if (receiverChat) {
        receiverChat.message[0].recieverMessage.push({
          message: this.message,
          time: Date.now(),
          name: this.username,
        });
        refined[ind] = receiver;
      }
  
      let senderChat: any = sender.messageCatalogue.find(
        (val: any) => val.username === receiver.username
      );
      if (senderChat) {
        senderChat.message[0].myMessage.push({
          message: this.message,
          time: Date.now(),
          name: this.username,
        });
        refined[index] = sender;
        this.senderFront = senderChat.message[0].myMessage;
        this.allChatFront.push({
          message: this.message,
          time: Date.now(),
          name: this.username,
        });
      }
  
      localStorage.setItem('chatRegister', JSON.stringify(refined));
  
      this.message = '';
    }
  }

  toggleUserList() {
    if (this.toggle) {
      this.id = true;
      this.toggle = false;
    } else if (!this.toggle) {
      this.id = false;
      this.toggle = true;
    }
  }

  searchChat() {
    let filterData: any = this.allUser.filter((val: any) => {
      return val.username.includes(this.chatName);
    });
    this.allUser = filterData;
  }

  searchChatName() {
    let filterData = this.allUser.filter((val: any) => {
      return val.username.includes(this.chatName);
    });
    if (this.chatName) {
      this.allUser = filterData;
    } else {
      let storage: any = localStorage.getItem('chatRegister');
      let data = JSON.parse(storage);

      this.allUser = data.filter((val: any) => val.username !== this.username);
      return this.allUser;
    }
  }


  logout() {
    this.route.navigate(['/']);
    localStorage.removeItem("chatLogin")
    localStorage.setItem("chatLogin", JSON.stringify([]))
  }
}
