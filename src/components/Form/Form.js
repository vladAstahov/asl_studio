const form = document.querySelector('#form-order')
const nameField = form.querySelector('input[name="name"]')
const phoneField = form.querySelector('input[name="phone"]')
const emailField = form.querySelector('input[name="email"]')
const telegramField = form.querySelector('input[name="telegram"]')

const setIsLoading = () => {
    form.parentElement.classList.remove('is-default')
    form.parentElement.classList.remove('is-sent')
    form.parentElement.classList.add('is-loading')
}

const setIsSent = () => {
    form.parentElement.classList.remove('is-default')
    form.parentElement.classList.remove('is-loading')
    form.parentElement.classList.add('is-sent')
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    setIsLoading()
    fetch('/', {
        method: 'POST',
        body: JSON.stringify({
            name: nameField.value,
            phone: phoneField.value,
            email: emailField.value,
            telegram: telegramField.value,
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(() => {
        setIsSent()
    })
})