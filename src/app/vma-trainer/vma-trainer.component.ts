import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vma-trainer',
  templateUrl: './vma-trainer.component.html',
  styleUrls: ['./vma-trainer.component.css']
})
export class VmaTrainerComponent implements OnInit {
vma:number
vma80 
vma85
vma90 
vma100
vma105 
vma110 
vma115

  constructor() { }

  ngOnInit(): void {
  }

  calcul(){
this.vma80 = (this.vma*80)/100
this.vma85 = (this.vma*85)/100
this.vma90 = (this.vma*90)/100
this.vma100 = this.vma
this.vma105 = (this.vma*105)/100
this.vma110 = (this.vma*110)/100
this.vma115 = (this.vma*115)/100
  }

}
