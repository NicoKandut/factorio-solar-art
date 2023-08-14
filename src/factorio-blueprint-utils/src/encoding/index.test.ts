import { decode, encode } from '.'

describe('[encoding]', () => {
  describe('encode', () => {
    it('encodes valid blueprint', () => {
      fail()
    })

    it('encodes valid blueprint book', () => {
      fail()
    })

    it('throws with invalid object', () => {
      fail()
    })

    it('throws with null and undefined', () => {
      expect(encode(null)).toThrowError()
      expect(encode(undefined)).toThrowError()
    })
  })

  describe('decode', () => {
    it('decodes valid blueprint', () => {
      fail()
    })

    it('decodes valid blueprint book', () => {
      fail()
    })

    it('throws with invalid string', () => {
      fail()
    })

    it('throws with null and undefined', () => {
      // @ts-expect-error - in reality nothing prevents me from passing null
      expect(decode(null)).toThrowError()

      // @ts-expect-error
      expect(decode(undefined)).toThrowError()
    })
  })
})
