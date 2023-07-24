import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from "rxjs/operators";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import '../assets/smtp.js';
declare let Email: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor (private router: Router, private activatedRoute:    ActivatedRoute, private titleService: Title) {
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
            let child = this.activatedRoute.firstChild;
            while (child) {
                if (child.firstChild) {
                    child = child.firstChild;
                } else if (child.snapshot.data &&    child.snapshot.data['title']) {
                    return child.snapshot.data['title'];
                } else {
                    return null;
                }
            }
            return null;
        })
    ).subscribe( (data: any) => {
        if (data) {
            this.titleService.setTitle('VMA UP - ' + data);
        }
    });
}
  
ngOnInit() {
}

  title = 'vma up';
  valid:boolean = false
  msgSucce:boolean = true
  
  msgForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    msg: new FormControl('', Validators.required)
  })

  
  onSubmit(f) {
  this.valid = true
  if (this.msgForm.valid) {
    Email.send({
      Host : "smtp.gmail.com",
      Username : "vmaupcontact@gmail.com",
      Password : "plsbyuntuzigzocg",
      To : `vmaupcontact@gmail.com`,
      From : `vmaupcontact@gmail.com`,
      Subject : `message de ${f.name}`,
      Body : `
      <br/> <b>Name: </b>${f.name} <br /> <b>Email: </b>${f.email}<br /><br> <b><b>Message:</b> <br/> ${f.msg}<br>`
      }).then( () => {} )
      .catch(() => {this.msgSucce = false;alert('erreur: essayer plus tard ou vous pouvez contactez l Email: vmaupcontact@gmail.com')} );
  }
  

  }
 
}
