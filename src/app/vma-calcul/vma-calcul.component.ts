import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';



@Component({
  selector: 'app-vma-calcul',
  templateUrl: './vma-calcul.component.html',
  styleUrls: ['./vma-calcul.component.css']
})
export class VmaCalculComponent implements OnInit {
  input = new FormControl('', [Validators.required, Validators.min(0)])
  errorMessage() {
    if (this.input.hasError('required')) {
      return 'vous devez saisir une valeur'
    }
    if (this.input.hasError('min')) {
      return 'la valeur doit étre superieur à 0'
    }
    return ''
  }
  vma: number
  vo2max: number
  hidd: boolean = true
  tableauUrl:string = 'https://firebasestorage.googleapis.com/v0/b/vma-up.appspot.com/o/outils%2Ftableau-corresp.-paliers-VO2max.pdf?alt=media&token=c8f81705-c999-4dca-902c-9b4c202dc23d';
  navetUrl:string = 'https://firebasestorage.googleapis.com/v0/b/vma-up.appspot.com/o/outils%2Ftest-navette-bips.mp3?alt=media&token=861fee92-c777-40ee-9129-3f5b9ec8618b';
  vamEvalUrl:string = 'https://firebasestorage.googleapis.com/v0/b/vma-up.appspot.com/o/outils%2Fvameval-bips.mp3?alt=media&token=fbc86aed-0154-4e6d-938a-5c11e3aba7fe';

  constructor(private storage: AngularFireStorage) {}
  url;
  path;
  downloadUrl: Observable<any>;
  storageRef = this.storage.ref('');
  upload(file) {
    this.path = file.target.files[0];
  }
  uploadFile() {
    console.log(this.path);
    const filePath = 'outils/' + this.path.name;
    const file = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.path);
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadUrl = file.getDownloadURL();
        this.downloadUrl.subscribe(url => {
          if (url) {            
            this.url = url;
            console.log(this.url);

          }
        });
      })
    ).subscribe()


  }

  ngOnInit(): void {
  }

  hiddTogle() {
    this.hidd = false
  }
  resetVal() {
    this.vma = null
    this.vo2max = null

  }

  //cooper
  calculCooper(x) {
    this.vo2max = 22.35 * (x.value / 1000) - 11.288;
    this.vma = this.vo2max / 3.5;
  }
  //demi-cooper
  calculDemiCooper(x) {
    this.vma = x.value / 100;
    this.vo2max = this.vma * 3.5;
  }
  //ASTRAND
  calculAstrand(x) {
    this.vma = x.value * 17.143 / 1000
    this.vo2max = this.vma * 3.5;
  }
  //Vameval CAZORLA
  calculVameval(x) {
    this.vma = 8
    this.vma += x.value / 2
    this.vo2max = this.vma * 3.5;
  }
  //navette de Luc Léger
  calculNavette(x) {
    this.vma = 8
    this.vma += x.value / 2
    this.vo2max = this.vma * 3.5;
  }

  //download

  getDownloadURL() {

  }

  //--------

}
