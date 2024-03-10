const buttonNextId = 'button-next'
const buttonPrevId = 'button-prev'

const FIRST_ID = 0
const LAST_ID = 3
const BETWEEN_SPACE = 20

const navigationDots = document.querySelectorAll('.slider__dot')

const bodyWidth = document.querySelector('body').getBoundingClientRect().width
const reviewWidth = document.querySelector('.slider__item').getBoundingClientRect().width + BETWEEN_SPACE

const wrapperElement = document.querySelector('#slider')
const wrapperPaddingString = document.defaultView.getComputedStyle(wrapperElement, '').getPropertyValue('padding-left')
const wrapperPadding = wrapperPaddingString.slice(0, wrapperPaddingString.length - 2)
console.log(wrapperPadding)
console.log(wrapperElement.scrollWidth)
const wrapperSize =
    wrapperElement.scrollWidth - wrapperPadding * 2

const transformWidth =
    bodyWidth >= 769
        ? reviewWidth
        : bodyWidth

let activeId = FIRST_ID

const scroll = (wrapper) => {
    wrapper.scrollTo(activeId * transformWidth, 0)
}

const changeActiveDot = () => {
    navigationDots.forEach(elem => elem.classList.remove('is-active'))
    document.querySelectorAll('.slider__dot')[activeId].classList.add('is-active')
}

const goStart = (wrapper) => {
    activeId = FIRST_ID
    wrapper.scrollTo(0, 0)
}

const goEnd = (wrapper) => {
    activeId = LAST_ID
    wrapper.scrollTo(wrapper.scrollWidth -  - wrapper.clientWidth, 0)
}

const onNext = (wrapper) => {
    const offset = wrapper.scrollWidth - wrapper.clientWidth - wrapper.scrollLeft

    if (offset > transformWidth) {
        activeId++
        scroll(wrapper)
    } else if (offset > 20) {
        activeId++
        wrapper.scrollTo(wrapper.scrollWidth, 0)
    } else {
        goStart(wrapper)
    }

    changeActiveDot()
}

const onPrev = (wrapper) => {
    if ((activeId - 1) * transformWidth >= 0) {
        activeId--
        scroll(wrapper)
    } else {
        goEnd(wrapper)
    }

    changeActiveDot()
}

const onCurr = (wrapper, id) => {
    if (id * transformWidth >= 0 && id * transformWidth <= wrapperSize) {
        activeId = id
        scroll(wrapper)
    } else if (id * transformWidth < 0) {
        activeId = 0
        scroll(wrapper)
    } else {
        activeId = id -1
        scroll(wrapper)
    }

    changeActiveDot()
}


document.querySelectorAll(`#${buttonNextId}`).forEach(button => {
    button.addEventListener('click', () => onNext(wrapperElement))
})

document.querySelectorAll(`#${buttonPrevId}`).forEach(button => {
    button.addEventListener('click', () => onPrev(wrapperElement))
})

navigationDots.forEach(dot => {
    dot.addEventListener('click', () => onCurr(wrapperElement, +dot.id))
})

if (bodyWidth < 1200) {
    wrapperElement.addEventListener('scroll', () => {
        activeId = Math.round(wrapperElement.scrollLeft / transformWidth)
        changeActiveDot()
    })
}