function onOff() {
  document.querySelector("body").classList.toggle("hideScroll");
  document.querySelector("#modal").classList.toggle("addScroll");
  document.querySelector("#modal").classList.toggle("hide");
}

function checkFields(event) {
  const valuesToCheck = ["title", "image", "category", "description", "link"];

  const isEmpty = valuesToCheck.find(function(value) {
    const checkIfIsString = typeof event.target[value].value === "string";
    const checkIsEmpty = !event.target[value].value.trim();

    if (checkIfIsString && checkIsEmpty) {
      return true;
    }
  });

  if (isEmpty) {
    event.preventDefault();
    alert("Por favor, preencha todos os campos");
  }
}
