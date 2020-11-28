import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';


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

 tables:any[]= []
 



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
  }
  delet(index){
this.seriGrp.splice(index,1)
console.log(this.seriGrp)
  }

     // data pour le document PDF

  title = `Seance d'entrainment VMA`;

  convertoPdf(){
    let seri=1;
    this.seriGrp.forEach(el=>{
      console.log(el)

    })
    var doc = new jsPDF('portrait', 'px', 'a4');

    doc.setFontSize(20);
    doc.text(`Seance d'entrainment VMA`, 120, 20);
    doc.setFontSize(11);
    doc.setTextColor(100);

    this.seriGrp.forEach(element =>{
      
    (doc as any).autoTable({

      head: [['serie'+ seri++, '']],

      body: [
             [element.percent, element.vmaVal + " Km/h"],
             ['Vitesse', element.vmaVal*element.percent/100 + " Km/h"],
             ['Volume de Travail', element.rep*element.param],
             ['Récuperation', element.param*2/3]
            ],

    });
  })
    // Open PDF document in new tab
    doc.output('dataurlnewwindow')
    // Download PDF document  
    doc.save('séance-VMA.pdf');
    }
  
}