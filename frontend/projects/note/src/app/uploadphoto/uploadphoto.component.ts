import { Component, OnInit } from '@angular/core';
import { LNote } from 'projects/_models/note';
import { NoteService } from 'projects/_services/lnote.service';
import { Router } from '@angular/router';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { PathLocationStrategy } from '@angular/common';
@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}
  public transform(value: string, type: string = 'html'): SafeUrl | SafeResourceUrl {
		switch (type) {
			
			
			case 'url': return this._sanitizer.bypassSecurityTrustUrl(value);
			case 'resourceUrl': return this._sanitizer.bypassSecurityTrustResourceUrl(value);
			default: throw new Error(`Invalid safe type specified: ${type}`);
		}
	}
} 
@Component({
  selector: 'app-uploadphoto',
  templateUrl: './uploadphoto.component.html',
  styleUrls: ['./uploadphoto.component.css']
})
export class UploadphotoComponent implements OnInit {

  DJANGO_SERVER = 'http://127.0.0.1:8000/'
  form: FormGroup;
  response;
  imageURL='';
  url: SafeResourceUrl;

  constructor(private formBuilder: FormBuilder
    , private uploadService: NoteService
    ,private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    // this.form = this.formBuilder.group({
    //   photo: ['']
    // });
    // let id = 'B3IRK1kVvWI';
    // let imageURL = `https://www.youtube.com/embed/${id}`;

    // this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(imageURL);
  }

  onSubmit(){
    console.log(this.imageURL);
    this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(this.imageURL);
  }

  // onChange(event) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.form.get('photo').setValue(file);
  //   }
  // }

  // onSubmit() {
  //   const formData = new FormData();
  //   formData.append('file', this.form.get('photo').value);

  //   this.uploadService.upload(formData).subscribe(
  //     (res) => {
  //       this.response = res;
  //       this.imageURL = `${this.DJANGO_SERVER}${res.file}`;
  //         console.log(res);
  //         console.log(this.imageURL);
  //     },
  //     (err) => {  
  //       console.log(err);
  //     }
  //   );
  // }

}
