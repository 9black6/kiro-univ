// 0〜100 の値を視覚的なバーで表示する
function ProgressBar({ value }) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className="progress" aria-label={`進捗 ${clamped}%`}>
      <div className="progress-bar" style={{ width: `${clamped}%` }} />
      <span className="progress-label">{clamped}%</span>
    </div>
  )
}

export default ProgressBar
