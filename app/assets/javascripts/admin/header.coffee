ready = ->
  $('.page-header').on('click', '.page-actions button', (event) ->
    event.preventDefault();
    $(this).parents('.btn-group').toggleClass('open')
  )

$(document).ready(ready)
$(document).on('page:load', ready)