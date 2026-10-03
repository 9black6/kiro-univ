import { useState } from 'react'
import ProgressBar from './ProgressBar'
import { daysUntil, progress, recommendedPerDay } from '../lib/domain'

// 資格 1 件のカード。残り日数・進捗・ペース提案・トピック管理を表示する。
function CertCard({ cert, today, onRemoveCert, onAddTopic, onToggleTopic, onRemoveTopic }) {
  const [topicTitle, setTopicTitle] = useState('')

  const remaining = daysUntil(cert.examDate, today)
  const rate = progress(cert.topics)
  const perDay = recommendedPerDay(cert.topics, cert.examDate, today)

  function handleAddTopic(e) {
    e.preventDefault()
    if (topicTitle.trim() === '') return
    onAddTopic(cert.id, topicTitle.trim())
    setTopicTitle('')
  }

  // 残り日数の表示文言を組み立てる
  function remainingLabel() {
    if (remaining === null) return '試験日が未設定'
    if (remaining < 0) return '期限切れ'
    if (remaining === 0) return '本日が試験日'
    return `残り ${remaining} 日`
  }

  return (
    <section className="cert-card">
      <header className="cert-card-head">
        <div>
          <h2>{cert.name}</h2>
          <p className="remaining">{remainingLabel()}</p>
        </div>
        <button
          type="button"
          className="danger"
          onClick={() => onRemoveCert(cert.id)}
          aria-label={`${cert.name} を削除`}
        >
          削除
        </button>
      </header>

      <ProgressBar value={rate} />

      <p className="pace">
        {perDay === null
          ? 'ペース提案: 試験日を未来の日付に設定してください'
          : perDay === 0
            ? 'すべてのトピックが完了しています'
            : `1 日あたり ${perDay} トピック進めると間に合います`}
      </p>

      <form className="topic-form" onSubmit={handleAddTopic}>
        <input
          type="text"
          value={topicTitle}
          onChange={(e) => setTopicTitle(e.target.value)}
          placeholder="学習トピックを追加（例: VPC）"
          aria-label="学習トピック名"
        />
        <button type="submit">追加</button>
      </form>

      <ul className="topic-list">
        {cert.topics.length === 0 && <li className="empty">トピックはまだありません</li>}
        {cert.topics.map((topic) => (
          <li key={topic.id} className={topic.done ? 'done' : ''}>
            <label>
              <input
                type="checkbox"
                checked={topic.done}
                onChange={() => onToggleTopic(cert.id, topic.id)}
              />
              <span>{topic.title}</span>
            </label>
            <button
              type="button"
              className="link"
              onClick={() => onRemoveTopic(cert.id, topic.id)}
              aria-label={`${topic.title} を削除`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default CertCard
