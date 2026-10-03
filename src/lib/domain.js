// ドメインロジック（純粋関数）
// 外部状態を参照せず、引数のみに依存する。基準日 today は呼び出し側から渡す。

/**
 * 指定した日付の 0 時 0 分 0 秒（ローカル）を表す Date を返す。
 * 時刻成分を落として日単位で比較・計算できるようにするため。
 */
function startOfDay(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

/**
 * 試験日までの残り日数を返す。
 * @param {string} examDate - "YYYY-MM-DD"
 * @param {Date} today - 基準日
 * @returns {number} 残り日数（過去なら負）。examDate が未設定なら null。
 */
export function daysUntil(examDate, today) {
  if (!examDate) return null
  const exam = startOfDay(examDate)
  const base = startOfDay(today)
  const msPerDay = 24 * 60 * 60 * 1000
  // 日単位に正規化しているため丸め誤差は出ないが、安全のため四捨五入する
  return Math.round((exam.getTime() - base.getTime()) / msPerDay)
}

/**
 * トピックの完了率を 0〜100 の整数で返す。
 * @param {Array<{done: boolean}>} topics
 * @returns {number} 0〜100
 */
export function progress(topics) {
  if (!topics || topics.length === 0) return 0
  const done = topics.filter((t) => t.done).length
  return Math.round((done / topics.length) * 100)
}

/**
 * 1 日あたりの推奨トピック数を返す。
 * @param {Array<{done: boolean}>} topics
 * @param {string} examDate - "YYYY-MM-DD"
 * @param {Date} today - 基準日
 * @returns {number|null} 推奨数（切り上げ）。残り日数が 0 以下なら null。
 */
export function recommendedPerDay(topics, examDate, today) {
  const remaining = daysUntil(examDate, today)
  if (remaining === null || remaining <= 0) return null
  const notDone = (topics || []).filter((t) => !t.done).length
  return Math.ceil(notDone / remaining)
}
