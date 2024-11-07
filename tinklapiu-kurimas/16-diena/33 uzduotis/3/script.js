const form = document.querySelector("#form1");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const firstNumber = document.getElementsByName("firstNumber")[0].value;
  const secondNumber = document.getElementsByName("secondNumber")[0].value;
  const Sum = Number(firstNumber) + Number(secondNumber);
  document.getElementById("sum").innerText = Sum;
});
