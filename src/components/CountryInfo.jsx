import React from "react";

const CountryInfo = ({ country, data }) => {
  if (!country) {
    return <p>Click on a country to see details</p>;
  }

  if (!data) {
    return (
      <div>
        <h2>{country}</h2>
        <p>No data available</p>
      </div>
    );
  } 

  return (
    <div style={{ padding: "20px" }}>
      <h2>{country}</h2>
      <p><strong>Capital:</strong> {data.capital}</p>
      <p><strong>Population:</strong> {data.population}</p>
      <p><strong>Continent:</strong> {data.continent}</p>
      <p><strong>Description:</strong> {data.description}</p>
    </div>
  );
};

export default CountryInfo;