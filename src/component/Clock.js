import React, { useEffect, useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { ReactComponent as Refresh } from "../assets/desktop/icon-refresh.svg";

export default function Clock() {
  const [timeData, setTimeData] = useState();
  const [quoteData, setQuoteData] = useState();
  const [location, setLocation] = useState();
  const [details, setDetails] = useState(false);

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

  console.log(timeData);

  return (
    <div className="text-white">
      <div className="pt-10" style={{ fontFamily: "inter" }}>
        {quoteData && (
          <div className="px-14 flex justify-between lg:px-32">
            <blockquote className="flex flex-col">
              <q>{quoteData.content}</q>
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
        <div className="pt-52 px-14 md:pt-64 lg:flex justify-between items-baseline lg:pt-80 lg:px-32">
          <div>
            <div className="flex items-baseline">
              <h1 className="text-8xl font-bold lg:text-9xl">
                {timeData.datetime.substring(11, 16)}
              </h1>
              <span className="ml-3">BST</span>
            </div>
            <div>
              {location && (
                <div>
                  <p className="mt-4 font-semibold uppercase tracking-widest">
                    in {location.country_name}, {location.country_code}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div>
            <button
              className="mt-32 border rounded-full pl-6  bg-white text-gray-600 font-semibold flex items-center tracking-widest"
              onClick={() => setDetails(!details)}
            >
              {details ? "LESS" : "MORE"}
              <IoIosArrowDropdownCircle
                size="45"
                className="ml-2"
                color="#000"
              />
            </button>
          </div>
        </div>
      )}
      <div>
        {details && (
          <div className="bg-timedata lg:flex items-center justify-around">
            <div>
              <div className="flex justify-between lg:flex-col">
                <h2>CURRENT TIMEZONE</h2>
                <p className="text-2xl font-bold lg:text-6xl lg:pt-3">
                  {timeData.timezone}
                </p>
              </div>
              <div className="flex justify-between lg:flex-col lg:pt-6">
                <h2>DAY OF THE YEAR</h2>
                <p className="text-2xl font-bold lg:text-6xl lg:pt-3">
                  {timeData.day_of_year}
                </p>
              </div>
            </div>
            <div>
              <div className="flex justify-between lg:flex-col">
                <h2>DAY OF THE WEEK</h2>
                <p className="text-2xl font-bold lg:text-6xl lg:pt-3">
                  {timeData.day_of_week}
                </p>
              </div>
              <div className="flex justify-between lg:flex-col lg:pt-6">
                <h2>WEEK NUMBER</h2>
                <p className="text-2xl font-bold lg:text-6xl lg:pt-3">
                  {timeData.week_number}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
