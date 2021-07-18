import React, { useEffect, useState } from "react";
import { IoIosArrowDropupCircle } from "react-icons/io";

export default function Clock() {
  const [timeData, setTimeData] = useState();
  const [quoteData, setQuoteData] = useState();

  const baseUrl = "http://worldtimeapi.org/api/ip";
  useEffect(() => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => setTimeData(data));
  }, [timeData]);

  const quoteApiUrl = "https://api.quotable.io/random";
  useEffect(() => {
    fetch(quoteApiUrl)
      .then((response) => response.json())
      .then((dataQuote) => setQuoteData(dataQuote));
  }, []);

  return (
    <div className="text-white">
      <div className="text-black pt-10 mx-8">
        {quoteData && (
          <blockquote className="flex flex-col">
            <q className="text-black">{quoteData.content}</q>
            <cite className="mt-4 font-bold">{quoteData.author}</cite>
          </blockquote>
        )}
      </div>
      {timeData && (
        <div className="pt-64 ml-10">
          <div className="flex items-baseline">
            <h1 className="text-8xl font-bold ">
              {timeData.datetime.substring(11, 16)}
            </h1>
            <span className="ml-3">EST</span>
          </div>
          <div>
            <p className="mt-4 font-semibold">IN TUNIS, AF</p>
            <button className="mt-32 border rounded-full pl-6  bg-white text-gray-600 font-semibold flex items-center">
              MORE{" "}
              <IoIosArrowDropupCircle size="45" className="ml-2" color="#000" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
