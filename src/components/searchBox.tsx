import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBox = () => {
  const nav = useNavigate();
  const [filter, setFilter] = useState({ name: "", region: "" });

  useEffect(() => {
    (filter.name || filter.region) && redirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const redirect = () => {
    nav(
      `/?name=${filter.name}&region=${
        filter.region === "all" ? "" : filter.region
      }`
    );
  };

  return (
    <>
      <div>
        <FontAwesomeIcon icon={faSearch} className="icon" />
        <input
          type="text"
          onChange={(e) => setFilter({ ...filter, name: e.target.value })}
          placeholder="Search for a country..."
        />
      </div>

      <select
        name="region"
        onChange={(e) => setFilter({ ...filter, region: e.target.value })}
      >
        <option value="all">World</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </>
  );
};

export default SearchBox;
