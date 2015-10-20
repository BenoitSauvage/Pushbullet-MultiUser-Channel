$('#send').click(function() {
  var error = 0;
  if($('input[name="title"]').val() === '')
    error++;
  if($('textarea[name="text"]').val() === '')
    error++;
  console.log(error);
  if(error != 0) {
    $('#form').find(':submit').click();
  } else {
    $('#passwordModal').modal();
  }
});

$(".alert-success").fadeTo(2000, 500).slideUp(500, function(){
  $(".alert-success").alert('close');
});
