import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-vma-calcul',
  templateUrl: './vma-calcul.component.html',
  styleUrls: ['./vma-calcul.component.css']
})
export class VmaCalculComponent implements OnInit {
  value:number
  input:number
  output:number
  vo2max:number
  constructor() { }

  ngOnInit(): void {
  }
  getVal(select){
this.value = select
  }
  cooper(){
    this.vo2max = 22.35 * (this.input/1000) - 11.288
    this.output = this.vo2max /3.5
    this.input=null
  }
  demiCooper(){
    this.output = this.input/100
    this.vo2max = this.output*3.5
    this.input=null

  }
  astrand(){
    this.output = this.input*17.143/1000

  }
  legerCazorla(){

  }
  navet(){
    this.output = 8
    this.output += this.input/2 
  }
  tubCazorla(){

  }

}
