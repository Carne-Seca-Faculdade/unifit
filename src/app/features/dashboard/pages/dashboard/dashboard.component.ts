import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { weightLogDTO } from '@core/models/dto/weightLogDTO';
import { DataServiceService } from '@core/services/data-service.service';
import { WeightService } from '@core/services/weight.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './dashboard.component.html',
  providers: [DatePipe],
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

  progressoData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Peso Corporal',
        data: [],
        borderColor: '#42a5f5',
        fill: false,
      },
    ],
  };

  public progressoChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };

  constructor(
    private dataService: DataServiceService,
    private weightService: WeightService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.loadWeeklyExerciseLogData(1, 5);
    this.loadWeightProgressData(1);
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
          'rgba(252, 186, 0.6)',
          'rgba(92,51,23)',
          'rgba(107,35,142)',
          'rgba(192,217,217)',
          'rgba(123, 176, 0.6)',
        ];
      });
  }

  loadWeightProgressData(userId: number) {
    this.weightService
      .getWeightHistory(userId)
      .subscribe((data: weightLogDTO[]) => {
        this.progressoData.labels = data.map(entry =>
          this.datePipe.transform(entry.dataRegistro, 'dd/MM/yy')
        );
        this.progressoData.datasets[0].data = data.map(entry => entry.peso);
      });
  }

  imcData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [
      'Baixo Peso (< 18,5)',
      'Peso Normal (18,5 - 24,9)',
      'Sobrepeso (25 - 29,9)',
      'Obesidade (≥ 30)',
    ],
    datasets: [
      {
        label: 'Distribuição do IMC',
        data: [5, 65, 20, 10],
        backgroundColor: ['#36A2EB', '#4BC0C0', '#FFCE56', '#FF6384'],
      },
    ],
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
