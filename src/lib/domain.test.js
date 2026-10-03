import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { daysUntil, progress, recommendedPerDay } from './domain'

// 日付文字列 "YYYY-MM-DD" を生成する arbitrary
const dateStringArb = fc
  .date({ min: new Date('2020-01-01'), max: new Date('2030-12-31') })
  .map((d) => d.toISOString().slice(0, 10))

// トピック配列を生成する arbitrary
const topicsArb = fc.array(fc.record({ done: fc.boolean() }))

describe('daysUntil（性質ベーステスト）', () => {
  it('試験日と基準日が同じ日なら 0 を返す', () => {
    fc.assert(
      fc.property(dateStringArb, (dateStr) => {
        const today = new Date(dateStr)
        expect(daysUntil(dateStr, today)).toBe(0)
      }),
    )
  })

  it('基準日が 1 日進むと残り日数は必ず 1 減る（単調減少）', () => {
    fc.assert(
      fc.property(dateStringArb, dateStringArb, (examDate, baseStr) => {
        const today = new Date(baseStr)
        today.setHours(0, 0, 0, 0)
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        expect(daysUntil(examDate, tomorrow)).toBe(daysUntil(examDate, today) - 1)
      }),
    )
  })

  it('examDate が未設定なら null を返す', () => {
    fc.assert(
      fc.property(dateStringArb, (baseStr) => {
        expect(daysUntil('', new Date(baseStr))).toBeNull()
      }),
    )
  })
})

describe('progress（性質ベーステスト）', () => {
  it('戻り値は常に 0 以上 100 以下', () => {
    fc.assert(
      fc.property(topicsArb, (topics) => {
        const p = progress(topics)
        expect(p).toBeGreaterThanOrEqual(0)
        expect(p).toBeLessThanOrEqual(100)
      }),
    )
  })

  it('トピックが空なら 0', () => {
    expect(progress([])).toBe(0)
  })

  it('全件 done なら 100', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 100 }), (n) => {
        const topics = Array.from({ length: n }, () => ({ done: true }))
        expect(progress(topics)).toBe(100)
      }),
    )
  })

  it('done を 1 件増やしても進捗は減らない（単調非減少）', () => {
    fc.assert(
      fc.property(topicsArb, (topics) => {
        const before = progress(topics)
        // 未完了が 1 件以上あれば、1 件完了に変える
        const idx = topics.findIndex((t) => !t.done)
        if (idx === -1) return // 全件完了なら対象外
        const next = topics.map((t, i) => (i === idx ? { done: true } : t))
        expect(progress(next)).toBeGreaterThanOrEqual(before)
      }),
    )
  })
})

describe('recommendedPerDay（性質ベーステスト）', () => {
  it('戻り値は null または 0 以上の整数', () => {
    fc.assert(
      fc.property(topicsArb, dateStringArb, dateStringArb, (topics, examDate, baseStr) => {
        const result = recommendedPerDay(topics, examDate, new Date(baseStr))
        if (result !== null) {
          expect(Number.isInteger(result)).toBe(true)
          expect(result).toBeGreaterThanOrEqual(0)
        }
      }),
    )
  })

  it('未完了トピックが 0 なら、残り日数が正でも 0 を返す', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 100 }), (n) => {
        const topics = Array.from({ length: n }, () => ({ done: true }))
        // 基準日より十分未来の試験日
        const today = new Date('2026-01-01')
        const examDate = '2026-12-31'
        expect(recommendedPerDay(topics, examDate, today)).toBe(0)
      }),
    )
  })

  it('残り日数が 0 以下なら null を返す', () => {
    fc.assert(
      fc.property(topicsArb, dateStringArb, (topics, dateStr) => {
        const today = new Date(dateStr)
        // 試験日 = 基準日（残り 0 日）
        expect(recommendedPerDay(topics, dateStr, today)).toBeNull()
      }),
    )
  })
})
