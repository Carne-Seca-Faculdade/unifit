import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BaseChartDirective, ChartModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  treinoData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    datasets: [
      {
        label: 'Treinos Concluídos',
        data: [5, 8, 4, 7],
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  progressoData: ChartConfiguration<'line'>['data'] = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [
      {
        label: 'Peso Corporal',
        data: [70, 68, 67, 66, 65, 64],
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

  public treinoChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
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
