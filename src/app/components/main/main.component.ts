import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  
  checkoutForm: FormGroup;
  public data: any;


  constructor(private formBuilder: FormBuilder,private router: Router ) {
    this.checkoutForm = this.formBuilder.group({
      nombres: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
    this.checkoutForm.get('email').setValue( localStorage.getItem("email"))
  }

  ngOnInit(){
    this.getUser();
  }

  async getUser() {
    await fetch('http://localhost:3001/getUser?email='+ localStorage.getItem('email') )
     .then(response => response.json())
     .then(data => {            
       this.data = data;  
     });
     this.checkoutForm.get('nombres').setValue(this.data.response[0].fullname)
 }

  async onSubmit(userData) {
    console.log('entra en el onSubmit');
    console.log('---Data: ', userData);
    let url = `http://localhost:3001/updateUser`;
    let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          "fullname": userData.nombres,
          "email": userData.email
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
           alert('Se actualizo correctamente')
          }
        );
  }

  logout(){
    localStorage.setItem("userType",null)
    this.router.navigate["/"]
  }

  get names() { return this.checkoutForm.get('names') }
  get email() { return this.checkoutForm.get('email') }
  get password() { return this.checkoutForm.get('password') }



}
