import React from "react";
import ThemeContext from "../ThemeContext";
import { useContext } from "react";
import { FaMoon } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";

function InvoiceList() {
  const { theme, setTheme } = useContext(ThemeContext);
  const changeTheme = (theme) => setTheme(theme);
  return (
    <>
    <div className="">
        {/* <h1>Invoices</h1> */}
        <h1 className="text-9xl">Invoices</h1>
        {/* <h1>Change theme</h1> */}
      <p className="font-bold text-md ">Change theme mode</p>
      <div className="flex ">
        {theme !== "dark" ? (
          <FaMoon onClick={() => changeTheme("dark")} />
        ) : (
          <IoMdSunny onClick={() => changeTheme("light")} />
        )}
        </div>
    </div>
    </>
  );
}

export default InvoiceList;
