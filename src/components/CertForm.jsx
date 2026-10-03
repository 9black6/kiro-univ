import { useState } from 'react'

// 資格（名前＋試験日）の追加フォーム。空名はバリデーションで弾く。
function CertForm({ onAdd }) {
  const [name, setName] = useState('')
  const [examDate, setExamDate] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (name.trim() === '') {
      setError('資格名を入力してください')
      return
    }
    onAdd(name.trim(), examDate)
    setName('')
    setExamDate('')
    setError('')
  }

  return (
    <form className="cert-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="cert-name">資格名</label>
        <input
          id="cert-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="例: SAA-C03"
        />
        {error && <p className="error">{error}</p>}
      </div>
      <div className="field">
        <label htmlFor="cert-date">試験予定日</label>
        <input
          id="cert-date"
          type="date"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
        />
      </div>
      <button type="submit">資格を追加</button>
    </form>
  )
}

export default CertForm
