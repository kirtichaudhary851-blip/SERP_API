import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { CHART_THEME } from '../../../constants/chartTheme'
import { useTheme } from '../../../hooks/useTheme'
import ChartTooltip from './ChartTooltip'

function LineChartWidget({ data, xKey, yKey, unit = '' }) {
  const { theme } = useTheme()
  const colors = CHART_THEME[theme] ?? CHART_THEME.light

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
        <CartesianGrid stroke={colors.grid} vertical={false} />
        <XAxis dataKey={xKey} stroke={colors.axis} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
        <YAxis stroke={colors.axis} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} width={40} />
        <Tooltip content={<ChartTooltip unit={unit} colors={colors} />} />
        <Line type="monotone" dataKey={yKey} stroke={colors.series1} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default LineChartWidget
