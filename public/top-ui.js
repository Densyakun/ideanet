modals = []

const onStateChanged = () => {
  const modalState = new URL(window.location).searchParams.get('modal')

  modals.forEach(m => {
    if (modalState === m[1])
      m[0].show()
    else
      m[0].hide()
  })
}

const setOrDeleteModalState = (modalState) => {
  const url = new URL(window.location)
  if (modalState)
    url.searchParams.set('modal', modalState)
  else
    url.searchParams.delete('modal')
  history.pushState({}, '', url)

  onStateChanged()
}

addModal = (id, modalName) => {
  const modalEl = document.getElementById(id)
  const modal = new bootstrap.Modal(modalEl)
  addModal(modalEl, modal, modalName)
}

addModal = (modalEl, modal, modalName) => {
  modals.push([modal, modalName])

  modalEl.addEventListener('show.bs.modal', () => {
    const modalState = new URL(window.location).searchParams.get('modal')
    if (modalState !== modalName)
      setOrDeleteModalState(modalName)
  })

  modalEl.addEventListener('hide.bs.modal', () => {
    const modalState = new URL(window.location).searchParams.get('modal')
    if (modalState === modalName)
      setOrDeleteModalState()
  })
}


const signupModalEl = document.getElementById('signupModal')
const signupModal = new bootstrap.Modal(signupModalEl)
addModal(signupModalEl, signupModal, 'signup')

const signupForm = document.getElementById('signupForm')
const signupFormSubmitButton = document.getElementById('signupFormSubmitButton')
const signupFormSubmitSpinner = document.getElementById('signupFormSubmitSpinner')
const signupFormFailed = document.getElementById('signupFormFailed')

signupForm.addEventListener('submit', e => {
  e.preventDefault()

  signupFormSubmitButton.setAttribute('disabled', true)
  signupFormSubmitSpinner.classList.remove('d-none')
  signupFormFailed.classList.add('d-none')

  signupSubmit($(signupForm).serializeArray())
    .done((data, textStatus, jqXHR) => {
      console.log([data, textStatus, jqXHR])
      signupModal.hide()
      // TODO
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      console.log([jqXHR, textStatus, errorThrown])
      signupFormFailed.classList.remove('d-none')
    })
    .always((dataOrJqXHR, textStatus, jqXHROrErrorThrown) => {
      signupFormSubmitButton.removeAttribute('disabled')
      signupFormSubmitSpinner.classList.add('d-none')
    })
})

const signinModalEl = document.getElementById('signinModal')
const signinModal = new bootstrap.Modal(signinModalEl)
addModal(signinModalEl, signinModal, 'signin')

const signinForm = document.getElementById('signinForm')
const signinFormSubmitButton = document.getElementById('signinFormSubmitButton')
const signinFormSubmitSpinner = document.getElementById('signinFormSubmitSpinner')
const signinFormFailed = document.getElementById('signinFormFailed')

signinForm.addEventListener('submit', e => {
  e.preventDefault()

  signinFormSubmitButton.setAttribute('disabled', true)
  signinFormSubmitSpinner.classList.remove('d-none')
  signinFormFailed.classList.add('d-none')

  signinSubmit($(signinForm).serializeArray())
    .done((data, textStatus, jqXHR) => {
      console.log([data, textStatus, jqXHR])
      signinModal.hide()
      // TODO
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      console.log([jqXHR, textStatus, errorThrown])
      signinFormFailed.classList.remove('d-none')
    })
    .always((dataOrJqXHR, textStatus, jqXHROrErrorThrown) => {
      signinFormSubmitButton.removeAttribute('disabled')
      signinFormSubmitSpinner.classList.add('d-none')
    })
})


window.addEventListener('popstate', () => onStateChanged())
onStateChanged()
