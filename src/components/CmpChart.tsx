// Google Ads line chart used inside the before/after comparison — faithful
// port of the original SVG (gridlines + polyline + end dot).
export default function CmpChart({
  points,
  color,
  strokeWidth,
  dotR
}: {
  points: string;
  color: string;
  strokeWidth: number;
  dotR: number;
}) {
  const last = points.trim().split(/\s+/).pop() ?? '380,210';
  const [dx, dy] = last.split(',');
  return (
    <svg className="cmp-svg" viewBox="0 0 400 240" preserveAspectRatio="none" aria-hidden="true">
      <line x1="20" y1="210" x2="380" y2="210" stroke="rgba(16,17,19,0.12)" strokeWidth="1.5" />
      <line x1="20" y1="150" x2="380" y2="150" stroke="rgba(16,17,19,0.06)" strokeWidth="1.5" />
      <line x1="20" y1="90" x2="380" y2="90" stroke="rgba(16,17,19,0.06)" strokeWidth="1.5" />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={dx} cy={dy} r={dotR} fill={color} />
    </svg>
  );
}
