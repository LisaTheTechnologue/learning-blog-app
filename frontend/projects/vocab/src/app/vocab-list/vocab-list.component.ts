import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { map, filter } from 'rxjs/operators';
import { Vtype, Category, Vocab } from "../../../../_models/vocab";
import { VocabService } from "../../../../_services/vocab.service";
// import { PagerService } from "../../../../_services/pager.service";

@Component({
  selector: 'app-vocab-list',
  templateUrl: './vocab-list.component.html',
  styleUrls: ['./vocab-list.component.css']
})
export class VocabListComponent implements OnInit {
  vocabs: any = [];
  success: boolean = false;
  status: boolean = false;
  message: string = "";
  vtypes: Observable<Vtype[]>;
  categorys: Observable<Category[]>;
  totalitems: number = 0;
  totalpages: number = 0;
  config: any;
  public maxSize: number = 7;

  constructor(private vocabService: VocabService
  ) { }

  ngOnInit() {

    this.loadVocabsData();
  }

  loadVocabsData() {
    // this.vocabService.getAllVocabs().subscribe( 
    //   (data: {}) => {
    //     this.vocabs = data;

    // })
    this.vocabService.getAllVocabs().subscribe(
      data => {
        this.vocabs = data;
        this.totalitems = this.vocabs.length;
      },
      error => {
        this.message = "Failed. Error: " + error;
        this.success = false;
        this.status = true;
      }
    )
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalitems: this.totalitems
    };
  }
  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
  }
  onSearchChange(searchVocab) {
    this.vocabService.listFilter(searchVocab)
      .subscribe(
        data => {
          console.log("Searching " + searchVocab);
          this.vocabs = data;
        },
        error => {
          this.message = "Failed. Error: " + error;
          this.success = false;
          this.status = true;
        }
      )
  }
  deleteVocab(id) {
    this.vocabService.deleteVocab(id)
      .subscribe(
        data => {
          
          this.loadVocabsData();
          this.status=true;
          this.message= "Deleted successfully!";
          this.success = true;
        },
        error => {
          this.message = "Failed. Error: " + error;
          this.success = false;
          this.status = true;
      }
      )
  }

}
