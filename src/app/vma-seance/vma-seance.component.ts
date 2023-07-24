import { MyTimePipe } from '../shared/pipes/my-time.pipe';
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
  suite:string = 'none'
  constructor() { }
  ngOnInit(): void {

  }
 
  seriForm = new FormGroup({
    percent: new FormControl('', Validators.required),
    vmaVal: new FormControl('', [Validators.required, Validators.min(1), Validators.max(30)]),
    param: new FormControl('', Validators.required),
    paramCn: new FormControl('',Validators.required)
  })
  //--declaration des variables
  time: boolean = false
  timeCn:boolean = true
  inputype: string = ' métres'
  inputypeCn:string = ' minuts'
  num: number = 1
  min: number
  sec: number
  cardType: string
  //--
  stype = {
    name: '',
    type:'',
    color: ''
  }
  plan = []
  longue = [3000, 4600, 5200, 5800, 7000]
  courte = [2000, 3500, 4000, 4500, 5000]
  moyenne = [2500, 3500, 4000, 4500, 6000]
  cr: boolean = false
  lg: boolean = false
  cn: boolean = false
//--------------------------
  seanceCourte() {
    this.stype.name = 'Effort intermittent Court-Court '
    this.stype.type = 'Court - Court'
    this.stype.color = 'crimson'
    this.cr = true
    this.cn = false
    this.lg = false
  }
  seanceLongue() {
    this.stype.name = 'Effort intermittent Long-Long '
    this.stype.type = 'Long - Long'
    this.stype.color = '#22bb33'
    this.cr = false
    this.cn = false
    this.lg = true
  }
  seanceContinue() {
    this.stype.name = 'Effort Continu '
    this.stype.type = 'Continu'
    this.stype.color = 'Magenta'
    this.cr = false
    this.cn = true
    this.lg = false
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
    if (this.seriForm.get('percent').hasError('required')) {
      return `vous devez choisir l'intensité de l'effort`;
    }
    return '';
  }
  effortErrorMessage() {
    if (this.seriForm.get('param').hasError('required')) {
      return 'vous devez saisir le volume de chaque répetition'
    }
  }
  effortContinuErrorMessage() {
    if (this.seriForm.get('paramCn').hasError('required')) {
      return `vous devez saisir le volume de l'effort`
    }
  }
  // controler le type par la distance de course

  effortControleMessage() {
    if (this.time) {
      if (this.cr && (this.seriForm.get('param').value > 75 || this.seriForm.get('param').value < 15)) {
        return `NB : pour votre VMA ${this.seriForm.get('vmaVal').value}km/h dans l'intermittent Court-Court
         l'effort doit etre entre 15 s ( ${Math.floor(15 * ((this.seriForm.get('vmaVal').value * this.seriForm.get('percent').value) / 100 * 1000) / 3600)} m ) et 1 min 15 s ( ${Math.floor(75 * ((this.seriForm.get('vmaVal').value * this.seriForm.get('percent').value) / 100 * 1000) / 3600)} m ) pour chaque répetition`;
      }
      else if (this.lg && (this.seriForm.get('param').value < 76 || this.seriForm.get('param').value > 240)) {
        return `NB : pour votre VMA ${this.seriForm.get('vmaVal').value}km/h dans l'intermittent Long-Long
         l'effort doit etre entre 1 min 15 s ( ${Math.floor(75 * ((this.seriForm.get('vmaVal').value * this.seriForm.get('percent').value) / 100 * 1000) / 3600)} m ) et 4 min ( ${Math.floor(240 * ((this.seriForm.get('vmaVal').value * this.seriForm.get('percent').value) / 100 * 1000) / 3600)} m ) pour chaque répetition`;
      }
     
      return ''
    }
    else {
      if (this.cr && (this.seriForm.get('param').value > Math.floor(75 * ((this.seriForm.get('vmaVal').value * this.seriForm.get('percent').value) / 100 * 1000) / 3600) || this.seriForm.get('param').value < Math.floor(15 * ((this.seriForm.get('vmaVal').value * this.seriForm.get('percent').value) / 100 * 1000) / 3600))) {
        return `NB : pour votre VMA ${this.seriForm.get('vmaVal').value}km/h dans l'intermittent Court-Court
         l'effort doit etre entre 15 s ( ${Math.floor(15 * ((this.seriForm.get('vmaVal').value * this.seriForm.get('percent').value) / 100 * 1000) / 3600)} m ) et 1' 15" ( ${Math.floor(75 * ((this.seriForm.get('vmaVal').value * this.seriForm.get('percent').value) / 100 * 1000) / 3600)} m ) pour chaque répetition`;
      }
      else if (this.lg && (this.seriForm.get('param').value < Math.floor(75 * ((this.seriForm.get('vmaVal').value * this.seriForm.get('percent').value) / 100 * 1000) / 3600) || this.seriForm.get('param').value > Math.floor(240 * ((this.seriForm.get('vmaVal').value * this.seriForm.get('percent').value) / 100 * 1000) / 3600))) {
        return `NB : pour votre VMA ${this.seriForm.get('vmaVal').value}km/h dans l'intermittent Long-Long
        l'effort doit etre entre 1 min 15 s ( ${Math.floor(75 * ((this.seriForm.get('vmaVal').value * this.seriForm.get('percent').value) / 100 * 1000) / 3600)} m ) et 4 min ( ${Math.floor(240 * ((this.seriForm.get('vmaVal').value * this.seriForm.get('percent').value) / 100 * 1000) / 3600)} m ) pour chaque répetition`;
      }
     
      return ''
    }

  }
  effortControleCnMessage() {
   
      if (this.timeCn && this.seriForm.get('paramCn').value < 10 ) {
        return `NB : pour votre VMA ${this.seriForm.get('vmaVal').value}km/h dans la séance de type Continu
         l'effort doit etre supérieur à 10 min ( ${Math.floor(600 * ((this.seriForm.get('vmaVal').value * this.seriForm.get('percent').value) / 100 * 1000) / 3600)} m )`
      }
      
      else if (!this.timeCn && this.seriForm.get('paramCn').value < Math.floor(600 * ((this.seriForm.get('vmaVal').value * this.seriForm.get('percent').value) / 100 * 1000) / 3600)) {
        return `NB : pour votre VMA ${this.seriForm.get('vmaVal').value}km/h dans la séance de type Continu
        l'effort doit etre supérieur à 10 min ( ${Math.floor(600 * ((this.seriForm.get('vmaVal').value * this.seriForm.get('percent').value) / 100 * 1000) / 3600)} m ) .`;
      }
     
      return ''
  }



  //
  //seance objet
  generer(f) {
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
    seance.type = this.stype.type
    seance.vma = f.vmaVal
    seance.per = f.percent
    seance.typeArr = (f.percent < 100) ? this.longue : (f.percent < 110) ? this.moyenne : this.courte;

    //calculer l'effort
    if (this.time && !this.cn) {
      seance.dure = this.cn? f.paramCn * 60 : f.param
      seance.distance = Math.floor(seance.dure * ((f.vmaVal * f.percent) / 100 * 1000) / 3600)
    }
    else if(!this.time && !this.cn) {
      seance.distance = this.cn? f.paramCn : f.param 
      seance.dure = (Math.floor(seance.distance / (((f.vmaVal * f.percent) / 100 * 1000) / 3600)))
    }
    if (this.timeCn && this.cn) {
      seance.dure = f.paramCn * 60
      seance.distance = Math.floor(seance.dure * ((f.vmaVal * f.percent) / 100 * 1000) / 3600)
    }
    else if(!this.timeCn && this.cn){
      seance.distance = f.paramCn
      seance.dure = (Math.floor(seance.distance / (((f.vmaVal * f.percent) / 100 * 1000) / 3600)))
    }

    //niveau et volume de seance
    seance.niveau = f.vmaVal <= 5 ? 1 : f.vmaVal <= 10 ? 2 : f.vmaVal <= 15 ? 3 : f.vmaVal <= 20 ? 4 : 5;
    seance.volume = seance.typeArr[seance.niveau - 1]

    //calculer NB de serie
    const serieCalcul = (t, n) => {
      if (t <= 100) {
        (n == 1) ? seance.serie = 2 :
          (n == 2) ? seance.serie = 2 :
            (n == 3) ? seance.serie = 2 :
              (n == 4) ? seance.serie = 2 :
                seance.serie = 3
      } else {
        (n == 1) ? seance.serie = 4 :
          (n == 2) ? seance.serie = 3 :
            (n == 3) ? seance.serie = 3 :
              (n == 4) ? seance.serie = 3 :
                seance.serie = 4
      }
     
    }

    serieCalcul(seance.per, seance.niveau);
    //------------
    // Repetition pour chaque serie depend du volume de travail 
    seance.repetition = Math.floor((seance.volume / seance.distance) / seance.serie)
    //Update volume de travail 
    seance.volume = seance.serie * (seance.repetition * seance.distance)
    seance.volumeTemps = seance.serie * (seance.repetition * seance.dure)
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

  togle() {
    this.time = !this.time
    if(this.time) {
    this.inputype = ' seconds'
    } 
    else {
      this.inputype = ' métres'
    }
   
  }
  togleCn(){
    this.timeCn = !this.timeCn
    if(this.timeCn) {
    this.inputypeCn = ' minuts'
    } 
    else {
      this.inputypeCn = ' métres'
    }

  }

  renitialiser() {
    this.plan = []
    this.num = 1
  }
  delet(index: number) {
    this.plan.splice(index, 1)
    this.num--
  }
  hoursMinuts(value: number): string {
    let result = "";
    // suppressions des chiffres après la virgule
    value = (Math.round(value * 10)) / 10;

    let MyHours = (value - (value % 60)) / 60;
    if (MyHours > 0) { result = result + MyHours + ` h ` };
    let MyMinuts = (Math.round((value % 60) * 10)) / 10;
    if (MyMinuts > 0) { result = result + MyMinuts.toFixed(0) + ` min` };
    return result  
  }

  // data pour le document PDF
  convertoPdf() {
    var doc = new jsPDF('portrait', 'px', 'a4');
    //
    let footer = doc.internal.pageSize.getHeight() - 10

    //property
    doc.setProperties({
      title: `Plan d'entrainement`,
      subject: 'This is the subject',
      author: 'Ahmed Mabrouki',
      keywords: 'eps, vma, sport, runing',
      creator: 'MEEE'
    });
   
    let j = 1;
    const head = [];
    const body = (element)=> {
      if(element.type !== 'Continu'){
        return [
      [`Vitesse :  ${element.vma * element.per / 100}  Km/h`, '', {content:`${element.per}% de la VMA ( ${element.vma} km/h )`,styles: { halign: 'center'}},''],
      [{ content: `${element.serie} X (  ${element.repetition} X ${element.distance}m ( ${MyTimePipe.prototype.transform(element.dure)})  )`,colSpan: 4 ,styles: { halign: 'center' , fontSize: 16, fontStyle: 'bold', padding: 2}}],
      [ `Récupération : ${MyTimePipe.prototype.transform(element.recuperation)}`,'','','Récupération/series : 3\'' ],
      [{content:`Volume de Travail : ${element.volume} m   ( ${MyTimePipe.prototype.transform(element.volumeTemps)} )`, colSpan: 4,styles: { halign: 'center'}}],


    ]}
    else if (element.type == 'Continu') {
      return [
        [`Vitesse :  ${element.vma * element.per / 100}  Km/h`, '', {content:`${element.per}% de la VMA ( ${element.vma} km/h )`,styles: { halign: 'center'}},''],
        [{ content: `Footing de ${element.distance}m ( ${MyTimePipe.prototype.transform(element.dure)} )`, colSpan: 4, styles: { halign: 'center', fontSize: 16, fontStyle: 'bold', padding: 2 } 
      }],
      [{content:'',colSpan: 4}]
      ]
    }
    return '';
  };
    this.plan.forEach(el => {

    })
    doc.setTextColor(30);
    doc.setFontSize(12);

  
    doc.setFontSize(24);
    doc.setTextColor(7, 70, 139);
    doc.text(`Plan d'entrainment`, doc.internal.pageSize.getWidth() / 2, 30, { align: "center" });

    doc.setFontSize(11);
    doc.setTextColor(100);
    this.plan.forEach(element => {


      (doc as any).autoTable({
        margin: { top: 70 },

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
          padding: 2,
        },
        columnStyles: {
          0: { fontStyle: 'bold' },
          1: { halign: 'center' },
        },
        head: [['Séance ' + j++, '', { content: `${element.type}`, styles: { fontSize: 13, halign: 'center', fontStyle: 'none' } }, '']],

        body: body(element),

      });
    })

    //signature
    doc.setTextColor(120);
    doc.line(30, footer - 15, 420, footer - 15); // horizontal line
    doc.text('vmaup.com', 30, footer)
    // Open PDF document in new tab
    doc.output('dataurlnewwindow')
    // Download PDF document  
    doc.save('séance-VMA.pdf');
  }



}