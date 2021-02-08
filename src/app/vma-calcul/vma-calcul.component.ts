import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-vma-calcul',
  templateUrl: './vma-calcul.component.html',
  styleUrls: ['./vma-calcul.component.css']
})
export class VmaCalculComponent implements OnInit ,OnDestroy {
  input = new FormControl('', [Validators.required, Validators.min(0)])
  errorMessage(){
    if (this.input.hasError('required')) {
      return 'vous devez saisir une valeur'
    }
    if (this.input.hasError('min')) {
      return 'la valeur doit étre superieur à 0'
    }
    return ''
  }
  vma: number
  vo2max: number
  hidd:boolean = true
 
  constructor() { }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    localStorage.clear()
  }


 hiddTogle(){
   this.hidd = false
 }
  resetVal() {
    this.vma = null
    this.vo2max = null

  }
 
    //cooper
    calculCooper(x) {
      this.vo2max = 22.35 * (x.value / 1000) - 11.288;
      this.vma = this.vo2max / 3.5;
    }
    //demi-cooper
    calculDemiCooper(x) {
      this.vma = x.value / 100;
      this.vo2max = this.vma * 3.5;
    }
    //ASTRAND
    calculAstrand(x) {
      this.vma = x.value * 17.143 / 1000
      this.vo2max = this.vma * 3.5;
    }
    //Vameval CAZORLA
    calculVameval(x) {
      this.vma = 8
      this.vma += x.value / 2
      this.vo2max = this.vma * 3.5;
    }
    //navette de Luc Léger
    calculNavette(x) {
      this.vma = 8
      this.vma += x.value / 2
      this.vo2max = this.vma * 3.5;
    }
   
    



  

  //--------

}
