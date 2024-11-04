import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '@core/services/data-service.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  treinoData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Treinos Concluídos',
        data: [],
        backgroundColor: [],
      },
    ],
  };

  public treinoChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  constructor(private dataService: DataServiceService) {}

  ngOnInit() {
    this.loadWeeklyExerciseLogData(1, 5);
  }

  loadWeeklyExerciseLogData(userId: number, numberOfWeeks: number) {
    this.dataService
      .getWeeklyExerciseLogs(userId, numberOfWeeks)
      .subscribe(weeklyCounts => {
        this.treinoData.labels = Array.from(
          { length: numberOfWeeks },
          (_, i) => `Semana ${i + 1}`
        );
        this.treinoData.datasets[0].data = Object.values(weeklyCounts);
        this.treinoData.datasets[0].backgroundColor = [
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ];
      });
  }

  progressoData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
    ],
    datasets: [
      {
        label: 'Peso Corporal',
        data: [70, 80, 60],
        borderColor: '#42a5f5',
        fill: false,
      },
    ],
  };

  imcData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Baixo Peso', 'Peso Normal', 'Sobrepeso', 'Obesidade'],
    datasets: [
      {
        label: 'Distribuição do IMC',
        data: [10, 60, 20, 10],
        backgroundColor: ['#36A2EB', '#4BC0C0', '#FFCE56', '#FF6384'],
      },
    ],
  };

  public progressoChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };

  public imcChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };
}
