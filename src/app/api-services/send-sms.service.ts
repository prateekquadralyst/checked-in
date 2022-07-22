import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendSmsService {

  constructor(
    private http: HttpClient
  ) { }

  public sendMessage(dest, msg): any {
    let result: any;
    const uName = '20200684';
    const pass = 'N9pEWMp9';
    const senderId = 'medstc';
  }
}
