import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ComplaintService } from 'src/app/_services/complaint.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  complaints: any[] = [];
  loading = true;

  cards = [
    { title: 'Total', value: 0, icon: 'bi bi-clipboard-data', tone: 'total' },
    { title: 'Pending', value: 0, icon: 'bi bi-clock-history', tone: 'pending' },
    { title: 'In Progress', value: 0, icon: 'bi bi-gear', tone: 'progress' },
    { title: 'Resolved', value: 0, icon: 'bi bi-check-circle', tone: 'resolved' }
  ];

  private statusCounts: any = {
    'Pending': 0,
    'In Progress': 0,
    'Resolved': 0
  };

  private monthlyCounts: number[] = new Array(12).fill(0);

  constructor(private service: ComplaintService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;

    this.service.getDashboardStats().subscribe({
      next: (res: any) => {
        const data = res.data || {};
        this.statusCounts = data.by_status || this.statusCounts;
        this.monthlyCounts = data.monthly || this.monthlyCounts;
        this.complaints = data.recent || [];

        this.cards[0].value = data.total || 0;
        this.cards[1].value = this.statusCounts['Pending'] || 0;
        this.cards[2].value = this.statusCounts['In Progress'] || 0;
        this.cards[3].value = this.statusCounts['Resolved'] || 0;

        this.loading = false;
        setTimeout(() => this.loadCharts(), 0);
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  loadCharts() {
    Chart.getChart('statusChart')?.destroy();
    Chart.getChart('monthChart')?.destroy();

    this.loadStatusChart();
    this.loadMonthChart();
  }

  loadStatusChart() {
    const canvas: any = document.getElementById('statusChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const g1 = ctx.createLinearGradient(0, 0, 0, 300);
    g1.addColorStop(0, '#fbbf24');
    g1.addColorStop(1, '#f59e0b');

    const g2 = ctx.createLinearGradient(0, 0, 0, 300);
    g2.addColorStop(0, '#60a5fa');
    g2.addColorStop(1, '#2563eb');

    const g3 = ctx.createLinearGradient(0, 0, 0, 300);
    g3.addColorStop(0, '#34d399');
    g3.addColorStop(1, '#059669');

    const counts = this.statusCounts;

    new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Pending', 'In Progress', 'Resolved'],
        datasets: [{
          data: [
            counts['Pending'] || 0,
            counts['In Progress'] || 0,
            counts['Resolved'] || 0
          ],
          backgroundColor: [g1, g2, g3],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 10,
              boxWidth: 12,
              font: { size: 11 }
            }
          }
        }
      },
      plugins: [{
        id: 'centerText',
        beforeDraw(chart: any) {
          const { width, height, ctx } = chart;
          ctx.restore();

          const total =
            (counts['Pending'] || 0) +
            (counts['In Progress'] || 0) +
            (counts['Resolved'] || 0);

          const scale = Math.min(width, height) / 240;
          const numSize = Math.round(Math.max(14, Math.min(22, 22 * scale)));
          const subSize = Math.round(Math.max(10, Math.min(12, 12 * scale)));

          ctx.font = `bold ${numSize}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillStyle = '#0f172a';
          ctx.fillText(String(total), width / 2, height / 2);

          ctx.font = `${subSize}px sans-serif`;
          ctx.fillStyle = '#64748b';
          ctx.fillText('Total', width / 2, height / 2 + numSize * 0.55);

          ctx.save();
        }
      }]
    });
  }

  loadMonthChart() {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const canvasEl = document.getElementById('monthChart');
    if (!canvasEl) return;

    const vw = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const compact = vw < 576;
    const narrow = vw < 400;

    new Chart('monthChart', {
      type: 'bar',
      data: {
        labels: months,
        datasets: [{
          label: 'Complaints',
          data: this.monthlyCounts,
          backgroundColor: '#2563eb',
          borderRadius: 6,
          maxBarThickness: 28
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: !narrow
          }
        },
        scales: {
          x: {
            ticks: {
              maxRotation: 45,
              minRotation: 0,
              autoSkip: true,
              maxTicksLimit: narrow ? 6 : 12,
              font: { size: compact ? 10 : 11 }
            },
            grid: { display: false }
          },
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
              font: { size: compact ? 10 : 11 }
            }
          }
        }
      }
    });
  }
}
