function RiskBadge({ risk }) {
  if (!risk) return null;

  return (
    <div style={{ backgroundColor: risk.color }}>
      <p>{risk.label}</p>
      <p>Score : {risk.score}</p>
    </div>
  );
}

export default RiskBadge;

