import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Vocab, Vtype, Category, PostVocab } from "../../../../_models/vocab";
import { VocabService } from "../../../../_services/vocab.service";
import { ActivatedRoute, Router } from "@angular/router";
import { VtypeService } from '../../../../_services/vtype.service';
import { CategoryService } from '../../../../_services/category.service';

@Component({
  selector: 'app-vocab-edit',
  templateUrl: './vocab-edit.component.html',
  styleUrls: ['./vocab-edit.component.css']
})
export class VocabEditComponent implements OnInit {

  vocab: Vocab;
  vtypes: any = [];
  categorys: any = [];
  vocab_id: number;
  success: boolean = false;
  status: boolean = false;
  message: string = "";
  txtValue:string = null;
  constructor(private vocabService: VocabService,
    private vtypeService: VtypeService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    public router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.vocab_id = Number(params.get("id"));
      }
    );
    this.loadVocabData();
    this.loadVtypesData();
    this.loadCategorysData();

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
  loadVocabData() {
    this.vocabService.getVocab(this.vocab_id)
      .subscribe(
        data => {
          this.vocab = data;
        },
        error => {
          this.message = "Failed. Error: " + error;
          this.success = false;
          this.status = true;
        }
      );
  }
  onChangeC(deviceValue1) {
    console.log(deviceValue1);
    this.vocab.category = deviceValue1;
  }
  onChangeT(deviceValue) {
    console.log(deviceValue);
    this.vocab.vtype = deviceValue;
  }
  onTextChange(value)
  {
    this.txtValue = value;
    if(this.txtValue == '')
    {
      this.message="Missing data. Please try again!";
      this.success = false;
      this.status = true;
    }
    
  }
  updateVocab() {
    this.vocabService.updateVocab(this.vocab_id, this.vocab)
      .subscribe(
        data => {
          this.vocab = data;
          this.success = true;
        },
        error => {
          this.message = "Failed. Error: " + error;
          this.success = false;
          this.status = true;
        }
      );
  }

  onSubmit() {
    this.updateVocab();
  }
  onDraft(){
    this.vocab.is_draft=true;
    this.onSubmit();
  }
  onDiscard(){
    this.router.navigate(['/vocab/list'])
  }
}
