import React, { useState, useEffect } from "react";
import axios from "axios";

const CatFacts = () => {
  const [fact, setFact] = useState(
    "Cats' hearing stops at 65 khz (kilohertz); humans' hearing stops at 20 khz."
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "https://catfact.ninja/fact";

  /*Calling API via fetch */

  const factsHandler = () => {
    setLoading(true);
    setError(null);

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setFact(data.fact))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  /* Calling API via Axios */

  const factsHandlerViaAxios = () => {
    axios
      .get(API_URL)
      .then((res) => {
        console.log(res.data.fact);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    factsHandler();
    // factsHandlerViaAxios();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-slate-900">
      <div className="text-center w-96 bg-gray-300 rounded p-4 relative">
        <div className="flex flex-col h-full justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2 uppercase text-blue-950">
              Cat Facts
            </h1>
          </div>
          <div className="h-36 overflow-auto mb-4">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <h2 className="mb-4 font-semibold text-gray-700">{fact}</h2>
            )}
          </div>
          <div>
            <button
              className="text-white uppercase active:bg-blue-500 bg-blue-950 px-5 py-2 rounded shadow"
              onClick={factsHandler}
              disabled={loading}
            >
              More..
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatFacts;
