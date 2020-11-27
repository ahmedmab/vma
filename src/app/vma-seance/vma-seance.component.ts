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
avec:boolean = true
inputype:string = ' seconds'
num:number=1
seriGrp:any[]=[]
min:number 
sec:number

  constructor() { }

  ngOnInit(): void {

  }
  togle(){
    this.avec = !this.avec
    this.avec ? this.inputype = ' seconds' : this.inputype = ' métres'
  }
 
  submit(f){
    this.seriGrp.push(f)
    this.num++
    console.warn(f)

  }
  delet(index){
this.seriGrp.splice(index,1)
console.log(this.seriGrp)
  }

}
