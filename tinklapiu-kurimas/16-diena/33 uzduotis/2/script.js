const biggerImage = () => {
  const image = document.getElementById("htmlimage");
  image.style.width = "500px";
};
const biggerImageButton = document.getElementById("bigger");
biggerImageButton.addEventListener("click", biggerImage);

const smallerImage = () => {
  const image = document.getElementById("htmlimage");
  image.style.width = "150px";
};
const smallerImageButton = document.getElementById("smaller");
smallerImageButton.addEventListener("click", smallerImage);
