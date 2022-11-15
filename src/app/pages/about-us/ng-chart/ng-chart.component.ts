import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-ng-chart',
  templateUrl: './ng-chart.component.html',
  styleUrls: ['./ng-chart.component.scss']
})

export class NgChartComponent implements OnInit {


  ouvinteNumbers: number;
  parcialNumbers: number;
  naoOuvinteNumbers: number;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getUsersNumbers();
  }

  getUsersNumbers() {
    this.apiService.getUsersNumbers().pipe(take(1)).subscribe({
      next: v => {
        this.naoOuvinteNumbers = v.totalHearing.no;
        this.parcialNumbers = v.totalHearing.partial;
        this.ouvinteNumbers = v.totalHearing.yes;

        const myChart = new Chart('myChart', {
          type: 'pie',
          data: {
            labels: [
              'Não Ouvinte',
              'Ouvinte Parcial',
              'Ouvinte'
            ],
            datasets: [{
              label: 'My First Dataset',
              data: [this.naoOuvinteNumbers, this.parcialNumbers, this.ouvinteNumbers],
              backgroundColor: [
                'rgb(99 255 130)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              hoverOffset: 4
            }]
          },
        });
      }
    })
  }
}
