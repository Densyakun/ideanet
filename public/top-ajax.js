function signupSubmit(data) {
  return $.ajax({
    url: '/signup',
    type: 'POST',
    dataType: 'json',
    data: data,
    timeout: 5000,
  })
}

function signinSubmit(data) {
  return $.ajax({
    url: '/signin',
    type: 'POST',
    dataType: 'json',
    data: data,
    timeout: 5000,
  })
}
