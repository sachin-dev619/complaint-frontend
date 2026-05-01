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

  cards = [
    { title: 'Total', value: 0, icon: 'bi bi-clipboard-data fs-2' },
    { title: 'Pending', value: 0, icon: 'bi bi-clock-history fs-2' },
    { title: 'In Progress', value: 0, icon: 'bi bi-gear fs-2' },
    { title: 'Resolved', value: 0, icon: 'bi bi-check-circle fs-2' }
  ];

  constructor(private service: ComplaintService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.service.getAllComplaints().subscribe((res: any) => {

      this.complaints = res.data;

      this.cards[0].value = this.complaints.length;
      this.cards[1].value = this.complaints.filter(c => c.status === 'Pending').length;
      this.cards[2].value = this.complaints.filter(c => c.status === 'In Progress').length;
      this.cards[3].value = this.complaints.filter(c => c.status === 'Resolved').length;

      this.loadCharts();
    });
  }

  loadCharts() {

    Chart.getChart("statusChart")?.destroy();
    Chart.getChart("monthChart")?.destroy();

    this.loadStatusChart();
    this.loadMonthChart();
  }

  // 🔥 PREMIUM STATUS CHART
  loadStatusChart() {

    const statusCounts: any = {
      'Pending': 0,
      'In Progress': 0,
      'Resolved': 0
    };

    this.complaints.forEach(c => {
      statusCounts[c.status]++;
    });

    const canvas: any = document.getElementById('statusChart');
    const ctx = canvas.getContext('2d');

    // Gradients
    const g1 = ctx.createLinearGradient(0, 0, 0, 300);
    g1.addColorStop(0, '#ffc107');
    g1.addColorStop(1, '#ff9800');

    const g2 = ctx.createLinearGradient(0, 0, 0, 300);
    g2.addColorStop(0, '#0d6efd');
    g2.addColorStop(1, '#4facfe');

    const g3 = ctx.createLinearGradient(0, 0, 0, 300);
    g3.addColorStop(0, '#198754');
    g3.addColorStop(1, '#00c853');

    new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Pending', 'In Progress', 'Resolved'],
        datasets: [{
          data: Object.values(statusCounts),
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

          const total = Object.values(statusCounts).reduce((a: any, b: any) => a + b, 0);

          const scale = Math.min(width, height) / 240;
          const numSize = Math.round(Math.max(14, Math.min(22, 22 * scale)));
          const subSize = Math.round(Math.max(10, Math.min(12, 12 * scale)));

          ctx.font = `bold ${numSize}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillStyle = '#333';
          ctx.fillText(total, width / 2, height / 2);

          ctx.font = `${subSize}px sans-serif`;
          ctx.fillStyle = '#777';
          ctx.fillText('Total', width / 2, height / 2 + numSize * 0.55);

          ctx.save();
        }
      }]
    });
  }

  // 📅 MONTH CHART
  loadMonthChart() {

    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const counts = new Array(12).fill(0);

    this.complaints.forEach(c => {
      const m = new Date(c.created_at).getMonth();
      counts[m]++;
    });

    const vw =
      typeof window !== 'undefined' ? window.innerWidth : 1024;
    const compact = vw < 576;
    const narrow = vw < 400;

    new Chart('monthChart', {
      type: 'bar',
      data: {
        labels: months,
        datasets: [{
          label: 'Complaints',
          data: counts,
          backgroundColor: '#0d6efd'
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