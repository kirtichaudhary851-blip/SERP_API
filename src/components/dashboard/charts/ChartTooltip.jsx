function ChartTooltip({ active, payload, label, colors, unit = '' }) {
  if (!active || !payload?.length) return null

  return (
    <div className="chart-tooltip" style={{ background: colors.surface, borderColor: colors.grid, color: colors.text }}>
      {label && <p className="chart-tooltip__label">{label}</p>}
      {payload.map((item) => (
        <p className="chart-tooltip__value" key={item.dataKey || item.name}>
          {item.name || item.dataKey}: <strong>{item.value}{unit}</strong>
        </p>
      ))}
    </div>
  )
}

export default ChartTooltip
