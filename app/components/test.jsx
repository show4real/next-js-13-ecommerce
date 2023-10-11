import React, { useState, useEffect } from "react";

const SearchSuggestion = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch search suggestions from the API
  const fetchSuggestions = async (query) => {
    try {
      // Make an API call to get search suggestions based on the query
      const res = await getSearchSuggestions(query);
      setSuggestions(res.data);
    } catch (error) {
      console.error("Error fetching search suggestions", error);
    }
  };

  // Handle changes in the search input
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);

    // Fetch suggestions when the query is not empty
    if (query.trim() !== "") {
      setLoading(true);
      fetchSuggestions(query);
    } else {
      setSuggestions([]); // Clear suggestions when the query is empty
    }
  };

  useEffect(() => {
    // Reset suggestions when the search input is cleared
    if (search.trim() === "") {
      setSuggestions([]);
      setLoading(false);
    }
  }, [search]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearchChange}
        className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
      />
      {loading && <p>Loading suggestions...</p>}
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion.id}>{suggestion.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchSuggestion;
