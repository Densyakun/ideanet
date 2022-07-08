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
const signupFormError = document.getElementById('signupFormError')
const signupFormErrorMsg = document.getElementById('signupFormErrorMsg')
const signupFormTimeout = document.getElementById('signupFormTimeout')
const signupFormUsernameInvalid = document.getElementById('signupFormUsernameInvalid')
const signupFormUsernameExists = document.getElementById('signupFormUsernameExists')
const signupFormPasswordInvalid = document.getElementById('signupFormPasswordInvalid')

signupForm.addEventListener('submit', e => {
  e.preventDefault()

  signupFormError.classList.add('d-none')
  signupFormTimeout.classList.add('d-none')
  signupFormUsernameInvalid.classList.add('d-none')
  signupFormUsernameExists.classList.add('d-none')
  signupFormPasswordInvalid.classList.add('d-none')

  const data = $(signupForm).serializeObject()
  let b = false
  if (!check_username(data["user_name"])) {
    signupFormUsernameInvalid.classList.remove('d-none')
    b = true
  }
  if (!check_password(data["password"])) {
    signupFormPasswordInvalid.classList.remove('d-none')
    b = true
  }
  if (b)
    return

  signupFormSubmitButton.setAttribute('disabled', true)
  signupFormSubmitSpinner.classList.remove('d-none')

  signupSubmit(JSON.stringify(data))
    .done((data, textStatus, jqXHR) => {
      console.log([data, textStatus, jqXHR])
      signupModal.hide()
      // TODO
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      console.log([jqXHR, textStatus, errorThrown])
      if (textStatus === "error") {
        if (jqXHR.responseText === "Username already exists.")
          signupFormUsernameExists.classList.remove('d-none')
        else if (jqXHR.responseText === "Invalid password.")
          signupFormPasswordInvalid.classList.remove('d-none')
        else if (jqXHR.responseText === "Invalid username.")
          signupFormUsernameInvalid.classList.remove('d-none')
        else {
          signupFormErrorMsg.textContent = errorThrown
          signupFormError.classList.remove('d-none')
        }
      } else if (textStatus === "timeout")
        signupFormTimeout.classList.remove('d-none')
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
const signinFormError = document.getElementById('signinFormError')
const signinFormErrorMsg = document.getElementById('signinFormErrorMsg')
const signinFormTimeout = document.getElementById('signinFormTimeout')
const signinFormUsernameInvalid = document.getElementById('signinFormUsernameInvalid')
const signinFormPasswordInvalid = document.getElementById('signinFormPasswordInvalid')
const signinFormFailed = document.getElementById('signinFormFailed')

signinForm.addEventListener('submit', e => {
  e.preventDefault()

  signinFormError.classList.add('d-none')
  signinFormTimeout.classList.add('d-none')
  signinFormUsernameInvalid.classList.add('d-none')
  signinFormPasswordInvalid.classList.add('d-none')
  signinFormFailed.classList.add('d-none')

  const data = $(signinForm).serializeObject()
  let b = false
  if (!check_username(data["user_name"])) {
    signinFormUsernameInvalid.classList.remove('d-none')
    b = true
  }
  if (!check_password(data["password"])) {
    signinFormPasswordInvalid.classList.remove('d-none')
    b = true
  }
  if (b)
    return

  signinFormSubmitButton.setAttribute('disabled', true)
  signinFormSubmitSpinner.classList.remove('d-none')

  signinSubmit(JSON.stringify(data))
    .done((data, textStatus, jqXHR) => {
      console.log([data, textStatus, jqXHR])
      signinModal.hide()
      // TODO
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      console.log([jqXHR, textStatus, errorThrown])
      if (textStatus === "error") {
        if (jqXHR.responseText === "Authentication failure.")
          signinFormFailed.classList.remove('d-none')
        else {
          signinFormErrorMsg.textContent = errorThrown
          signinFormError.classList.remove('d-none')
        }
      } else if (textStatus === "timeout")
        signinFormTimeout.classList.remove('d-none')
    })
    .always((dataOrJqXHR, textStatus, jqXHROrErrorThrown) => {
      signinFormSubmitButton.removeAttribute('disabled')
      signinFormSubmitSpinner.classList.add('d-none')
    })
})


window.addEventListener('popstate', () => onStateChanged())
onStateChanged()
