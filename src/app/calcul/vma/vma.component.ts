import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vma',
  templateUrl: './vma.component.html',
  styleUrls: ['./vma.component.css']
})
export class VmaComponent implements OnInit {

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
console.log(this.value)
  }

  calcul(){
    this.result = this.distance/100 + ' Km/h'
    console.log(this.distance)
  }
  calculNavet(){
    this.resultNavet = 8
    this.resultNavet += this.palier/2 
    this.resultNavet = this.resultNavet + ' Km/h'
  }
}
