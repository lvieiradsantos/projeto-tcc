import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-open-object',
  templateUrl: './open-object.component.html',
  styleUrls: ['./open-object.component.scss']
})
export class OpenObjectComponent implements OnInit {
  faCircleQuestion = faCircleQuestion;
  itemDetails: any;
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.getActiveId();
  }

  getActiveId() {
    this.activatedRoute.params
      .pipe(take(1))
      .subscribe(item => {
        const itemId = item['id']
        this.apiService.getItem(itemId).subscribe(item => {
          this.itemDetails = item;
          console.log(this.itemDetails);
        })
      })
  }


}
