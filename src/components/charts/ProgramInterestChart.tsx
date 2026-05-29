import type { ProgramInterest } from '../../types'

interface ProgramInterestChartProps {
  data: ProgramInterest[]
}

const COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
]

const CHART = { w: 400, h: 220, padX: 36, padY: 24, padBottom: 48 }

export function ProgramInterestChart({ data }: ProgramInterestChartProps) {
  const maxCount = Math.max(...data.map((d) => d.count), 1)
  const innerH = CHART.h - CHART.padY - CHART.padBottom
  const innerW = CHART.w - CHART.padX * 2
  const barGap = 12
  const barWidth = (innerW - barGap * (data.length - 1)) / data.length
  const yTicks = [0, Math.round(maxCount / 2), maxCount]

  return (
    <div className="program-chart">
      <svg
        className="program-chart__svg"
        viewBox={`0 0 ${CHART.w} ${CHART.h}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Program interest bar chart"
      >
        {yTicks.map((tick) => {
          const y = CHART.padY + innerH - (tick / maxCount) * innerH
          return (
            <g key={tick}>
              <line
                className="chart-grid-line"
                x1={CHART.padX}
                y1={y}
                x2={CHART.w - CHART.padX}
                y2={y}
              />
              <text
                className="chart-axis-label chart-axis-label--y"
                x={CHART.padX - 8}
                y={y + 4}
                textAnchor="end"
              >
                {tick}
              </text>
            </g>
          )
        })}

        {data.map((item, i) => {
          const barH = (item.count / maxCount) * innerH
          const x = CHART.padX + i * (barWidth + barGap)
          const y = CHART.padY + innerH - barH
          const color = COLORS[i % COLORS.length]

          return (
            <g key={item.program}>
              <rect
                className="program-chart__bar"
                x={x}
                y={y}
                width={barWidth}
                height={barH}
                rx="4"
                fill={color}
              >
                <title>{`${item.program}: ${item.count} leads (${item.percentage}%)`}</title>
              </rect>
              <text
                className="chart-axis-label chart-axis-label--x"
                x={x + barWidth / 2}
                y={CHART.h - CHART.padBottom + 14}
                textAnchor="middle"
              >
                {item.program.length > 10
                  ? `${item.program.slice(0, 9)}…`
                  : item.program}
              </text>
              <text
                className="chart-value-label"
                x={x + barWidth / 2}
                y={y - 6}
                textAnchor="middle"
              >
                {item.count}
              </text>
            </g>
          )
        })}
      </svg>

      <ul className="program-chart__legend" aria-hidden>
        {data.map((item, i) => (
          <li key={item.program} className="program-chart__legend-item">
            <span
              className="program-chart__legend-swatch"
              style={{ background: COLORS[i % COLORS.length] }}
            />
            <span>
              {item.program} · {item.percentage}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
