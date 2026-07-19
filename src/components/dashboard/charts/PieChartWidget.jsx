import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { CHART_THEME } from '../../../constants/chartTheme'
import { useTheme } from '../../../hooks/useTheme'
import ChartTooltip from './ChartTooltip'

function PieChartWidget({ data, dataKey = 'value', nameKey = 'name', unit = '' }) {
  const { theme } = useTheme()
  const colors = CHART_THEME[theme] ?? CHART_THEME.light
  const palette = [colors.series1, colors.series2]

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey={dataKey} nameKey={nameKey} innerRadius={60} outerRadius={90} paddingAngle={2}>
          {data.map((entry, index) => <Cell key={entry[nameKey]} fill={palette[index % palette.length]} />)}
        </Pie>
        <Tooltip content={<ChartTooltip unit={unit} colors={colors} />} />
        <Legend verticalAlign="bottom" height={32} wrapperStyle={{ fontSize: 12, color: colors.axis }} />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieChartWidget
