declare var require: any
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
  
})
export class ViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  imgname= require("../../assets/avatar_rj.jpg");
}
