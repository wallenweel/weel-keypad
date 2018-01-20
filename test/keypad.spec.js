import Keypad from '../src/main'

describe('Keypad', () => {
  const kypd = new Keypad({
    mobile: false
  })

  it('should be injected into document.body', () => {
    expect(!!document.querySelector(kypd.prefix('elem', 'wrap'))).toBe(true);
  })

  it('should be hide at beginning.', () => {
    const status = kypd.prefix('attr', 'status')

    expect(kypd.wrap.getAttribute(status)).toBe('ready')
    
    for (const [name, keypad] of Object.entries(kypd.keypads)) {
      expect(keypad.getAttribute(status)).toBe('ready')
    }
  })
})
