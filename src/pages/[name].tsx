import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./../styles/detailCard.module.scss";

const Country = () => {
  const { name } = useParams();
  const nav = useNavigate();

  const { isError, isLoading, data } = useQuery("country", () => {
    return axios
      .get(
        `https://restcountries.com/v3.1/name/${name
          ?.trim()
          .toLocaleLowerCase()}`
      )
      .then((res) => {
        return res.data[0];
      });
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>Error</h2>;
  }

  return (
    <>
      <button className={styles.backToMain} onClick={() => nav("/")}>
        Back
      </button>
      <div className={styles.container}>
        <div
          className={styles.flag}
          style={{ ["--img" as string]: `url(${data.flags.svg})` }}
        ></div>
        <div className={styles.info}>
          <h2>{data.name.common}</h2>
          <div className={styles.leftSide}>
            <p>
              Native Name : <span>{data.name.official}</span>{" "}
            </p>
            <p>
              Population : <span>{data.population}</span>{" "}
            </p>
            <p>
              Region : <span>{data.region}</span>{" "}
            </p>
            <p>
              Sub Region : <span>{data.subregion}</span>{" "}
            </p>
            <p>
              Capital : <span>{data.capital[0]}</span>{" "}
            </p>
          </div>
          <div className={styles.rightSide}>
            <p>
              Top Level Domain : <span>{data.tld[0]}</span>{" "}
            </p>
            <p>
              Currencies :
              <span>
                {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  Object.values(data.currencies)[0]?.name || "N/A"
                }
              </span>{" "}
            </p>
            <p>
              Language :{" "}
              <span>{Object.values(data.languages).join(",") || "N/A"}</span>{" "}
            </p>
          </div>
          <div className={styles.borders}>
            <p>
              Border Countries :{" "}
              {data.borders?.map((data: string, index: number) => {
                return <span key={index}>{data}</span>;
              })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Country;
