"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { SubjectBreakdown } from "../lib/analysis";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function ProgressChart({ subjects }: { subjects: SubjectBreakdown[] }) {
  if (!subjects.length) {
    return (
      <div className="card">
        <h2>Grafik için veri bekleniyor</h2>
        <p>Analiz sonucunda ders bazlı istatistikler burada görüntülenecek.</p>
      </div>
    );
  }

  const data = {
    labels: subjects.map((subject) => subject.name),
    datasets: [
      {
        label: "Doğru",
        backgroundColor: "rgba(59, 130, 246, 0.7)",
        borderRadius: 6,
        data: subjects.map((subject) => subject.correct),
      },
      {
        label: "Yanlış",
        backgroundColor: "rgba(248, 113, 113, 0.6)",
        borderRadius: 6,
        data: subjects.map((subject) => subject.incorrect),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#e2e8f0",
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "Ders Bazlı Dağılım",
        color: "#e2e8f0",
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        borderColor: "rgba(59, 130, 246, 0.4)",
        borderWidth: 1,
        titleColor: "#f8fafc",
        bodyColor: "#f8fafc",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#cbd5f5",
        },
        grid: {
          color: "rgba(148, 163, 184, 0.1)",
        },
      },
      y: {
        ticks: {
          color: "#cbd5f5",
        },
        grid: {
          color: "rgba(148, 163, 184, 0.1)",
        },
        suggestedMax: Math.max(...subjects.map((s) => s.correct + s.incorrect)) + 2,
        beginAtZero: true,
      },
    },
  } satisfies Parameters<typeof Bar>[0]["options"];

  return (
    <div className="card">
      <Bar data={data} options={options} />
    </div>
  );
}
