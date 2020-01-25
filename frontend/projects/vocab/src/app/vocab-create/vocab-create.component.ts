import { Component, OnInit, Input } from '@angular/core';
import { PostVocab, Vtype, Category } from "../../../../_models/vocab";
import { VocabService } from "../../../../_services/vocab.service";
import { CategoryService } from "../../../../_services/category.service";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { VtypeService } from '../../../../_services/vtype.service';
@Component({
  selector: 'app-vocab-create',
  templateUrl: './vocab-create.component.html',
  styleUrls: ['./vocab-create.component.css']
})
export class VocabCreateComponent implements OnInit {
  success: boolean = false;
  status: boolean = false;
  message: string = "";
  categorys: any = [];
  vtypes: any = [];
  vocabs: any = [];
  vocab: PostVocab = new PostVocab();
  vtypeid: Number;
  categoryid: Number;
  // formattedResult;
  txtValue: string = null;
  //@Input() vocabDetails = { french: '', english: '', vtype: 0, category: 0, pronunciation: '', note:'',example:''}
  constructor(
    public vocabService: VocabService,
    public vtypeService: VtypeService,
    public categoryService: CategoryService,
    public router: Router) { }

  ngOnInit() {
    // this.new_vocab = {}
    this.vocab.category = 1;
    this.vocab.vtype = 1;
    this.loadVtypesData();
    this.loadCategorysData();
  }
  onChangeC(deviceValue1) {
    // console.log(deviceValue1);
    this.vocab.category = deviceValue1;
  }
  onChangeT(deviceValue) {
    // console.log(deviceValue);
    this.vocab.vtype = deviceValue;
  }
  loadVtypesData() {
    this.vtypeService.getAllVtypes().subscribe((data: {}) => {
      this.vtypes = data;
    })
  }
  loadCategorysData() {
    this.categoryService.getAllCategorys().subscribe((data: {}) => {
      this.categorys = data;
    })
  }
  onSubmit() {
    this.isValidated();
    this.saveVocab();
  }
  isValidated() {    
     if (     
       !this.vocab.french || !this.vocab.pronunciation  || !this.vocab.english ||
       !this.vocab.note || !this.vocab.example || !this.vocab.category || !this.vocab.vtype ){        
      this.message = "Missing data. Please try again!";
      this.success = false;
      this.status = true;
    }
    else this.success = true;
  }  
  saveVocab() {
    if (this.success == true) {
      this.vocabService.createVocab(this.vocab).subscribe((data: {}) => {
        // this.router.navigate(['/vocab'])
        this.message = "Successfully added " + this.vocab.french;
          this.success = false;
          this.status = true;
      },
        error => {
          this.message = "Failed. " + error;
          this.success = false;
          this.status = true;
        }
      )
    }
  }
  onDraft(){
    this.vocab.is_draft=true;
    this.onSubmit();
  }
  onDiscard(){
    this.router.navigate(['/vocab/list'])
  }
  
}
