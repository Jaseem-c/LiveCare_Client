import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

function ServiceGraph() {
  // Sample data representing the number of services
  const data = [
    { group: 'group A', count: 4 },
    { group: 'group B', count: 3 },
    { group: 'group C', count: 5 }
  ];

  // Calculate the total count
  const totalCount = data.reduce((total, item) => total + item.count, 0);

  // Calculate the percentage for each group
  const percentageData = data.map(item => ({
    group: item.group,
    percentage: (item.count / totalCount) * 100
  }));

  return (
    <div>
      <h2 className='mt-2 text-center' style={{ color: "#9C6644" }}>Services</h2>
      <BarChart
        xAxis={[{ scaleType: 'band', data: ['Homecare', 'Therapy', 'Nursing Care', 'Doctor'] }]}
        series={[
          { data: [4, 3, 5,6], color: ['#9C6644', '7F5539#7F5539', '#B08968'] } 
        ]}
        width={400}
        height={200}
      />
    </div>
  );
}

export default ServiceGraph;
