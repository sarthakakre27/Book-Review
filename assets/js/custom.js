let flag1 = 0; // flag for form validation check
const form = document.getElementById("form"); // get the form on the page
if (form) {
  //get all the fields in the form which needs validation
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const image = document.getElementById("image");
  const imagebuy = document.getElementById("image-buy");
  const price = document.getElementById("price");

  //add a event listener on submit
  form.addEventListener("submit", (e) => {
    flag1 = 0;
    e.preventDefault(); // prevent submission
    checkInputs(); // check for fields
    if(flag1 === 0) // if fields safe then submit
    {
      document.getElementById("form").submit();
    }
  });

  function checkInputs() {
    // trim to remove the whitespaces
    const titleValue = title.value.trim();
    const authorValue = author.value.trim();
    const imageValue = image.value.trim();
    const imagebuyValue = imagebuy.value.trim();
    const priceValue = price.value.trim();

    // if value empty then set error classes on the respective html
    if (titleValue === "") {
      setErrorFor(title, "Title cannot be blank");
      flag1 = 1;
    } else { // else set success classes on the form
      setSuccessFor(title);
    }

    // if value empty then set error classes on the respective html
    if (authorValue === "") {
      setErrorFor(author, "Author cannot be blank");
      flag1 = 1;
    } else { // else set success classes on the form
      setSuccessFor(author);
    }

    // if value empty then set error classes on the respective html
    if (imageValue === "") {
      setErrorFor(image, "Enter url");
      flag1 = 1;
    } else if (!isimage(imageValue)) {
      setErrorFor(image, "Url not valid"); // check for uri
      flag1 = 1;
    } else { // else set success classes on the form
      setSuccessFor(image);
    }

    // if value empty then set error classes on the respective html
    if (imagebuyValue === "") {
      setErrorFor(imagebuy, "Enter url");
      flag1 = 1;
    } else if (!isimagebuy(imagebuyValue)) {
      setErrorFor(imagebuy, "Url not valid"); // check for uri
      flag1 = 1;
    } else { // else set success classes on the form
      setSuccessFor(imagebuy);
    }
    
    // if value empty then set error classes on the respective html
    if (String(priceValue) === "") {
      setErrorFor(price, "Enter valid price");
      flag1 = 1;
    }
    // if value empty then set error classes on the respective html
    if (Number(priceValue) <= 0) {
      setErrorFor(price, "Enter valid price");// check for negative price
      flag1 = 1;
    } else { // else set success classes on the form
      setSuccessFor(price);
    }
  }

  //function to add error classes for respective html
  function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error";
    small.innerText = message;
  }

  //function to add success classes for respective html
  function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
  }

  //function to check uri
  function isimage(image) {
    if (image.substr(0, 8) === "https://") {
      return true;
    } else {
      return false;
    }
  }
  //function to check uri
  function isimagebuy(imagebuy) {
    if (imagebuy.substr(0, 8) === "https://") {
      return true;
    } else {
      return false;
    }
  }
}