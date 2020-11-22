import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vma-trainer',
  templateUrl: './vma-trainer.component.html',
  styleUrls: ['./vma-trainer.component.css']
})
export class VmaTrainerComponent implements OnInit {
vma
vma60
vma65
vma70
vma75
vma80
vma85
vma90
vma95
vma100
vma105 
vma110 
vma115
// allur de 100 m
vma_ms 
vma_30s:number
vma_100 
second
minut
metre 
  constructor() { }

  ngOnInit(): void {
  }

  calcul(){
this.second = ' s'   
this.minut = ' min'
this.metre = ' m'
this.vma_ms = this.vma * 1000 / 3600
this.vma_30s = this.vma_ms
this.vma_100 = 100 / this.vma_ms
this.vma60 = (this.vma*60)/100 + " km/h"
this.vma65 = (this.vma*65)/100 + " km/h"
this.vma70 = (this.vma*70)/100 + " km/h"
this.vma75 = (this.vma*75)/100 + " km/h"
this.vma80 = (this.vma*80)/100 + " km/h"
this.vma85 = (this.vma*85)/100 + " km/h"
this.vma90 = (this.vma*90)/100 + " km/h"
this.vma95 = (this.vma*95)/100 + " km/h"
this.vma100 = this.vma + " km/h"
this.vma105 = (this.vma*105)/100 + " km/h"
this.vma110 = (this.vma*110)/100 + " km/h"
this.vma115 = (this.vma*115)/100 + " km/h"
  }

   MyTime(STemps) {
    var result = "";
    // suppressions des chiffres après la virgule
    STemps = (Math.round(STemps * 10) )/ 10;
  
    var MyMinut = (STemps - ( STemps % 60) ) / 60;
    if (MyMinut > 0) {result = result + MyMinut + " mn " };
    var MySecond = (Math.round((STemps % 60)*10)) / 10 ;
    if (MySecond > 0) {result = result + MySecond + " s" };
    return result }
  

}
