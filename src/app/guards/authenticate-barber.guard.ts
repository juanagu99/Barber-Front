import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateGuardBarber implements CanActivate {
  constructor( private router: Router){ }

  currentUser(): boolean {
    if(localStorage.getItem("userType") === "barber" 
    || localStorage.getItem("userType") === "admin"
    ){
      return true;
    }else{
      return false;
    }  
  }

  canActivate(){
    if(this.currentUser()){
      return true;
    }else{
      this.router.navigate(['/reserve']);
      return false;
    }
  }
}