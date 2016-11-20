var total = 0;
var hist;
var costPerPage = 60;

$(document).ready(function() {
  var userid = Cookies.get('userid');
  var data = $.ajax({
    url: "api/users/" + userid,
  }).done(parseData);

  var socket = io();
  socket.on('increment price', function() {
    total += costPerPage;
    renderPrice("#price-ticker", total);
  });
});

function renderPrice(selector, price) {
  if (price % 100 == 0)
    $(selector).text("$" + (Math.floor(price / 100) + ".00"));
  else
    $(selector).text("$" + (Math.floor(price / 100) + "." + (price % 100)));
}

function parseData(d) {
  console.log(d);

  var user = d.user;
  $(".email").text(user.email);
  hist = user.browsingHistory;
  hist.forEach(function(h) {
    if (h.blacklisted)
      total += user.costPerPage
  });
  renderPrice("#price-ticker", total);
  renderPrice("#sub-price-ticker", user.costPerPage);
}
