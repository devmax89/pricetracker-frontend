interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export default function StatsCard({ title, value, icon, trend }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.positive ? '↗' : '↘'} {trend.value}
            </p>
          )}
        </div>
        <div className="p-3 bg-blue-100 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
}