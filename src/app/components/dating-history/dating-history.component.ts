import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { dateInterface } from 'src/app/interface/date-interface';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-dating-history',
  templateUrl: './dating-history.component.html',
  styleUrls: ['./dating-history.component.css']
})
export class DatingHistoryComponent implements OnInit {


  constructor(private formBuilder: FormBuilder, private router: Router) { }

  public data: any;

  ngOnInit() {
    console.log('entra en el onInit');
    this.llamadoApi()
  }

  async llamadoApi() {
     await fetch('http://localhost:3001/getReservas')
      .then(response => response.json())
      .then(data => {
        console.log('data', data.reservas);
        this.data = data.reservas;
      });
  }

  async changeState(item){
    let url = `http://localhost:3001/updateState`;
      let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          "idReserva": item.idReserva
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .catch(error => {
          console.log('error', error);

        })
        .then(response => {
           console.log('response', response); 
           if(response.error){
            alert(response.errorDescription)
           }else{
             console.log('se cambió el estado ');
             location.reload()
           }
           
          }
        );
  }

}
