import { Component, OnInit } from '@angular/core';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-open-object',
  templateUrl: './open-object.component.html',
  styleUrls: ['./open-object.component.scss']
})
export class OpenObjectComponent implements OnInit {
  faCircleQuestion = faCircleQuestion;
  constructor() { }

  ngOnInit(): void {
  }

}
