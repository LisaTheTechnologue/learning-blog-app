import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Category} from "../../../../_models/vocab";
import { CategoryService } from "../../../../_services/category.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class CtgEditComponent implements OnInit {

  category: Category;
  
  categorys: any = [];
  category_id: number;
  success: boolean = false;
  status: boolean = false;
  message: string = "";

  constructor(
    
    private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              public router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.category_id = Number(params.get("id"));
      }
    );    
    this.loadCategoryData();    
  }  
  loadCategoryData(){
    this.categoryService.getCategory(this.category_id)
        .subscribe(
          data => {
            
            this.category = data;            
            console.log(this.category.id);
          },
          error => {
            this.message = "Failed. Error: " + error;
            this.success = false;
            this.status = true;
          }
        );
  }  
  updateCategory(){    
    this.categoryService.updateCategory(this.category_id,this.category)
        .subscribe(
          data => {
            this.category = data;
            this.success = true;
          },
          error => {
            this.message = "Failed. Error: " + error;
            this.success = false;
            this.status = true;
          }
        );
  }

  onSubmit(){
    this.category.is_draft=false;
    this.updateCategory();
  }
  onDraft(){
    this.category.is_draft=true;
    this.updateCategory();
  }
  onDiscard(){
    this.router.navigate(['/category/list'])
  }
}
