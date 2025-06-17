import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import ExploreCard from "./card/ExploreCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
;

function Explore() {
  const navigate = useNavigate();

  /* ── filter labels ────────────────────────────────────── */
  const budgetRanges = [
    "All",
    "Less Than 5000",
    "5000 - 7000",
    "7000 - 9000",
    "9000 - 11000",
    "11000 and more",
  ];

  const durationRanges = ["All","1 - 3", "4 - 6", "7 - 9", "10 - 12", "13 and more"];

  /* ── component state ──────────────────────────────────── */
  const [destHistory, setDestHistory] = useState([]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [priceRng, setPriceRng] = useState(""); // chosen text label
  const [durationRng, setDurationRng] = useState(""); // chosen text label

  const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(0);

  const [startDay, setStartDay] = useState(0);
  const [endDay, setEndDay] = useState(0);

  /* ── figure out numeric ranges whenever a label changes ─ */
  useEffect(() => {
    /* price → numeric */
    switch (priceRng) {
      case "All":
        setStartPrice(0);
        setEndPrice(0);
        break
      case "Less Than 5000":
        setStartPrice(0);
        setEndPrice(5000);
        break;
      case "5000 - 7000":
        setStartPrice(5000);
        setEndPrice(7000);
        break;
      case "7000 - 9000":
        setStartPrice(7000);
        setEndPrice(9000);
        break;
      case "9000 - 11000":
        setStartPrice(9000);
        setEndPrice(11000);
        break;
      case "11000 and more":
        setStartPrice(11000);
        setEndPrice(100000000);
        break;
      default:
        setStartPrice(0);
        setEndPrice(0);
    }

    /* duration → numeric */
    switch (durationRng) {
      case "All":
        setStartDay(0);
        setEndDay(0);
        break;
      case "1 - 3":
        setStartDay(1);
        setEndDay(3);
        break;
      case "4 - 6":
        setStartDay(4);
        setEndDay(6);
        break;
      case "7 - 9":
        setStartDay(7);
        setEndDay(9);
        break;
      case "10 - 12":
        setStartDay(10);
        setEndDay(12);
        break;
      case "13 and more":
        setStartDay(13);
        setEndDay(200);
        break;
      default:
        setStartDay(0);
        setEndDay(0);
    }
  }, [priceRng, durationRng]);

  /* ── fetch data whenever numeric bounds change ────────── */
  useEffect(() => {
    const fetchDestHistory = async () => {
      try {
        const {data,status}=await axios.get(`${import.meta.env.VITE_API_URL}/productsFilter`, {
          params: {
            startPrice: startPrice,
            endPrice: endPrice,
            startDay: startDay,
            endDay: endDay,
          },
        });

        if (status === 200 && Array.isArray(data)) {
          setDestHistory(data);
        } else {
          setDestHistory([]);
        }
      } catch (err) {
        console.error(err);
        setDestHistory([]);
      }
    };

    fetchDestHistory();
  }, [startPrice, endPrice, startDay, endDay, navigate]);

  /* ── render ───────────────────────────────────────────── */
  return (
    <div className="w-full flex flex-col h-screen">
      {/* mobile toggle */}
      <button
        onClick={() => setIsFilterOpen((p) => !p)}
        className="md:hidden fixed top-16 left-1 z-50 rounded-full shadow p-2 bg-white"
      >
        {isFilterOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* main layout */}
      <div className="flex flex-1 md:flex-row relative h-[calc(100vh-2rem)] py-8">
        {/* filter panel */}
        <aside
          className={`pt-11 md:pt-2 md:static md:w-1/4 md:translate-x-0 md:block
            fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white shadow-lg z-40
            transform transition-transform duration-300 ease-in-out
            ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="h-full overflow-y-auto p-4">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>

            {/* budget */}
            <div className="space-y-2 mb-6">
              <h3 className="font-medium">Budget Per Person (₹)</h3>
              {budgetRanges.map((item) => (
                <label
                  key={item}
                  className="flex items-center space-x-2 text-sm"
                >
                  <input
                    type="radio"
                    name="budget"
                    value={item}
                    checked={priceRng === item}
                    onChange={(e) => setPriceRng(e.target.value)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>

            {/* duration */}
            <div className="space-y-2 mb-6">
              <h3 className="font-medium">Duration (days)</h3>
              {durationRanges.map((item) => (
                <label
                  key={item}
                  className="flex items-center space-x-2 text-sm"
                >
                  <input
                    type="radio"
                    name="duration"
                    value={item}
                    checked={durationRng === item}
                    onChange={(e) => setDurationRng(e.target.value)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* card grid */}
        <section className="flex-1 h-full overflow-y-auto p-4 no-scrollbar">
          {destHistory.length ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
              {destHistory.map((d) => (
                <ExploreCard key={d.id} id={d.id} destination={d} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No packages match your filters.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

export default Explore;
