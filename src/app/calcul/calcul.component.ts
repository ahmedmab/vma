import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calcul',
  templateUrl: './calcul.component.html',
  styleUrls: ['./calcul.component.css']
})
export class CalculComponent implements OnInit {
  choix:string = 'vma'
  constructor() { }

  ngOnInit(): void {
  }

  choice(c:string){
    this.choix = c
  }

}
