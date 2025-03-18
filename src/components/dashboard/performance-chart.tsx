
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DateRange } from "react-day-picker";
import { formatISO, eachDayOfInterval, format } from "date-fns";
import { Toggle } from "@/components/ui/toggle";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

// Generate random data for the chart
const generateRandomData = (from: Date, to: Date, businessNumber: string) => {
  // Create dates array between the range
  const interval = eachDayOfInterval({ start: from, end: to });
  
  return interval.map((date) => {
    const totalRequests = Math.floor(Math.random() * 1000) + 500;
    const sent = totalRequests - Math.floor(Math.random() * 50);
    const delivered = sent - Math.floor(Math.random() * 30);
    const read = delivered - Math.floor(Math.random() * 200);
    const clicked = read - Math.floor(Math.random() * 900);
    const failed = Math.floor(Math.random() * 20);
    const dlrPending = Math.floor(Math.random() * 10);
    const notSent = Math.floor(Math.random() * 5);
    
    return {
      date: formatISO(date, { representation: 'date' }),
      formattedDate: format(date, 'MMM dd'),
      totalRequests,
      sent,
      delivered,
      read,
      clicked,
      failed,
      dlrPending, 
      notSent
    };
  });
};

type MetricToggle = {
  name: string;
  color: string;
  enabled: boolean;
};

interface PerformanceChartProps {
  dateRange: DateRange;
  businessNumber: string;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ 
  dateRange, 
  businessNumber 
}) => {
  const [metrics, setMetrics] = useState<MetricToggle[]>([
    { name: "totalRequests", color: "#3b82f6", enabled: true },
    { name: "sent", color: "#10b981", enabled: true },
    { name: "delivered", color: "#06b6d4", enabled: true },
    { name: "read", color: "#8b5cf6", enabled: true },
    { name: "clicked", color: "#f59e0b", enabled: false },
    { name: "failed", color: "#ef4444", enabled: false },
    { name: "dlrPending", color: "#6b7280", enabled: false },
    { name: "notSent", color: "#18181b", enabled: false },
  ]);

  // Format the metric name for display
  const formatMetricName = (name: string) => {
    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .replace('Dlr', 'DLR');
  };

  const toggleMetric = (index: number) => {
    const newMetrics = [...metrics];
    newMetrics[index].enabled = !newMetrics[index].enabled;
    setMetrics(newMetrics);
  };

  const data = React.useMemo(() => {
    if (dateRange.from && dateRange.to) {
      return generateRandomData(dateRange.from, dateRange.to, businessNumber);
    }
    return [];
  }, [dateRange, businessNumber]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {metrics.map((metric, index) => (
          <Toggle
            key={metric.name}
            pressed={metric.enabled}
            onPressedChange={() => toggleMetric(index)}
            variant="outline"
          >
            <span
              className="inline-block w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: metric.color }}
            ></span>
            {formatMetricName(metric.name)}
          </Toggle>
        ))}
      </div>
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="formattedDate" />
            <YAxis />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                border: '1px solid #ccc' 
              }}
            />
            <Legend />
            {metrics
              .filter((metric) => metric.enabled)
              .map((metric) => (
                <Line
                  key={metric.name}
                  type="monotone"
                  dataKey={metric.name}
                  name={formatMetricName(metric.name)}
                  stroke={metric.color}
                  activeDot={{ r: 8 }}
                />
              ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Info className="h-4 w-4" />
        <span>Hover over data points to see exact values. Click on legend items to toggle visibility.</span>
      </div>
    </div>
  );
};
