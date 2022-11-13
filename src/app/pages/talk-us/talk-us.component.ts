import { Component, OnInit } from '@angular/core';
import { faEnvelope} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-talk-us',
  templateUrl: './talk-us.component.html',
  styleUrls: ['./talk-us.component.scss']
})
export class TalkUsComponent implements OnInit {

  faEnvelope = faEnvelope;

  constructor() { }

  ngOnInit(): void {}

}