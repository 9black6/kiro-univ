// localStorage への読み書きを集約する。副作用はここに閉じ込める。

const STORAGE_KEY = 'aws-study-planner:v1'

/**
 * 保存済みの資格配列を読み込む。
 * 保存なし・不正 JSON・localStorage 利用不可の場合は空配列を返す。
 * @returns {Array}
 */
export function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data : []
  } catch {
    // プライベートモード等で localStorage が使えない場合もアプリは継続する
    return []
  }
}

/**
 * 資格配列を保存する。失敗しても例外を投げない。
 * @param {Array} certs
 */
export function save(certs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(certs))
  } catch {
    // 保存に失敗してもアプリの動作は止めない
  }
}
