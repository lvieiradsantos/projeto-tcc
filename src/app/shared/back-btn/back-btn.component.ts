import { Component, OnInit } from '@angular/core';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-back-btn',
  templateUrl: './back-btn.component.html',
  styleUrls: ['./back-btn.component.scss']
})
export class BackBtnComponent implements OnInit {

  faCircleChevronLeft = faCircleChevronLeft;
  
  constructor() { }

  ngOnInit(): void {
  }

}
