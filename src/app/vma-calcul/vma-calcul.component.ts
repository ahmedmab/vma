import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-vma-calcul',
  templateUrl: './vma-calcul.component.html',
  styleUrls: ['./vma-calcul.component.css']
})
export class VmaCalculComponent implements OnInit {
  input = new FormControl('', Validators.required)
  value: number
  vma: number
  vo2max: number
  calculVo2max() {
    this.vo2max = this.vma * 3.5
  }
  constructor() { }

  ngOnInit(): void {
  }
  getVal(select) {
    this.value = select
    this.input.reset()
    this.vma = null
    this.vo2max = null


  }
  //calcul--


  calcul() {
    //cooper
    if (this.value == 1) {
      this.vo2max = 22.35 * (this.input.value / 1000) - 11.288;
      this.vma = this.vo2max / 3.5;
    }
    //demi-cooper
    else if (this.value == 2) {
      this.vma = this.input.value / 100;
    }
    //ASTRAND
    else if (this.value == 3) {
      this.vma = this.input.value * 17.143 / 1000

    }
    //LEGER CAZORLA
    else if (this.value == 4) {

    }
    //navette de Luc Léger
    else if (this.value == 5) {
      this.vma = 8
      this.vma += this.input.value / 2

    }
    //TUB 2 de CAZORLA
    else if (this.value == 6) {

    }
    this.vo2max = this.vma * 3.5;



  }

  //--------


  cooper() {
    this.vo2max = 22.35 * (this.input.value / 1000) - 11.288
    this.vma = this.vo2max / 3.5
    this.input = null
  }
  demiCooper() {
    this.vma = this.input.value / 100
    console.log(this.input.value)

  }
  astrand() {
    this.vma = this.input.value * 17.143 / 1000

  }
  legerCazorla() {

  }
  navet() {
    this.vma = 8
    this.vma += this.input.value / 2
  }
  tubCazorla() {

  }

}
