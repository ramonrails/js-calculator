// calculator JS
const calculator      = document.querySelector('.calculator')
const display         = document.querySelector('.digital-display')
const keys            = calculator.querySelector('.calculator-keys')

keys.addEventListener('click', e => {
  if (e.target.matches('button')) {

    const key             = e.target
    const action          = key.dataset.action
    const keyContent      = key.textContent
    const displayedNum    = display.textContent
    const lastKeyType = calculator.dataset.lastKeyType

    if (!action) {
      if (displayedNum === '0' || lastKeyType === 'operator') {
        display.textContent = keyContent
      } else {
        display.textContent = displayedNum + keyContent
      }
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      // remember values
      calculator.dataset.lastKeyType = 'operator'
      calculator.dataset.firstValue      = displayedNum
      calculator.dataset.operator        = action
      resetOperatorKeys()
      // make clicked key depressed
      key.classList.add('is-depressed')
    }

    if (action === 'decimal') {
      display.textContent = displayedNum + '.'
    }

    if (action === 'clear') {
      display.textContent = '0'
      resetMemorisedValues()
    }

    if (action === 'calculate') {
      const firstValue  = calculator.dataset.firstValue
      const operator    = calculator.dataset.operator
      const secondValue = displayedNum

      display.textContent = calculate(firstValue, operator, secondValue)
      resetMemorisedValues()
    }

  } // addEventListener click, e
})

const calculate = (n1, operator, n2) => {
  n1 = parseFloat(n1)
  n2 = parseFloat(n2)
  let result = ''

  switch (operator) {
    case 'add':      result = n1 + n2; break;
    case 'subtract': result = n1 - n2; break;
    case 'multiply': result = n1 * n2; break;
    case 'divide':   result = n1 / n2; break;
    default:
      result = (n2 || 0)
      break;
  }

  return result
} // calculate(...)

const resetMemorisedValues = () => {
  calculator.dataset.lastKeyType = null
  calculator.dataset.firstValue = null
  calculator.dataset.operator = null
  resetOperatorKeys()
}

const resetOperatorKeys = () => {
  // Remove .is-depressed class from all keys
  Array.from(keys.children).forEach(k => k.classList.remove('is-depressed'))
}
