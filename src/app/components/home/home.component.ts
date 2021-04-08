import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  constructor() { }

  validateUserType(): boolean {
    return localStorage.getItem("userType")==="admin" ? true : false;
  }

  currentUser(): boolean {    
    return localStorage.getItem("userType") != null ? true : false;
  }
  
  
}
