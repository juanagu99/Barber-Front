import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpClientService } from '../../services/http-client.service'
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({ 
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  checkoutForm: FormGroup;
  private suscribePost: Subscription;
  public equal: boolean;

  constructor(private formBuilder: FormBuilder, private httpClientService: HttpClientService,private router: Router) {
    this.checkoutForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      validatePassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
      fullname: new FormControl('', [Validators.required, Validators.minLength(4)]),
      address: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  checkPassword =(password, validatePassword)=>{
    return password === validatePassword ? true : false
  }

  onSubmit(userData): void {
    console.log('---Data: ', userData);    
    
    if (userData.email && userData.password && userData.validatePassword && userData.fullname) {
      if(this.checkPassword(userData.password,userData.validatePassword)){ 
        userData.userType = "client"    
      this.suscribePost = this.httpClientService.registry(userData).subscribe(response => {
        console.log('RESPUESTA DEL BACK: ', response);
        this.router.navigate(["/login"])
      })} else{
        alert('El campo contraseña y confirmar contraseña deben ser iguales')
      }
    } else {
      alert('Todos los campos deben estar Diligenciados')
    }
  }

  OnRedirect(){
    this.router.navigate(["/login"])
  }

}
 