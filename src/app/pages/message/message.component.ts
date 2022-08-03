import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  segmentTab: any;
  chatData: ( { "name": string; "status": string; "image": string; "description": string; "time": string; "count"?: undefined; })[];

  constructor(
    private navigationService: NavigationService
  ) { 
    this.chatData = [{
      "name": 'Ram Singh',
      "image": '../../../assets/1.jpg',
      "description": ' Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
      "time": '12:17',
      "status": "ofline"
    }, {
      "name": 'Shayam',
      "image": '../../../assets/1.jpg',
      "description": ' Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
      "time": '12:17',
      "status": "online"
    }, {
      "name": 'Gaurav',
      "image": '../../../assets/1.jpg',
      "description": ' Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
     
      "time": 'Yesterday',
      "status": "online"
    }, {
      "name": 'Gagan',
      "image": '../../../assets/1.jpg',
      "description": ' Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
      "time": 'Sunday',
      "status": "ofline"
    }, {
      "name": 'Rahul',
      "image": '../../../assets/1.jpg',
      "description": ' Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
      "status": "online",
      "time": '11:15'
    }
    ]
  }

  ngOnInit() {}

  segmentChanged(event: any) {
    this.segmentTab = event.detail.value;
    console.log(this.segmentTab);
  }

  public navigateTo(url){
    this.navigationService.navigateTo(url);
  }

}
