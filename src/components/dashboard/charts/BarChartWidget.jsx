import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { CHART_THEME } from '../../../constants/chartTheme'
import { useTheme } from '../../../hooks/useTheme'
import ChartTooltip from './ChartTooltip'

function BarChartWidget({ data, xKey, yKey, layout = 'horizontal' }) {
  const { theme } = useTheme()
  const colors = CHART_THEME[theme] ?? CHART_THEME.light
  const isVertical = layout === 'vertical'

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} layout={layout} margin={{ top: 8, right: 12, left: isVertical ? 24 : -12, bottom: 0 }}>
        <CartesianGrid stroke={colors.grid} horizontal={!isVertical} vertical={isVertical} />
        {isVertical ? (
          <>
            <XAxis type="number" stroke={colors.axis} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis type="category" dataKey={xKey} stroke={colors.axis} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} width={130} />
          </>
        ) : (
          <>
            <XAxis dataKey={xKey} stroke={colors.axis} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis stroke={colors.axis} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} width={40} />
          </>
        )}
        <Tooltip content={<ChartTooltip colors={colors} />} cursor={{ fill: colors.grid, opacity: 0.4 }} />
        <Bar dataKey={yKey} fill={colors.series1} radius={isVertical ? [0, 4, 4, 0] : [4, 4, 0, 0]} maxBarSize={36} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartWidget
