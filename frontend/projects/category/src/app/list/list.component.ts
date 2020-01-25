import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Category} from "../../../../_models/vocab";
import { CategoryService } from "../../../../_services/category.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class CtgListComponent implements OnInit {
 
  success: boolean = false;
  status: boolean = false;
  message: string = "";  
  categorys: any = [];
  totalitems: number =0 ;
  public maxSize: number = 7;
  config: any;
  constructor(private ctgService: CategoryService) { }
  
  ngOnInit() {    
    this.loadCategorysData();       
  }
   
  
  loadCategorysData(){
    this.ctgService.getAllCategorys().subscribe(data => {
      this.categorys = data;
      this.totalitems = this.categorys.length;
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
  pageChanged(event){
    console.log(event);
    this.config.currentPage = event;
  }

  onSearchChange(searchVocab) {
    this.ctgService.listFilter(searchVocab)
        .subscribe(
          data => {
            console.log("Searching " +searchVocab)
            this.categorys = data
          },
          error => {
            this.message = "Failed. Error: " + error;
            this.success = false;
            this.status = true;
          }
        )
  }
  deleteCategory(id){
    this.ctgService.deleteCategory(id)
        .subscribe(
          data => {
            
            this.loadCategorysData();
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
