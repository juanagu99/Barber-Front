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

  constructor(private formBuilder: FormBuilder, private httpClientService: HttpClientService,private router: Router) {
    this.checkoutForm = this.formBuilder.group({
      description: new FormControl('', [Validators.required, Validators.minLength(4)]),
      client: new FormControl('', [Validators.required, Validators.minLength(5)]),
      barber: new FormControl('', [Validators.required, Validators.minLength(5)]),
      date: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }
 
  onSubmit(userData): void {
    console.log('---Data: ', userData);    
    
    if (userData.description && userData.client && userData.barber && userData.date) {
      this.suscribePost = this.httpClientService.newReserve(userData).subscribe(response => {
        console.log('RESPUESTA DEL BACK: ', response);
      })
    } else {
      alert('Todos los campos deben estar Diligenciados')
    }
  }

  reload(){
    location.reload()
  }

  ngOnInit(){
  }

}
