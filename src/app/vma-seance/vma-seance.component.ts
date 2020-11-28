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
seriForPdf={
  head:[],
  body:[]
}


  constructor() { }

  ngOnInit(): void {

  }
  togle(){
    this.avec = !this.avec
    this.avec ? this.inputype = ' seconds' : this.inputype = ' métres'
  }
 
  submit(f){
    this.seriGrp.push(f)
    this.seriForPdf.head.push(['Serie : '+ this.num])
    this.seriForPdf.body.push(['VMA',f['vmaVal']])
    this.num++

    console.warn(this.seriForPdf)

  }
  delet(index){
this.seriGrp.splice(index,1)
console.log(this.seriGrp)
  }

     // data pour le document PDF

  title = `Seance d'entrainment VMA`;

  convertoPdf() {
    var doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`Seance d'entrainment VMA`, 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);

    for(let i=0; i< this.seriForPdf.head.length ; i++){
     const addCard = ()=>{
       const chead:any[]= [this.seriForPdf.head[i]]
       const cbody:any[]= [this.seriForPdf.body[i]];
     

      (doc as any).autoTable({
        head: chead,
        body: cbody,
    
      });
     }
      
     addCard();

    }

    // Open PDF document in new tab
    doc.output('dataurlnewwindow')
    // Download PDF document  
    //doc.save('table.pdf');
  }
}
