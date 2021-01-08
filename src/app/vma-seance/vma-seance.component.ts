import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-vma-seance',
  templateUrl: './vma-seance.component.html',
  styleUrls: ['./vma-seance.component.css']
})

 
export class VmaSeanceComponent implements OnInit {
  seriForm = this.fb.group({
    percent: ['', Validators.required],
    vmaVal: ['', Validators.required],
    param: ['', Validators.required],
  })

  //seance objet
  volumeTotale
  plan= []
  cappacite = ['cappacitée',4000, 5000, 6000, 7000]
  puissance = ['puissance',2000, 2500, 3000, 4000]

  generer(f) {
   
    let seance={
      vma: 0,
      type: [],
      distance: 0,
      dure:0,
      niveau: 0,
      volume: 0,
      repetition: 0,
      recuperation: 30    
    }
    seance.vma = f.vmaVal
    //calculer l'effort
    if(this.time){
      seance.dure = f.param
      seance.distance = Math.floor(seance.dure * ((f.vmaVal * f.percent)/100 * 1000) / 3600)
    }
    else{
      seance.distance = f.param
      seance.dure = Math.floor(seance.distance / (((f.vmaVal * f.percent)/100 * 1000) / 3600))
    }
    //
    seance.type = (f.percent < 100) ?  this.cappacite : this.puissance;
    seance.niveau = f.vmaVal <= 5 ? 1 : f.vmaVal<=10 ? 2 : f.vmaVal<=15 ? 3 : 4
    seance.volume = seance.type[seance.niveau]
    seance.repetition = Math.floor(seance.volume/seance.distance )
    seance.volume = seance.type[seance.niveau] - (seance.volume % seance.distance)

    this.plan.push(seance)
    this.num++
    console.warn(seance)
    console.log(this.plan)
     
  
  }
  //--------------------------

  time: boolean = true
  inputype: string = ' seconds'
  num: number = 1
  min: number
  sec: number
  cardType: string
 

  constructor(private fb:FormBuilder ) { }

  ngOnInit(): void {

  }

  //fonction pour calculer la recuperation inter-repetition
  setRec(efort: number, type: string) {
    let result;
    if (type == 'm') {

      if (efort > 100) { result = 'cas de plus 100'; }
      else if (efort < 100) { result = 'cas de moins 100'; }
      else { result = 'egal a 100'; }

    }

    else {
      result = 'faut calculer rec avec le temps';
    }
    return result
  }

  togle() {
    this.time = !this.time
    this.time ? this.inputype = ' seconds' : this.inputype = ' métres'
  }

  submit(f) {
    if (this.inputype == ' métres' && f.param > 0) {
      f.mOrs = 'm'
      f.volumeSeri = parseInt(f.param, 10) * parseInt(f.rep, 10)
    }
    else if (this.inputype == ' seconds' && f.param > 0) {
      f.mOrs = 's'
      f.volumeSeri = ((parseInt(f.param, 10) * (parseInt(f.vmaVal, 10) * parseInt(f.percent, 10) / 100) / 3.6) * parseInt(f.rep, 10)).toFixed(2)
    }
    else { this.cardType = '' }

    this.volumeTotale += parseInt(f.volumeSeri, 10)
    this.seriForm.patchValue({
      rep: '',
      param: '',
      percent: '',
    })
  }
  renitialiser() {
    this.plan = []
    this.num = 1
  }
  delet(index: number) {
    this.volumeTotale = this.volumeTotale - parseInt(this.plan[index].volumeSeri, 10)
    this.plan.splice(index, 1)
    this.num--
  }
 

  //convertir les seconds en min et sec
  MyTime(STemps) {
    var result = "";
    // suppressions des chiffres après la virgule
    STemps = (Math.round(STemps * 10)) / 10;

    var MyMinut = (STemps - (STemps % 60)) / 60;
    if (MyMinut > 0) { result = result + MyMinut + " mn " };
    var MySecond = (Math.round((STemps % 60) * 10)) / 10;
    if (MySecond > 0) { result = result + MySecond + " s" };
    return result
  }

  // data pour le document PDF

  title = `Seance d'entrainment VMA`;

  convertoPdf() {
    let j = 1;
    this.plan.forEach(el => {
      console.log(el)

    })
    var doc = new jsPDF('portrait', 'px', 'a4');

    doc.setFontSize(20);
    doc.text(`Seance d'entrainment VMA`, doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });


    doc.setFontSize(11);
    doc.setTextColor(100);

    this.plan.forEach(element => {


      (doc as any).autoTable({
        margin: { top: 50 },

        theme: 'striped',
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
          0: { fontStyle: 'bold' },
          1: { halign: 'center' },
        },
        head: [['serie ' + j++, '']],

        body: [
          [{ content: `${element.percent} % ${element.vmaVal} Km/h   ( ${element.rep} X ${element.param} ${element.mOrs} )`, colSpan: 2, styles: { halign: 'center', fontSize: 13, fontStyle: 'bold' } }],
          ['Vitesse :', element.vmaVal * element.percent / 100 + " Km/h"],
          ['Volume de Travail :', element.rep * element.param],
          ['Récuperation :', this.MyTime(element.param * 2 / 3)]
        ],

      });
    })

    doc.setFontSize(15);
    doc.setTextColor(20);

    let finalY = (doc as any).lastAutoTable.finalY + 20; // The y position on the page
    doc.text(`Volume totale : ${this.volumeTotale} m`, doc.internal.pageSize.getWidth() / 2, finalY, { align: "center" })
    // Open PDF document in new tab
    doc.output('dataurlnewwindow')
    // Download PDF document  
    doc.save('séance-VMA.pdf');
  }



}