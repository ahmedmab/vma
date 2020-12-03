import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
recuperation
min:number
sec:number
seriGrp:any[]=[]
cardType:string
 mOrS:any[]= []
 volumeTotale:number=0
 



  constructor() { }

  ngOnInit(): void {

  }
 
  setRec(efort:number, type:string){
    let result;
    if (type == 'm') {
      
        if (efort > 100){result = 'cas de plus 100';}
        else if (efort < 100){result = 'cas de moins 100';}
        else {result = 'egal a 100';}
          
      }
    
    else {
      result = 'faut calculer rec avec le temps';
    }
    return result
  }

  togle(){
    this.avec = !this.avec
    this.avec ? this.inputype = ' seconds' : this.inputype = ' métres'
  }
 
  submit(f){
    this.seriGrp.push(f)
    this.inputype == ' métres' && f.param>0 ? this.cardType = 'm' : this.inputype == ' seconds' && f.param>0 ? this.cardType = 's': this.cardType = ''
    this.mOrS.push(this.cardType)
    this.num++
    this.volumeTotale += parseInt(this.seriGrp[this.num-2].param, 10) * parseInt(this.seriGrp[this.num-2].rep, 10)
    
    console.warn(typeof(this.seriGrp[this.num-2].rep))
    console.warn(typeof(parseInt(this.seriGrp[this.num-2].param, 10)))
    console.warn(this.volumeTotale)

  }
  renitialiser(){
    this.seriGrp = []
    this.num = 1
  }
  delet(index){
this.seriGrp.splice(index,1)
console.log(this.seriGrp)
this.num --

  }
  //convertir les seconds en min et sec
  MyTime(STemps) {
    var result = "";
    // suppressions des chiffres après la virgule
    STemps = (Math.round(STemps * 10) )/ 10;
  
    var MyMinut = (STemps - ( STemps % 60) ) / 60;
    if (MyMinut > 0) {result = result + MyMinut + " mn " };
    var MySecond = (Math.round((STemps % 60)*10)) / 10 ;
    if (MySecond > 0) {result = result + MySecond + " s" };
    return result }

     // data pour le document PDF

  title = `Seance d'entrainment VMA`;

  convertoPdf(){
    let j=1;
    this.seriGrp.forEach(el=>{
      console.log(el)

    })
    var doc = new jsPDF('portrait', 'px', 'a4');

    doc.setFontSize(20);
    doc.text(`Seance d'entrainment VMA`, doc.internal.pageSize.getWidth()/2, 20, {align:"center"});

    doc.setFontSize(11);
    doc.setTextColor(100);

    this.seriGrp.forEach(element =>{
    
     
      (doc as any).autoTable({
        margin: {top: 50},
               
        theme : 'striped',
        styles: {
          fontSize: 10,
          font: 'helvetica',
          cellPadding: 2,
          minCellHeight: 2,
      },
      
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 10],
        fontSize: 18,
        fontStyle: 'italic',
        padding: 0,
    },
    columnStyles: {
      0: {fontStyle: 'bold'},
      1: {halign: 'center'},
    },
        head: [['serie '+ j++, '']],
  
        body: [
               [{ content: element.percent + " %" +" "+ element.vmaVal + " Km/h", colSpan: 2, styles: { halign: 'center',fontSize: 13, fontStyle: 'bold'} }],
               ['Vitesse :', element.vmaVal*element.percent/100 + " Km/h"],
               ['Volume de Travail :', element.rep*element.param],
               ['Récuperation :', this.MyTime(element.param*2/3)]
              ],
  
         });
      })

      doc.setFontSize(15);
      doc.setTextColor(20);

    let finalY = (doc as any).lastAutoTable.finalY + 20; // The y position on the page
    doc.text(`Volume totale : ${this.volumeTotale}`, doc.internal.pageSize.getWidth()/2, finalY, {align:"center"})
    // Open PDF document in new tab
    doc.output('dataurlnewwindow')
    // Download PDF document  
    doc.save('séance-VMA.pdf');
    }

   
  
}