$(function(){

  $('.URLForm').submit(function(){
    $.post( "enterURL", $('.URLForm').serialize(), function( data ) {
      console.log(data);
      $('.status').text('Your request ID is '+data+'. Check back later to see if your request is finished');
    });
    return false;     
  });

  $('.IDForm').submit(function(){
    $.post( "checkID", $('.IDForm').serialize(), function( data ) {
      if(data.msg){
        $('.status').text(data.text);
      } else {
        $('.status').html(data.html);
      }
      console.log(data);
    });
    return false;
  });
})