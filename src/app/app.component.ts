import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;
  days: number = 0;

  eventTitle: string = "";
  eventDate: any = null;

  minDate: Date = new Date();

  ngOnInit(): void {
    this.eventTitle = localStorage.getItem("eventTitle") ?? "";
    this.eventDate = localStorage.getItem("eventDate") ?? null;
    this.counter;
  }

  counter = setInterval(()=>{
    let currentDate: Date = new Date();
    let currentTime: number = currentDate.getTime();

    if(this.eventDate != null && !(this.eventDate instanceof Date)){
      let momentDate = moment(this.eventDate);
      this.eventDate = momentDate.toDate();
    }
    let targetTime: number = this.eventDate.getTime();

    let difference = targetTime - currentTime;
    this.seconds = Math.floor(difference / 1000);
    this.minutes = Math.floor(this.seconds / 60);
    this.hours = Math.floor(this.minutes / 60);
    this.days = Math.floor(this.hours / 24);

    this.hours %= 24;
    this.minutes %= 60;
    this.seconds %= 60;


    if(difference == 0){
      clearInterval(this.counter);
    }
  }, 1000);

  eventTitleHandler(){
    if(this.eventTitle != localStorage.getItem("eventTitle")){
      localStorage.setItem("eventTitle", this.eventTitle);
    }
  }

  eventDateHandler(){
    if(this.eventDate != localStorage.getItem("eventDate")){
      localStorage.setItem("eventDate", this.eventDate);
    }
  }
    
}
