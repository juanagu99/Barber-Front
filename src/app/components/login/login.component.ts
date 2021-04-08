import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpClientService } from '../../services/http-client.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { $ } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  checkoutForm: FormGroup;
  private suscribePost: Subscription;

  constructor(private formBuilder: FormBuilder, 
    private httpClientService: HttpClientService,
    private router: Router,
    ) {
    this.checkoutForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  async onSubmit(userData) {
    console.log('entra en el onSubmit');
    console.log('---Data: ', userData);
    if (userData.email && userData.password) {
      let url = `http://localhost:3001/login`;
      let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          "email": userData.email,
          "password": userData.password
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
           }
           console.log(response.userData.userType)
           localStorage.setItem("userType", response.userData.userType)
           localStorage.setItem("email", response.userData.userEmail)          
           this.router.navigate(["/main"])
          }
        );
    } else {
      alert('Todos los campos deben estar Diligenciados')
    }
  }

  get email() { return this.checkoutForm.get('email') }
  get password() { return this.checkoutForm.get('password') }

  OnRedirect(){
    this.router.navigate(["/register"])
  }


 name = (password, passwordConfirmation) => {
  return password === passwordConfirmation ?  true : false
}

}
