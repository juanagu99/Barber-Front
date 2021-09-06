import { Users } from './../../class/users';
import { Reserva } from './../../class/reservas';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {

  checkoutForm: FormGroup;
  private suscribePost: Subscription;
  public equal: boolean;
  public data: any;  
  public user_email : string = localStorage.getItem("email")

  constructor(private formBuilder: FormBuilder, private httpClientService: HttpClientService,private router: Router) {
    this.checkoutForm = this.formBuilder.group({
      description: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.minLength(5)]),
      barber: new FormControl('', [Validators.required, Validators.minLength(2)]),
      date: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  ngOnInit() {
    console.log('entra en el onInit');
    this.llamadoApi()
  }

  async llamadoApi() {
    await fetch('http://localhost:3001/getAllUsers')
      .then(response => response.json())
      .then( response  => {
        let lista : Users[] = response.data
        this.data = lista.filter( x => x.userType === 'barber');
        console.log(this.data);
      });
  }


  onSubmit(userData): void {
    if (userData.description && userData.email && userData.barber && userData.date) { 
      console.log("barber esocjido: " + userData.barber)
      try{
        this.suscribePost = this.httpClientService.newReserve(userData)
        .subscribe((response:Reserva) => {
          alert(response.response)
          console.log('RESPUESTA DEL BACK: ', response.response);   
        })
      }catch(error){
        alert("error")
      }
     
    } else {
      alert('Todos los campos deben estar Diligenciados')
    }
  }

  validateUserType(): boolean{
      return localStorage.getItem("userType")==="client" ? true : false;
  }
  

  reload(){
    location.reload()
  }

}
