let flag = 0;
const form2 = document.getElementById("form2");
if (form2) {
	const inputmessage=document.getElementById("inputmessage");
	const inputname=document.getElementById("inputname");
  
	form2.addEventListener("submit", (e) => {
      flag = 0;
	  e.preventDefault();
	  checkInputs2();
      if(flag == 0)
      {
        document.getElementById("form2").submit();
      }
	});
  
	function checkInputs2() {
	  // trim to remove the whitespaces 
	  const inputmessageValue=inputmessage.value.trim();
	  const inputnameValue=inputname.value.trim();
  
	  if (inputnameValue === "") {
		  setErrorFor2(inputname, "Enter your username");
          flag = 1;
		} else {
		  setSuccessFor2(inputname);
	  }
  
	  if (inputmessageValue === "") {
		  setErrorFor2(inputmessage, "Review is not filled");
          flag = 1;
	  } else if(inputmessageValue.length>500){
			setErrorFor2(inputmessage, "Review cannot exceed more than 500 characters");
            flag = 1;
	  } else{
		setSuccessFor2(inputmessage);
	  }
	function setErrorFor2(input, message) {
	  const formControl = input.parentElement;
	  const small = formControl.querySelector("small");
	  formControl.className = "form-control error";
	  small.innerText = message;
	}
  
	function setSuccessFor2(input) {
	  const formControl = input.parentElement;
	  formControl.className = "form-control success";
	}

	}
  }

//Star Rating functionality//
$(document).ready(function(){
    // Check Radio-box
    $(".rating input:radio").attr("checked", false);

    $('.rating input').click(function () {
        $(".rating span").removeClass('checked');
        $(this).parent().addClass('checked');
    });

    $('input:radio').change(
      function(){
        var userRating = this.value;
    }); 
});

var starWidth = 40;

$.fn.stars = function() {
  return $(this).each(function() {
    $(this).html($('<span />').width(Math.max(0, (Math.min(5, parseFloat($(this).html())))) * starWidth));
  });
}
$(document).ready(function() {
  $('span.stars').stars();
});