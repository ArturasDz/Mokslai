const fetchUserData = async (userId) => {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const idData = await res.json();
    console.log(idData.name);

    if (!res.ok) {
      throw new Error("User not found");
    }
    if (Error.name == "NetworkError") {
      throw new Error("Network error ocurred");
    }
    return idData;
  } catch (e) {
    console.error(e);
  }
};
fetchUserData(11);
