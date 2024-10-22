import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { useQueryGetFunction } from 'hooks/useQuery';
import { FilterBarChartEnum } from 'modules/DashBoard/Enum';
import { Months } from 'modules/DashBoard/constants';
import { IBarChatProps } from 'modules/DashBoard/types';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function BarChart(props: IBarChatProps) {
  const { activeTab } = props;
  const { t } = useTranslation();

  const currentDate = new Date();
  const { response } = useQueryGetFunction('/dashboard/graph', {
    option: {
      ...(activeTab === FilterBarChartEnum.Monthly
        ? { monthly: true }
        : { yearly: true }),
    },
  });
  const [count, setCount] = useState<{
    privateCourse: number[];
    academyCourse: number[];
  }>({
    privateCourse: [],
    academyCourse: [],
  });

  const getDayOfMonth = (month: number, year: number) => {
    const allDates = Array.from(
      { length: new Date(year, month, 0).getDate() },
      (_, i) => new Date(year, month - 1, i + 1)
    );
    return allDates?.map((date) =>
      date.toLocaleDateString('en-CA', {
        // year: 'numeric',
        // month: '2-digit',
        day: 'numeric',
      })
    );
  };

  const days = getDayOfMonth(
    currentDate.getUTCMonth() + 1,
    currentDate.getUTCFullYear()
  );

  const labels = activeTab === FilterBarChartEnum.Yearly ? Months : days;

  useEffect(() => {
    if (response?.data) {
      const privateCount = labels?.map((item) => {
        const value = response?.data?.private ? response?.data?.private[item] : 0;
        return value;
      });
      const academicCount = labels?.map((item) => {
        const value = response?.data?.academic ? response?.data?.academic[item] : 0;
        return value;
      });
      if (privateCount.length > 0 || academicCount.length > 0) {
        setCount({
          privateCourse: privateCount,
          academyCourse: academicCount,
        });
      }
    }
  }, [response?.data]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
      },
    },
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 10,
        ticks: {
          format: {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          },
        },
      },
      x: {
        title: {
          display: true,
          text:
            activeTab === FilterBarChartEnum.Yearly
              ? `${new Date().getFullYear()}`
              : `${new Date().toLocaleString('default', { month: 'long' })}`,
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: t('Dashboard.reports.reportsTabPrivate'),
        data: count.privateCourse,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: t('Dashboard.reports.reportsTabAcademy'),
        data: count.academyCourse,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
