import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { map, filter } from 'rxjs/operators';
import { LNote } from "../../../../_models/note";
import { NoteService } from "../../../../_services/lnote.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-english-list',
  templateUrl: './english-list.component.html',
  styleUrls: ['./english-list.component.css']
})
export class EnglishListComponent implements OnInit {
  englishs: any = [];
  success: boolean = false;
  status: boolean = false;
  message: string = "";
  
  totalitems: number = 0;
  totalpages: number = 0;
  config: any;
  public maxSize: number = 7;

  constructor(private noteService: NoteService
  ) { }

  ngOnInit() {

    this.loadNotesData();
  }

  loadNotesData() {
    // this.noteService.getAllNotes().subscribe( 
    //   (data: {}) => {
    //     this.notes = data;

    // })
    this.noteService.getAllEnglishs().subscribe(
      data => {
        this.englishs = data;
        this.totalitems = this.englishs.length;
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
  onSearchChange(searchenglish) {
    this.noteService.listFilterEnglish(searchenglish)
      .subscribe(
        data => {
          console.log("Searching " + searchenglish);
          this.englishs = data;
          this.totalitems = this.englishs.length;
        },
        error => {
          this.message = "Failed. Error: " + error;
          this.success = false;
          this.status = true;
        }
      )
  }
  deleteNote(id) {
    this.noteService.deleteNote(id)
      .subscribe(
        data => {
          
          this.loadNotesData();
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
