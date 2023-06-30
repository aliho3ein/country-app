import { FC } from "react";
import styles from "./../styles/countryCard.module.scss";
import { countryType } from "../model/countryType";
import { useNavigate } from "react-router-dom";

const CountryCard: FC<{ data: countryType }> = ({ data }) => {
  const nav = useNavigate();

  /*  const setPopulation = () => {
    const currentNum = data.population.toString().split("");
    let num = "";

    for (let i = currentNum.length - 1; i > 0; i--) {
      num += currentNum[i];
      if ((i - 1) % 3 === 0 && i > 1) {
        num += ".";
      }
    }

    return num;
  };
  */

  return (
    <div
      className={styles.countryCard}
      onClick={() => nav(`/${data.name.common}`)}
    >
      <header
        className={styles.head}
        style={{ ["--img" as string]: `url(${data.flags.svg})` }}
      ></header>
      <section>
        <h3>{data.name.common}</h3>
        <p>
          Population : <span>{data.population}</span>
        </p>
        <p>
          Region : <span>{data.region}</span>
        </p>
        <p>
          capital : <span>{data.capital}</span>
        </p>
      </section>
    </div>
  );
};

export default CountryCard;
