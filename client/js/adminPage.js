$(document).ready(() => {
  $("#dashboard").click(e => {
    $(".enquiries, .venues, .bookings").hide();
    $(".dashboard").show();
  });

  $("#venues").click(e => {
    $(".dashboard, .enquiries, .bookings").hide();
    $(".venues").show();
  });
  $("#enquiries").click(e => {
    $(".dashboard, .venues, .bookings").hide();
    $(".enquiries").show();
  });

  $("#bookings").click(e => {
    $(".dashboard, .enquiries, .venues").hide();
    $(".bookings").show();
  });
});
