const form = document.getElementById("form");
let flag = 0;
if (form) {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const image = document.getElementById("image");
  const imagebuy = document.getElementById("image-buy");
  const price = document.getElementById("price");
  const description = document.getElementById("description");

  form.addEventListener("submit", (e) => {
    flag = 0;
    e.preventDefault();
    checkInputs();
    if(flag === 0)
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
    // const descriptionValue = description.value.trim();

    if (titleValue === "") {
      setErrorFor(title, "Title cannot be blank");
      flag = 1;
    } else {
      setSuccessFor(title);
    }

    if (authorValue === "") {
      setErrorFor(author, "Author cannot be blank");
      flag = 1;
    } else {
      setSuccessFor(author);
    }

    if (imageValue === "") {
      setErrorFor(image, "Enter url");
      flag = 1;
    } else if (!isimage(imageValue)) {
      setErrorFor(image, "Url not valid");
      flag = 1;
    } else {
      setSuccessFor(image);
    }

    if (imagebuyValue === "") {
      setErrorFor(imagebuy, "Enter url");
      flag = 1;
    } else if (!isimagebuy(imagebuyValue)) {
      setErrorFor(imagebuy, "Url not valid");
      flag = 1;
    } else {
      setSuccessFor(imagebuy);
    }

    if (String(priceValue) === "") {
      setErrorFor(price, "Enter valid price");
      flag = 1;
    }
    if (Number(priceValue) <= 0) {
      setErrorFor(price, "Enter valid price");
      flag = 1;
    } else {
      setSuccessFor(price);
    }

    // if(descriptionValue === '') {
    // 	setErrorFor(priceValue, 'Enter a Excerpt of the Book');
    // } else{
    // 	setSuccessFor(priceValue);
    // }
  }

  function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error";
    small.innerText = message;
  }

  function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
  }

  function isimage(image) {
    if (image.substr(0, 8) === "https://") {
      return true;
    } else {
      return false;
    }
  }

  function isimagebuy(imagebuy) {
    if (imagebuy.substr(0, 8) === "https://") {
      return true;
    } else {
      return false;
    }
  }
}
