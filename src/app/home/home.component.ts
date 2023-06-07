import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../Interfaces/IUser';
import { EmitterVisitorContext } from '@angular/compiler';
import { Emitters } from '../Emitters/emitters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  message: string = '';

  constructor(
    private http: HttpClient
  ){
  }



  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/user', {withCredentials: true})
    .subscribe(
      {
        next: (res:any) => {
          this.message = `Hi ${res.name}`
          Emitters.authEmitter.emit(true);
        },

        error: err => {
            this.message = 'You are not logged in';
            Emitters.authEmitter.emit(false);
          }
        }
    );
  }

  // ngOnInit(): void {
  //   this.http.get('http://localhost:8080/api/user', {withCredentials: true})
  //   .subscribe(
  //     (res:any) => {
  //       this.message = `Hi ${res.name}`
  //     },
  //     err => {
  //       this.message = 'You are not logged in';
  //     }

  //   );
  // }

}
