import { Component, OnInit } from '@angular/core';
import { LNote } from "../../../../_models/note";
import { NoteService } from "../../../../_services/lnote.service";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {
  success: boolean = false;
  status: boolean = false;
  message: string = "";
  note: LNote ;
  note_id:number;
  // formattedResult;
  txtValue: string = null;
  ddlanguage;
  constructor(private lnoteService: NoteService,
    private activatedRoute: ActivatedRoute,
    public router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.note_id = Number(params.get("id"));
      }
    );
    this.message = "";
    this.loadNoteData();
    this.ddlanguage = this.note.language;
  }
  loadNoteData() {
    this.lnoteService.getNote(this.note_id)
      .subscribe(
        data => {
          this.note = data;
        },
        error => {
          this.message = "Failed. Error: " + error;
          this.success = false;
          this.status = true;
        }
      );
  }
  onChangeT(deviceValue) {
    console.log(deviceValue);
    
    this.note.language = deviceValue;
  }
  onReset(){
    this.message = "";
    this.loadNoteData();
    this.ddlanguage = this.note.language;
  }
 
  onSubmit() {
    this.isValidated();
    this.updateNote();
  }
  isValidated() {
    if (
      !this.note.title || !this.note.desc || !this.note.created_on ||
      !this.note.language) {
        console.log(this.note.title +this.note.desc +this.note.created_on 
          + this.note.language)
      this.message = "Missing data. Please try again!";
      this.success = false;
      this.status = true;
    }
    else this.success = true;
  }
  updateNote() {
    if (this.success == true) {
      this.lnoteService.updateNote(this.note_id,this.note).subscribe((data: {}) => {
        // this.router.navigate(['/vocab'])
        this.message = "Successfully saved a new " + this.note.language + " note";
        
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
  
  onDraft() {
    this.note.is_draft = true;
    this.onSubmit();
    
  }
  onDiscard() {
    this.router.navigate(['/note/french'])
  }
}
