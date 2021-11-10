// function to give a modal view to ask permission for for going to a external website
function clickevt(evt) {
  evt.preventDefault(); // prevent the uri propagation
  //give a message to ask for redirection
  swal({
    title: "Are you sure?",
    text: "Once confirmed you will be redirected to an External Website",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((is_ok) => { // after promise resolved show success icon
    if (is_ok) {
      swal("Ok! Redirecting", { icon: "success" }).then(() => {
        window.location.replace(this.href); // after promise resoved -> redirect
      });
    } else {
      swal("Back to NerdyStan!"); // else show cancel message
    }
  });
}

//get the best buy button and add event listener for above function
const best_buy_btn = document.getElementById("best-buy");
if(best_buy_btn)
{
  best_buy_btn.addEventListener("click", clickevt);
}

//get all the links in the carousel and add event listener for above function
const best_buy_links = document.querySelectorAll("a.external-links");
if (best_buy_links.length > 0) {
  for (let e of best_buy_links) {
    e.addEventListener("click", clickevt);
  }
}
