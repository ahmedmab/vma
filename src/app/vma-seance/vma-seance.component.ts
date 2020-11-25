import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vma-seance',
  templateUrl: './vma-seance.component.html',
  styleUrls: ['./vma-seance.component.css']
})
export class VmaSeanceComponent implements OnInit {
percent:number
vmaVal:number
param:number
rep:number
num:number=1
avec:boolean = true
inputype:string = ' seconds'
serieObj = {
  
}
seriGrp:any[]=[]

  constructor() { }

  ngOnInit(): void {

  }
  togle(){
    this.avec = !this.avec
    this.avec ? this.inputype = ' seconds' : this.inputype = ' métres'
  }
  selectVal(per){
    this.percent = per
    console.log(per)
  }
  submit(f){
    this.seriGrp.push(f)
    this.num++
    console.warn(f)

    console.log(this.seriGrp)
  }

}
