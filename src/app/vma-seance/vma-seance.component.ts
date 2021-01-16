import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-vma-seance',
  templateUrl: './vma-seance.component.html',
  styleUrls: ['./vma-seance.component.css']
})


export class VmaSeanceComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {

  }
  seriForm = new FormGroup({
    percent: new FormControl('', Validators.required),
    vmaVal: new FormControl('', [Validators.required, Validators.min(1), Validators.max(29)]),
    param: new FormControl('', Validators.required)
  })
  stype = {
    name: '',
    color: ''
  }
  volumeTotale
  plan = []
  longue = [4000, 4600, 5200, 5800, 7000]
  courte = [3000, 3500, 4000, 4500, 5000]
  moyenne = [3000, 3500, 4000, 4500, 6000]
  cr: boolean = true
  my: boolean = true
  lg: boolean = true

  seanceCourte() {
    this.stype.name = 'Courte '
    this.stype.color = '#ef4f4f'
    this.cr = true
    this.my = false
    this.lg = false
  }
  seanceMoyenne() {
    this.stype.name = 'Moyenne '
    this.stype.color = 'Magenta'
    this.cr = false
    this.my = true
    this.lg = false
  }
  seanceLongue() {
    this.stype.name = 'Longue '
    this.stype.color = '#22bb33'
    this.cr = false
    this.my = false
    this.lg = true
  }

  vmaErrorMessage() {
    if (this.seriForm.get('vmaVal').hasError('required')) {
      return 'vous devez saisir une valeur';
    }
    else if (this.seriForm.get('vmaVal').hasError('min')) {
      return 'la valeur de VMA doit etre supérieur a 0';
    }
    else if (this.seriForm.get('vmaVal').hasError('max')) {
      return 'la valeur de votre vma est erronée';
    }
    return ''
  }
  percentErrorMessage() {
    if (this.seriForm.get('percent').hasError('required') && this.seriForm.get('percent').value !== 'allure') {
      return `vous devez choisir l'intensité de l'effort`;
    }
    return '';
  }
  // controler le type par la distance de course
  effortErrorMessage() {
    if (this.seriForm.get('param').hasError('required')) {
      return 'vous devez saisir le volume de chaque répetition'
    } else {
      if (this.stype.name == 'Courte ' && this.seriForm.get('param').value > 76) {
        return `Conseil du Coach : pour votre VMA: ${this.seriForm.get('vmaVal').value} dans la séance de VMA Courte
         l'effort doit etre entre 15" ou ${Math.floor(15 * ((this.seriForm.get('vmaVal').value * this.seriForm.get('percent').value) / 100 * 1000) / 3600)} m et 1' 15" ou ${Math.floor(75 * ((this.seriForm.get('vmaVal').value * this.seriForm.get('percent').value) / 100 * 1000) / 3600)} m pour chaque répetition`;
      }
      else if (this.stype.name == 'Moyenne ' && (this.seriForm.get('param').value < 76 || this.seriForm.get('param').value > 150) ) {
        return `Conseil du Coach : pour votre VMA: ${this.seriForm.get('vmaVal').value} dans la séance de VMA Moyenne
         l'effort l'effort doit etre entre 1' 15" ou ${Math.floor(150 * ((this.seriForm.get('vmaVal').value * this.seriForm.get('percent').value) / 100 * 1000) / 3600)} m  et 2' 30" ou ${Math.floor(240 * ((this.seriForm.get('vmaVal').value * this.seriForm.get('percent').value) / 100 * 1000) / 3600)} m pour chaque répetition`;
      }
      else if (this.stype.name == 'Longue ' && this.seriForm.get('param').value < 150) {
        return `Conseil du Coach : pour votre VMA: ${this.seriForm.get('vmaVal').value} dans la séance de VMA Longue
         l'effort l'effort doit etre entre 2' 30" ou ${Math.floor(150 * ((this.seriForm.get('vmaVal').value * this.seriForm.get('percent').value) / 100 * 1000) / 3600)} m  et 4' ou ${Math.floor(240 * ((this.seriForm.get('vmaVal').value * this.seriForm.get('percent').value) / 100 * 1000) / 3600)} m pour chaque répetition`;
      }
      return ''
    }

  }


  //
  //seance objet
  generer(f) {
    console.log(this.seriForm)
    let seance = {
      vma: 0,
      type: '',
      typeArr: [],
      distance: 0,
      dure: 0,
      niveau: 0,
      volume: 0,
      volumeTemps: 0,
      serie: 0,
      repetition: 0,
      per: 0,
      recuperation: 30
    }
    seance.type = this.stype.name
    seance.vma = f.vmaVal
    seance.per = f.percent
    seance.typeArr = (f.percent < 100) ? this.longue : (f.percent < 110) ? this.moyenne : this.courte;

    //calculer l'effort
    if (this.time) {
      seance.dure = f.param
      seance.distance = Math.floor(seance.dure * ((f.vmaVal * f.percent) / 100 * 1000) / 3600)
    }
    else {
      seance.distance = f.param
      seance.dure = (Math.floor(seance.distance / (((f.vmaVal * f.percent) / 100 * 1000) / 3600)))
    }

    //niveau et volume de seance
    seance.niveau = f.vmaVal <= 5 ? 1 : f.vmaVal <= 10 ? 2 : f.vmaVal <= 15 ? 3 : f.vmaVal <= 20 ? 4 : 5;
    seance.volume = seance.typeArr[seance.niveau - 1]

    //calculer NB de serie
    const serieCalcul = (t, n) => {
      if (t < 100) {
        (n == 1) ? seance.serie = 1 :
          (n == 2) ? seance.serie = 1 :
            (n == 3) ? seance.serie = 2 :
              (n == 4) ? seance.serie = 2 :
                seance.serie = 3
      } else if (t < 110) {
        (n == 1) ? seance.serie = 1 :
          (n == 2) ? seance.serie = 2 :
            (n == 3) ? seance.serie = 3 :
              (n == 4) ? seance.serie = 3 :
                seance.serie = 4
      }
      else {
        (n == 1) ? seance.serie = 2 :
          (n == 2) ? seance.serie = 2 :
            (n == 3) ? seance.serie = 3 :
              (n == 4) ? seance.serie = 3 :
                seance.serie = 4
      }
    }

    serieCalcul(seance.per, seance.niveau);
    //------------
    // Repetition pour chaque serie depend du volume de travail 
    seance.repetition = Math.floor((seance.volume / seance.distance) / seance.serie)
    let restRepetition: number = Math.floor(seance.volume / seance.distance) % seance.serie

    //-----
    seance.volume = seance.typeArr[seance.niveau - 1] - (seance.volume % seance.distance)
    seance.volumeTemps = Math.floor(seance.volume / (((f.vmaVal * f.percent) / 100 * 1000) / 3600))

    //calculer Recuperation
    if (seance.dure <= 60) {
      seance.recuperation = seance.dure - (seance.dure % 5)
    } else if (seance.dure > 60 && seance.dure <= 120) {
      seance.recuperation = 60
    }
    else if (seance.dure > 120 && seance.dure <= 180) {
      seance.niveau >= 3 ? seance.recuperation = 75 : seance.recuperation = 90

    }
    else {
      seance.niveau >= 3 ? seance.recuperation = 90 : seance.recuperation = 105

    }

    this.plan.push(seance)
    this.num++


  }

  //------------------------

  time: boolean = false
  inputype: string = ' métres'
  num: number = 1
  min: number
  sec: number
  cardType: string


  togle() {
    this.time = !this.time
    this.time ? this.inputype = ' seconds' : this.inputype = ' métres'
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
    if (MyMinut > 0) { result = result + MyMinut + ` ' ` };
    var MySecond = (Math.round((STemps % 60) * 10)) / 10;
    if (MySecond > 0) { result = result + MySecond + ` " ` };
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

    doc.setFontSize(24);
    doc.setTextColor(7, 70, 139);
    doc.text(`Plan d'entrainment`, doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });

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
        head: [['Séance ' + j++, `Type : ${element.type}`]],

        body: [
          [{ content: `${element.serie} X (  ${element.repetition} X ${element.distance}m ( ${this.MyTime(element.dure)})  )`, colSpan: 2, styles: { halign: 'center', fontSize: 13, fontStyle: 'bold' } }],
          ['Vitesse :', `${element.vma * element.per / 100}  Km/h ${element.per}% de la VMA ( ${element.vma} km/h )`],
          ['Récuperation :', this.MyTime(element.recuperation)],
          ['Volume de Travail :', `${element.volume} m   ( ${this.MyTime(element.volumeTemps)} )`]

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