import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'barberfront';
  
  constructor(private router: Router){
  }
  
  logout(){
    localStorage.setItem("userType",null)
    localStorage.setItem("email",null) 
  }

  OnRedirect(){
    location.reload()
  }

  validateUserType(): boolean {
    return localStorage.getItem("userType")==="admin" ? true : false;
  }

  validateUserTypeBarber(): boolean {
    if(localStorage.getItem("userType") === "barber"
    || localStorage.getItem("userType") === "admin"){
      return true;
    }else{ 
      return false;
    } 
  }

  currentUser(): boolean {
    if(localStorage.getItem("userType") === null 
    || localStorage.getItem("userType") === 'null'
    || localStorage.getItem("userType") === undefined ){
      return false;
    }else{
      return true;
    }  
  }

}
