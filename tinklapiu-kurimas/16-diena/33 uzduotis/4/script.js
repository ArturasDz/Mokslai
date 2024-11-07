const form = document.querySelector("#form1");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const randomNumber = Math.floor(math.random() * 100 + 1);
  const numberGuess = document.getElementById("number")[0].value;
  if (numberGuess > randomNumber) {
    document.getElementById("resultText").innerText =
      "The guessed number is bigger!";
  } else if (numberGuess < randomNumber) {
    document.getElementById("resultText").innerText =
      "The guessed number is smaller!";
  }
});
