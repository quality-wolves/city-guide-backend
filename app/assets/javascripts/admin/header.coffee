ready = ->
  $('.page-header').on('click', '.page-actions button', (event) ->
    event.stopPropagation();
    $(this).parents('.btn-group').toggleClass('open')
  )

$(document).ready(ready)
$(document).on('page:load', ready)