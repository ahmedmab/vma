import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-vma-trainer',
  templateUrl: './vma-trainer.component.html',
  styleUrls: ['./vma-trainer.component.css']
})
export class VmaTrainerComponent implements OnInit {
  suite:string = 'none'
  constructor() {

  }
  ngOnInit(): void {

  }
  
  vma = new FormControl('', [Validators.required, Validators.min(1)])
  getErrorMessage() {
    if (this.vma.hasError('required')) {
      return 'vous devez saisir une valeur';
    }
    else if (this.vma.hasError('min')) {
      return 'la valeur de VMA doit etre supérieur a 0';
    }

    return '';
  }
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
  vma_30s: number
  vma_100
  second
  minut
  metre
  //...
  tab: string = '#tab1'


  clear() {
    return this.vma.reset()
  }

   replaceComma(str:string){
     return str!== null ?  str.replace(/,/g, "") : ''
     }
     
  calcul() {
    let vma = this.vma.value
    this.second = ' s'
    this.minut = ' min'
    this.metre = ' m'
    this.vma_ms = vma * 1000 / 3600
    this.vma_30s = this.vma_ms
    this.vma_100 = 100 / this.vma_ms
    this.vma65 = (vma * 65) / 100 + " km/h"
    this.vma70 = (vma * 70) / 100 + " km/h"
    this.vma75 = (vma * 75) / 100 + " km/h"
    this.vma80 = (vma * 80) / 100 + " km/h"
    this.vma85 = (vma * 85) / 100 + " km/h"
    this.vma90 = (vma * 90) / 100 + " km/h"
    this.vma95 = (vma * 95) / 100 + " km/h"
    this.vma100 = vma + " km/h"
    this.vma105 = (vma * 105) / 100 + " km/h"
    this.vma110 = (vma * 110) / 100 + " km/h"
    this.vma115 = (vma * 115) / 100 + " km/h"
    
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    tabChangeEvent.index == 0 ? this.tab = '#tab1' : this.tab = '#tab2'
  }
  toPdf() {
    var doc = new jsPDF('l', 'px', 'a4');
    let typeTable: string
    let centerX = doc.internal.pageSize.getWidth() / 2
    let footer = doc.internal.pageSize.getHeight() - 10

    this.tab == '#tab1' ? typeTable = 'temps' : typeTable = 'distance'
    //property
    doc.setProperties({
      title: `tableau d'allure de course`,
      subject: 'This is the subject',
      author: 'Ahmed Mabrouki',
      keywords: 'eps, vma, sport, runing',
      creator: 'MEEE'
    });
    doc.setTextColor(50);
    doc.setFontSize(16);
    doc.text(`VMA: ${this.vma.value} km/h`, 30, 62);
    doc.setTextColor(20);
    doc.setFontSize(25);
    doc.setFont("helvetica", "bold");
    doc.text(`Allure de course par ${typeTable}`, centerX, 60, { align: "center" });
    (doc as any).autoTable({
      html: this.tab,
      startY: 80,
      columnStyles: {
        0: {
          fontStyle: 'bold',
        }},

    })
    doc.setFont('sans-serif', 'none')
    doc.setTextColor(120);
    doc.line(30, footer - 15, 600, footer - 15); // horizontal line
    doc.text('vmaup.com', 30, footer)
    // Open PDF document in new tab
    doc.output('dataurlnewwindow')
    // Download PDF document  
    doc.save('tableau-allures.pdf')
  }

}
