import type { ConversionTrendPoint } from '../../types'

interface ConversionRateChartProps {
  rate: number
  delta: string
  trend: ConversionTrendPoint[]
}

const CHART = { w: 320, h: 140, padX: 28, padY: 20 }

function buildLinePoints(
  trend: ConversionTrendPoint[],
  width: number,
  height: number,
  padX: number,
  padY: number,
) {
  const innerW = width - padX * 2
  const innerH = height - padY * 2
  const rates = trend.map((p) => p.rate)
  const maxRate = Math.max(...rates)
  const minRate = Math.min(...rates) - 2
  const range = maxRate - minRate || 1

  return trend.map((point, i) => {
    const x = padX + (i / Math.max(trend.length - 1, 1)) * innerW
    const y = padY + innerH - ((point.rate - minRate) / range) * innerH
    return { ...point, x, y }
  })
}

export function ConversionRateChart({
  rate,
  delta,
  trend,
}: ConversionRateChartProps) {
  const radius = 52
  const stroke = 14
  const circumference = 2 * Math.PI * radius
  const filled = (rate / 100) * circumference
  const points = buildLinePoints(trend, CHART.w, CHART.h, CHART.padX, CHART.padY)
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${CHART.h - CHART.padY} L ${points[0].x} ${CHART.h - CHART.padY} Z`

  return (
    <div className="conversion-chart">
      <div className="conversion-chart__donut-wrap">
        <svg
          className="conversion-chart__donut"
          viewBox="0 0 140 140"
          role="img"
          aria-label={`Conversion rate ${rate} percent`}
        >
          <circle
            className="chart-ring chart-ring--bg"
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            strokeWidth={stroke}
          />
          <circle
            className="chart-ring chart-ring--fill"
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            strokeWidth={stroke}
            strokeDasharray={`${filled} ${circumference - filled}`}
            strokeLinecap="round"
            transform="rotate(-90 70 70)"
          />
        </svg>
        <div className="conversion-chart__donut-label">
          <span className="conversion-chart__rate">{rate}%</span>
          <span className="conversion-chart__delta">{delta}</span>
        </div>
      </div>

      <div className="conversion-chart__trend">
        <p className="chart-section-label">6-month trend</p>
        <svg
          className="conversion-chart__line"
          viewBox={`0 0 ${CHART.w} ${CHART.h}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Conversion rate trend over six months"
        >
          {[0, 1, 2, 3].map((i) => {
            const y = CHART.padY + ((CHART.h - CHART.padY * 2) / 3) * i
            return (
              <line
                key={i}
                className="chart-grid-line"
                x1={CHART.padX}
                y1={y}
                x2={CHART.w - CHART.padX}
                y2={y}
              />
            )
          })}
          <path className="chart-area" d={areaPath} />
          <path className="chart-line" d={linePath} />
          {points.map((p) => (
            <g key={p.month}>
              <circle className="chart-dot" cx={p.x} cy={p.y} r="4" />
              <text className="chart-axis-label" x={p.x} y={CHART.h - 4} textAnchor="middle">
                {p.month}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}
