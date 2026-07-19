import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { CHART_THEME } from '../../../constants/chartTheme'
import { useTheme } from '../../../hooks/useTheme'
import ChartTooltip from './ChartTooltip'

function AreaChartWidget({ data, xKey, yKey, unit = '' }) {
  const { theme } = useTheme()
  const colors = CHART_THEME[theme] ?? CHART_THEME.light
  const gradientId = `area-gradient-${xKey}-${yKey}`

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors.series1} stopOpacity={0.35} />
            <stop offset="95%" stopColor={colors.series1} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={colors.grid} vertical={false} />
        <XAxis dataKey={xKey} stroke={colors.axis} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
        <YAxis stroke={colors.axis} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} width={48} />
        <Tooltip content={<ChartTooltip unit={unit} colors={colors} />} />
        <Area type="monotone" dataKey={yKey} stroke={colors.series1} strokeWidth={2} fill={`url(#${gradientId})`} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default AreaChartWidget
