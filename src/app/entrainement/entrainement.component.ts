import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entrainement',
  templateUrl: './entrainement.component.html',
  styleUrls: ['./entrainement.component.css']
})
export class EntrainementComponent implements OnInit {
  choix:string= 'preparer'
  
  constructor() { }

  ngOnInit(): void {
  }

  choice(c:string){
    this.choix = c
  }


}
