import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import '../assets/smtp.js';
declare let Email: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vma up';

  constructor(
  ) { }
  
  ngOnInit() {
  }
  msgForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    msg: new FormControl('', Validators.required)
  })

  onSubmit(f) {
  
  Email.send({
  Host : "smtp.gmail.com",
  Username : "vmaupcontact@gmail.com",
  Password : "plsbyuntuzigzocg",
  To : `vmaupcontact@gmail.com`,
  From : `vmaupcontact@gmail.com`,
  Subject : `message de ${f.name}`,
  Body : `
  <br/> <b>Name: </b>${f.name} <br /> <b>Email: </b>${f.email}<br /><br> <b><b>Message:</b> <br /> ${f.msg}<br>`
  }).then( message => {alert(message); f.resetForm(); } );

  f.reset();
  
  }
 
}
