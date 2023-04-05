import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { Geoapioptions } from "../../api";
import { GEOAPIURL } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const HandleOnchange = (searchdata) => {
    setSearch(searchdata);
    console.log(searchdata);
    onSearchChange(searchdata);
  };

  const loadOptions = (inputvalue) => {
    return fetch(
      `${GEOAPIURL}/cities?minPopulation=1000000&namePrefix=${inputvalue}`,
      Geoapioptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name} ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };
  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={HandleOnchange}
      loadOptions={loadOptions}
    />
  );
};
export default Search;
