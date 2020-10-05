playerName = 'felix'
maxPrice = null

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function checkExist(target) {
  nbCall = 0
  return new Promise((resolve, reject) => {
    var checkExistInterval = setInterval(() => {
      if (!!document.querySelector(target)) {
        clearInterval(checkExistInterval)
        resolve()
      }
      if (nbCall > 30) {
        clearInterval(checkExistInterval)
        reject()
      }
      nbCall++
    }, 100)
  })
}

searchPlayer = async () => {
  targetName = document.querySelector(
    '.ut-player-search-control--input-container .ut-text-input-control'
  )
  targetName.value = playerName

  targetName.dispatchEvent(
    new Event('input', {
      bubbles: true,
      cancelable: true,
    })
  )

  await sleep(2000)

  await checkExist('.playerResultsList button')
  mouseClick(document.querySelector('.playerResultsList button'))

  await sleep(250)

  if (maxPrice) {
    const maxValueInput = document.querySelectorAll('.numericInput')[
      document.querySelectorAll('.numericInput').length - 1
    ]
    maxValueInput.value = maxPrice
    maxValueInput.dispatchEvent(
      new Event('change', {
        bubbles: true,
        cancelable: true,
      })
    )
  } else {
    mouseClick(
      document.querySelectorAll('.search-price-header button')[
        document.querySelectorAll('.search-price-header button').length - 1
      ]
    )
  }

  await sleep(250)
  mouseClick(document.querySelector('.call-to-action'))

  await checkExist('.buyButton')
    .then(async () => {
      // @TODO BUY ME
      await sleep(250)
      mouseClick(document.querySelector('.buyButton'))
      await sleep(250)
      mouseClick(document.querySelector('.Dialog .ut-button-group button'))
      // alert('BUY ME')
    })
    .catch(async () => {
      await sleep(250)
      mouseClick(document.querySelector('.ut-navigation-button-control'))
      await sleep(2000)
      searchPlayer()
    })
}

mouseClick = (targetcall) => {
  targetcall.dispatchEvent(
    new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  )
  targetcall.dispatchEvent(
    new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  )
}

searchPlayer()
