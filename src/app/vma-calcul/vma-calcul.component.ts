import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-vma-calcul',
  templateUrl: './vma-calcul.component.html',
  styleUrls: ['./vma-calcul.component.css']
})
export class VmaCalculComponent implements OnInit {
  value;
  result
  distance:number
  palier
  resultNavet
  constructor() { }

  ngOnInit(): void {
  }
  getVal(select){
this.value = select
  }

  calcul(){
    this.result = this.distance/100 + ' Km/h'
  }
  calculNavet(){
    this.resultNavet = 8
    this.resultNavet += this.palier/2 
    this.resultNavet = this.resultNavet + ' Km/h'
  }
}
