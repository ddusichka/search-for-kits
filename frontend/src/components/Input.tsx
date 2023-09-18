import React, { useState, useEffect } from "react";
import axios from "axios";
import { click } from "@testing-library/user-event/dist/click";

/* Represents a Kit used to collect samples for analysis. */
interface Kit {
  id: number;
  label_id: string;
  shipping_tracking_code: number;
}

export default function Input() {
  const [label, setLabel] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Kit[]>([]);
  const [kitDetails, setKitDetails] = useState<Kit | null>(null);
  const [error, setError] = useState<string>("");

  /* As the user is typing their kit's label ID, update label and find autocomplete suggestions. */
  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
    findSuggestions(e.target.value);
    setError("");
  };

  /* Find suggestions by passing in what the user has typed so far. */
  const findSuggestions = async (label: string) => {
    const options = await axios.get(
      "http://localhost:4000/api/kits/suggest/" + label
    );

    setSuggestions(options.data);
  };

  /* After a user clicks on a suggestion, update label and kitDetails and clear the suggestions. */
  const clickSuggestion = async (kit: Kit) => {
    setLabel(kit.label_id);
    setKitDetails(kit);
    setSuggestions([]);
  };

  /* Find the kit the user is searching for. */
  const findKit = async (label_id: string) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/kits/" + label_id
      );

      setKitDetails(response.data);
      setError("");
    } catch (error) {
      setKitDetails(null);
      setError("No kit found.");
    }

    setSuggestions([]);
  };

  return (
    <div className="bg-slate-200 px-12 py-6">
      <h1 className="text-lg font-bold">Search for Kit</h1>
      <p>To find your kit's shipping number, enter the label id below. </p>
      <input
        name="myInput"
        value={label}
        className="px-1 mt-2 mr-4 w-[60%] rounded-md"
        placeholder="Enter kit label"
        onChange={(e) => handleInput(e)}
      />
      <button
        className="text-white bg-[#00A4ff] px-4 font-bold rounded-md"
        onClick={() => findKit(label)}
      >
        Search
      </button>
      {suggestions.length > 0 && (
        <div className="w-[60%] mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
          <ul className="p-1">
            {suggestions.map((kit) => (
              <li key={kit.id} onClick={() => clickSuggestion(kit)}>
                {kit.label_id}
              </li>
            ))}
          </ul>
        </div>
      )}
      {kitDetails && (
        <div className="flex flex-col mt-4">
          <p>
            <strong>Kit ID:</strong> {kitDetails.id}
          </p>
          <p>
            <strong>Label ID: </strong>
            {kitDetails.label_id}
          </p>
          <a
            href={
              "https://www.fedex.com/fedextrack/?trknbr=" +
              kitDetails.shipping_tracking_code
            }
            target="_blank"
            className="flex"
          >
            <strong>FedEx tracking number: </strong>
            <p className="text-blue-600 ml-2">
              {kitDetails.shipping_tracking_code}
            </p>
          </a>
        </div>
      )}
      {error && <p className="text-red-500 font-bold mt-4">{error}</p>}
    </div>
  );
}
