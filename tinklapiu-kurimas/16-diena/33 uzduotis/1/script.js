const yellowText = () => {
  const paragraph = document.getElementById("firstp");
  paragraph.style.color = "yellow";
};
const yellowButton = document.getElementById("yellow");
yellowButton.addEventListener("click", yellowText);

const greenText = () => {
  const paragraph = document.getElementById("firstp");
  paragraph.style.color = "green";
};
const greenButton = document.getElementById("green");
greenButton.addEventListener("click", greenText);

const redText = () => {
  const paragraph = document.getElementById("firstp");
  paragraph.style.color = "red";
};
const redButton = document.getElementById("red");
redButton.addEventListener("click", redText);
