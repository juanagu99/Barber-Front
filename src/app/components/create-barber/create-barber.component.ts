import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-create-barber',
  templateUrl: './create-barber.component.html',
  styleUrls: ['./create-barber.component.css']
})
export class CreateBarberComponent implements OnInit {

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
        userData.userType = "barber"
      this.suscribePost = this.httpClientService.registry(userData).subscribe(response => {
        console.log('RESPUESTA DEL BACK: ', response);
      })} else{
        alert('El campo contraseña y confirmar contraseña deben ser iguales')
      }
    } else {
      alert('Todos los campos deben estar Diligenciados')
    }
  }

  OnRedirect(){
    location.reload()
  }

  ngOnInit(){
  }

}
