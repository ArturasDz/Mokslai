import React from "react";

function Card() {
  return (
    <div>
      <div className="card grid grid-cols-6 ">
        <div className="col-span-3 bg-blue-200 p-12 m-2 rounded-md">photo</div>
        <div className="col-span-3 row-span-2 bg-gray-200 m-2 rounded-md">description</div>
        <div className="bg-pink-100 p-6 m-2 rounded-md">photo1</div>
        <div className="bg-pink-300 m-2 rounded-md">photo2</div>
        <div className="bg-pink-500 m-2 rounded-md">photo3</div>
        <div className="col-span-6 bg-yellow-300 p-6 m-2 rounded-md">reviews</div>
      </div>
    </div>
  );
}

export default Card;
