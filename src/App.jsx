import { useEffect, useState } from 'react'
import CertForm from './components/CertForm'
import CertCard from './components/CertCard'
import { load, save } from './lib/storage'

function App() {
  // 起動時に localStorage から復元する
  const [certs, setCerts] = useState(() => load())
  // 基準日。アプリ起動時に 1 回だけ確定させる（再レンダーで変動させない）
  const [today] = useState(() => new Date())

  // 資格・トピックが変わるたびに保存する
  useEffect(() => {
    save(certs)
  }, [certs])

  function addCert(name, examDate) {
    const newCert = {
      id: crypto.randomUUID(),
      name,
      examDate,
      topics: [],
    }
    setCerts((prev) => [...prev, newCert])
  }

  function removeCert(certId) {
    setCerts((prev) => prev.filter((c) => c.id !== certId))
  }

  function addTopic(certId, title) {
    setCerts((prev) =>
      prev.map((c) =>
        c.id === certId
          ? { ...c, topics: [...c.topics, { id: crypto.randomUUID(), title, done: false }] }
          : c,
      ),
    )
  }

  function toggleTopic(certId, topicId) {
    setCerts((prev) =>
      prev.map((c) =>
        c.id === certId
          ? {
              ...c,
              topics: c.topics.map((t) =>
                t.id === topicId ? { ...t, done: !t.done } : t,
              ),
            }
          : c,
      ),
    )
  }

  function removeTopic(certId, topicId) {
    setCerts((prev) =>
      prev.map((c) =>
        c.id === certId
          ? { ...c, topics: c.topics.filter((t) => t.id !== topicId) }
          : c,
      ),
    )
  }

  return (
    <div className="app">
      <header className="app-head">
        <h1>AWS 資格 学習プランナー</h1>
        <p className="lead">
          受験する資格と試験日を登録し、学習トピックの進捗を管理しましょう。
        </p>
      </header>

      <CertForm onAdd={addCert} />

      {certs.length === 0 ? (
        <p className="empty-state">
          まだ資格が登録されていません。上のフォームから追加してください。
        </p>
      ) : (
        <div className="cert-list">
          {certs.map((cert) => (
            <CertCard
              key={cert.id}
              cert={cert}
              today={today}
              onRemoveCert={removeCert}
              onAddTopic={addTopic}
              onToggleTopic={toggleTopic}
              onRemoveTopic={removeTopic}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
