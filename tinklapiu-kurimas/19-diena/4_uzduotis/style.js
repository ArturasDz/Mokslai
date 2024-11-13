const displayUserName = async (userId) => {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/${userId}`)
    };
    const idData = await res.json();
    console.log(idData.name);
}