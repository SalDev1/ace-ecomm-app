import React, { useState, Fragment } from "react";
import MetaData from "../layout/MetaData";
import "./Search.css";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault(); // Form ka reload baar baar nahi hoga.
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  console.log(keyword);

  return (
    <Fragment>
      <MetaData title={`Search A Product -- ACE`} />
      <form className='searchBox' onSubmit={searchSubmitHandler}>
        <input
          type='text'
          placeholder='Search a Product ...'
          onChange={(e) => setKeyword(e.target.value)}
        />

        <input type='submit' value='Search' />
      </form>
    </Fragment>
  );
};

export default Search;
