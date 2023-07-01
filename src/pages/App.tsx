import axios from "axios";
import { useQuery } from "react-query";
import { countryType } from "../model/countryType";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import CountryList from "../components/countryList";
import DarkMode from "../components/darkMode";
import Country from "./[name]";
import Loading from "../components/loading";

const App = () => {
  const [state, setState] = useState<countryType[]>([]);

  const { isLoading, isError } = useQuery("Countries", async () => {
    return axios
      .get("https://restcountries.com/v3.1/independent?status=true")
      .then((res) => setState(res.data));
  });

  if (isError) {
    return <h2>Error</h2>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <header>
        <h1>Where in the word?</h1>
        <DarkMode />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<CountryList state={state} />}></Route>
          <Route path="/:name" element={<Country />}></Route>
        </Routes>
      </main>
      <footer>
        <p>
          Powered by
          <a href="https://aliho3ein.me" target="_blank">
            aliho3ein
          </a>
        </p>
      </footer>
    </>
  );
};

export default App;
