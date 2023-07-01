import { FC, Suspense, lazy, useEffect, useState } from "react";
import { countryType } from "../model/countryType";
import { useLocation } from "react-router-dom";
import SearchBox from "./searchBox";
const CountryCard = lazy(() => import("./card"));

const CountryList: FC<{ state: countryType[] }> = ({ state }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const region = searchParams.get("region") || "";
  const name = searchParams.get("name") || "";

  const [countriesList, setCountriesList] = useState<JSX.Element[]>();

  useEffect(() => {
    filterList(name, region);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, region]);

  useEffect(() => {
    createList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createList = () => {
    const newList = state.map((country: countryType, index: number) => {
      return (
        <Suspense key={index} fallback={<h1>Loading...</h1>}>
          <CountryCard data={country} />
        </Suspense>
      );
    });

    setCountriesList(newList);
  };

  const filterList = (name: string, region: string) => {
    if (!name && !region) {
      return createList();
    }

    const result = state.filter((data) => {
      let isInList = true;
      let startIndex = 0;

      for (const char of name.toLocaleLowerCase().trim().split("")) {
        data.name.common.toLocaleLowerCase().slice(startIndex).includes(char)
          ? (startIndex = data.name.common.toLocaleLowerCase().indexOf(char))
          : (isInList = false);
      }

      return isInList && data.region.includes(region);
    });

    const newList = result.map((country: countryType, index: number) => {
      return (
        <Suspense key={index} fallback={<h1>Loading...</h1>}>
          <CountryCard data={country} />
        </Suspense>
      );
    });

    setCountriesList(newList);
  };

  return (
    <>
      <section className="searchArea">
        <SearchBox />
      </section>
      {countriesList}
    </>
  );
};

export default CountryList;
