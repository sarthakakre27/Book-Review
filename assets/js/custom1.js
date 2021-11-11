let flag = 0; // flag for form validation check
const form2 = document.getElementById("form2"); // get the form on the book-show page
if (form2) {
	//get all the fields in the form which needs validation
	const inputmessage=document.getElementById("inputmessage");
	const inputname=document.getElementById("inputname");
  
	//add a event listener on submit
	form2.addEventListener("submit", (e) => {
      flag = 0;
	  e.preventDefault(); // prevent submission
	  checkInputs2(); // check for fields
      if(flag == 0) // if fields safe then submit
      {
        document.getElementById("form2").submit();
      }
	});
  
	function checkInputs2() {
	  // trim to remove the whitespaces 
	  const inputmessageValue=inputmessage.value.trim();
	  const inputnameValue=inputname.value.trim();
  
	  // if value empty then set error classes on the respective html
	  if (inputnameValue === "") {
		  setErrorFor2(inputname, "Enter your username");
          flag = 1;
		} else { // else set success classes on the form
		  setSuccessFor2(inputname);
	  }
  
	  // if value empty then set error classes on the respective html
	  if (inputmessageValue === "") {
		  setErrorFor2(inputmessage, "Review is not filled");
          flag = 1;
	  	} else if(inputmessageValue.length > 500){ // check if text length is > 500
				setErrorFor2(inputmessage, "Review cannot exceed more than 500 characters");
      	      flag = 1;
	  	} else{ // else set success classes on the form
			setSuccessFor2(inputmessage);
	  	}
		//function to add error classes for respective html
		function setErrorFor2(input, message) {
		  const formControl = input.parentElement;
		  const small = formControl.querySelector("small");
		  formControl.className = "form-control error";
		  small.innerText = message;
		}
		//function to add success classes for respective html
		function setSuccessFor2(input) {
		  const formControl = input.parentElement;
		  formControl.className = "form-control success";
		}

	}
  }

//Star Rating functionality//
// using Jquery for the star rating
$(document).ready(function(){
    // clear Check Radio-box
    $(".rating input:radio").attr("checked", false);

	// on a click ti a star add checked class on parent
    $('.rating input').click(function () {
        $(".rating span").removeClass('checked');
        $(this).parent().addClass('checked');
    });
	//chenge the value of the input to checked stars
    $('input:radio').change(
      function(){
        var userRating = this.value;
    }); 
});

var starWidth = 40;

//set the width of each star
$.fn.stars = function() {
  return $(this).each(function() {
    $(this).html($('<span />').width(Math.max(0, (Math.min(5, parseFloat($(this).html())))) * starWidth));
  });
}
// on document loaded show stars
$(document).ready(function() {
  $('span.stars').stars();
});