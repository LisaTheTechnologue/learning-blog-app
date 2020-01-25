import { Component, OnInit } from '@angular/core';
import { Category } from "../../../../_models/vocab";
import { CategoryService } from "../../../../_services/category.service";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CtgCreateComponent implements OnInit {
  category: Category = new Category();
  success: boolean = false;
  status: boolean = false;
  message: string = "";
  constructor(
    private ctgService: CategoryService,
    public router: Router) { }

  ngOnInit() {
  }
  saveCategory() {
    this.ctgService.createCategory(this.category).subscribe((data: {}) => {

      // this.router.navigate(['/vocab'])
      this.message = "Successfully added " + this.category.category_abrev;
      this.success = false;
      this.status = true;
    },
      error => {
        this.message = "Failed. " + error;
        this.success = false;
        this.status = true;
      })
  }
  onSubmit() {
    this.category.is_draft = false;
    this.saveCategory();
  }
  onDraft() {
    this.category.is_draft = true;
    this.saveCategory();
  }
  onDiscard() {
    this.router.navigate(['/category/list'])
  }
}
