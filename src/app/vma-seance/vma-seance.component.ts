import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vma-seance',
  templateUrl: './vma-seance.component.html',
  styleUrls: ['./vma-seance.component.css']
})
export class VmaSeanceComponent implements OnInit {
serie:number
avec:boolean = true
inputype:string
  constructor() { }

  ngOnInit(): void {
  }
  togle(){
    this.avec = !this.avec
    this.avec ? this.inputype = ' seconds' : this.inputype = ' métres'
  }
  submit(){
    
  }

}
