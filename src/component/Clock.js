import React, { useEffect, useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { ReactComponent as Refresh } from "../assets/desktop/icon-refresh.svg";

export default function Clock() {
  const [timeData, setTimeData] = useState();
  const [quoteData, setQuoteData] = useState();
  const [location, setLocation] = useState();

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

  const locationApiUrl = "https://freegeoip.app/json/";
  useEffect(() => {
    fetch(locationApiUrl)
      .then((response) => response.json())
      .then((locationData) => setLocation(locationData));
  }, []);

  return (
    <div className="text-white">
      <div className="pt-10" style={{ fontFamily: "inter" }}>
        {quoteData && (
          <div className="flex justify-around mx-6">
            <blockquote className="flex flex-col">
              <q className="w-11/12">{quoteData.content}</q>
              <cite className="mt-4 font-bold">{quoteData.author}</cite>
            </blockquote>
            <Refresh
              className="cursor-pointer"
              onClick={() => window.location.reload(false)}
            />
          </div>
        )}
      </div>
      {timeData && (
        <div className="pt-52 ml-10">
          <div className="flex items-baseline">
            <h1 className="text-8xl font-bold ">
              {timeData.datetime.substring(11, 16)}
            </h1>
            <span className="ml-3">EST</span>
          </div>
          <div>
            {location && (
              <div>
                <p className="mt-4 font-semibold uppercase">
                  in {location.country_name}, {location.country_code}
                </p>
              </div>
            )}
          </div>
          <div>
            <button className="mt-32 border rounded-full pl-6  bg-white text-gray-600 font-semibold flex items-center">
              MORE{" "}
              <IoIosArrowDropdownCircle
                size="45"
                className="ml-2"
                color="#000"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
