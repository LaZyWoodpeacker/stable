import React, { useState } from "react";

interface IProps {
  onSearch: (query?: string) => void;
}

const SearchBar: React.FC<IProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  return (
    <div className="search">
      <input
        className="search_input"
        type="text"
        name="search"
        id="search-id"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            onSearch(query);
          }
        }}
      />
      <button className="search_btn" onClick={() => onSearch(query)}>
        Найти
      </button>
    </div>
  );
};

export default SearchBar;
