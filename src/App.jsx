import { useState } from "react";
import { useEffect } from "react";
import ExtTab from "./components/ExtTab";
function App() {
  const [showState, setShowState] = useState("all");
  const [extData, setExtData] = useState([]);
  const [theme, setTheme] = useState(() => {
    // Initialize theme from localStorage or default to 'dark'
    return localStorage.getItem("theme") || "dark";
  });

  // Apply or remove the dark class whenever theme changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  useEffect(() => {
    // Fetching the extension data from the JSON file
    const fetchData = async () => {
      const response = await fetch("/data.json");
      const data = await response.json();
      setExtData(data);
    };
    fetchData();
  }, []);
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  const handleCheckboxChange = (index) => {
    setExtData(
      extData.map((ext) =>
        ext.id === index ? { ...ext, isActive: !ext.isActive } : ext
      )
    );
  };
  const removeItem = (id) => {
    setExtData(extData.filter((ext) => ext.id !== id));
  };
  return (
    <>
      <main className="flex flex-col min-h-screen bg-gray-200 bg-linear-to-b dark:from-[#040918] dark:to-[#091540] from-[#EBF2FC] to-[#EEF8F9] px-5 py-14 font-NotoSans">
        <section className="mx-auto w-full max-w-6xl">
          <div className="w-full flex justify-between bg-white dark:bg-Neutral-800 items-center py-3 px-5 rounded-xl mb-16">
            <span>
              {theme === "dark" ? (
                <img
                  src="/assets/images/logo-dark-mode.svg"
                  alt="logo-dark-mode.svg"
                />
              ) : (
                <img src="/assets/images/logo.svg" alt="logo.svg" />
              )}
            </span>
            <button
              onClick={toggleTheme}
              className="dark:bg-Neutral-700 bg-Neutral-100 p-2 rounded-lg cursor-pointer dark:hover:bg-Neutral-600 duration-150"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <img src="/assets/images/icon-sun.svg" alt="light-icon" />
              ) : (
                <img src="/assets/images/icon-moon.svg" alt="dark-icon" />
              )}
            </button>
          </div>

          <div className="dark:text-white w-full">
            <div className="flex flex-col md:flex-row items-center justify-between mb-7 gap-5">
              <span className="font-bold text-3xl">Extensions List</span>

              <div className="flex items-center gap-5">
                <button
                  className={`filterBtn ${
                    showState === "all" ? "bg-Red-500 text-Neutral-900 " : ""
                  }`}
                  onClick={() => setShowState("all")}
                >
                  All
                </button>
                <button
                  className={`filterBtn ${
                    showState === "active" ? "bg-Red-500 text-Neutral-900 " : ""
                  }`}
                  onClick={() => setShowState("active")}
                >
                  Active
                </button>
                <button
                  className={`filterBtn ${
                    showState === "in" ? "bg-Red-500 text-Neutral-900 " : ""
                  }`}
                  onClick={() => setShowState("in")}
                >
                  Inactive
                </button>
              </div>
            </div>

            <div className="w-full grid gap-x-2.5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between">
              {extData
                .filter((ext) => {
                  if (showState === "all") return true;
                  if (showState === "active") return ext.isActive === true;
                  if (showState === "in") return ext.isActive === false;
                  return false;
                })
                .map((ext) => (
                  <ExtTab
                    ext={ext}
                    handleCheckboxChange={handleCheckboxChange}
                    removeItem={() => removeItem(ext.id)}
                  />
                ))}
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="attribution">
          Challenge by{" "}
          <a href="https://www.frontendmentor.io?ref=challenge">
            Frontend Mentor
          </a>
          . Coded by{" "}
          <a href="https://www.github.com/ChiragJain7300">Chirag Jain</a>.
        </div>
      </footer>
    </>
  );
}

export default App;
