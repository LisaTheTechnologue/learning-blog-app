import { Component, OnInit } from '@angular/core';
import { LNote } from "../../../../_models/note";
import { NoteService } from "../../../../_services/lnote.service";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.css']
})
export class CreateNewComponent implements OnInit {
  success: boolean = false;
  status: boolean = false;
  message: string = "";
  note: LNote = new LNote();
  // formattedResult;
  txtValue: string = null;
  
  constructor(private lnoteService: NoteService,
    //private activatedRoute: ActivatedRoute,
    public router: Router) { }

  ngOnInit() {
  }
  onChangeT(deviceValue) {
    console.log(deviceValue);
    
    this.note.language = deviceValue;
  }
  onSubmit() {
    this.isValidated();
    this.saveNote();
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
  saveNote() {
    if (this.success == true) {
      this.lnoteService.createNote(this.note).subscribe((data: {}) => {
        // this.router.navigate(['/vocab'])
        this.message = "Successfully added a new " + this.note.language + " note";
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
  onDraft() {
    this.note.is_draft = true;
    this.onSubmit();
  }
  onDiscard() {
    if (this.note.language == "french") this.router.navigate(['/note/french'])
    else this.router.navigate(['/note/english'])
  }
}
