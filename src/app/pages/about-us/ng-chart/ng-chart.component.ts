import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-ng-chart',
  templateUrl: './ng-chart.component.html',
  styleUrls: ['./ng-chart.component.scss']
})



export class NgChartComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
    const myChart = new Chart('myChart', {
      type: 'doughnut',
      data: {
        labels: [
          'Não Ouvinte',
          'Ouvinte Parcial',
          'Ouvinte'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [200, 50, 100],
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

}
