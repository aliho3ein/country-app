import { useState } from "react";

const DarkMode = () => {
  const [mode, setMode] = useState<boolean>(false);
  const changeMode = () => {
    const root = document.documentElement;
    mode
      ? (root.style.setProperty("--primaryColor", "#fff"),
        root.style.setProperty("--secondaryColor", "#fff"),
        root.style.setProperty("--textColor", "#333"),
        root.style.setProperty("--shadowColor", "#e2dfdf"))
      : (root.style.setProperty("--primaryColor", "#202d36"),
        root.style.setProperty("--secondaryColor", "#2b3743"),
        root.style.setProperty("--textColor", "#fff"),
        root.style.setProperty("--shadowColor", "#202d36"));

    setMode(!mode);
  };

  return (
    <>
      <div className="darkMode" onClick={changeMode}>
        DarkMode
      </div>
    </>
  );
};

export default DarkMode;
