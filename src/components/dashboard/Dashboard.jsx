import React, { useState, useEffect } from "react";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import PostHistoryCard from "../card/PostHistoryCard";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import authService from "../../authentication/auth";
import axios from "axios";

function HistoryTab({ postHistory, setPostHistory, handleDelete }) {
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const { data, status } = await axios.get(
          `${import.meta.env.VITE_API_URL}/orgproducts`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (status === 200 && Array.isArray(data)) {
          setPostHistory(data);
        } else {
          setPostHistory([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPostHistory([]);
      }
    };

    fetchPosts();
  }, [setPostHistory]);

  return (
    <div className="w-screen left-0 md:w-full p-4 sm:p-6 flex flex-col gap-6 md:static fixed">
      <div className="flex flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-black">
          Post History
        </h1>
        <Link to={"/postCreate"}>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Create Post
          </button>
        </Link>
      </div>
      {postHistory.length === 0 ? (
        <div className="flex justify-center items-center h-48">
          <p className="text-gray-500 text-lg font-medium">
            Nothing Posted Yet
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto scroll-smooth no-scrollbar px-1">
          <div className="flex flex-row md:flex-col gap-4 py-2 w-max md:w-full">
            {postHistory.map((post, i) => (
              <div key={i} className="w-full sm:w-[260px] md:w-full">
                <PostHistoryCard
                  key={post.id}
                  product={post}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SoldPackagesTab({ purchaseHistory, setPurchaseHistory, orgId }) {
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const { data, status } = await axios.get(
          `${import.meta.env.VITE_API_URL}/historyProduct/${orgId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (status === 200 && Array.isArray(data)) {
          setPurchaseHistory(data);
        } else {
          setPurchaseHistory([]);
        }
      } catch (error) {
        console.error("Error fetching purchase history:", error);
        setPurchaseHistory([]);
      }
    };

    if (orgId) fetchPurchases();
  }, [orgId, setPurchaseHistory]);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md">
      <table className="min-w-full text-left text-sm sm:text-base">
        <thead className="bg-blue-100 text-gray-800">
          <tr>
            <th className="px-4 py-3 font-semibold">#</th>
            <th className="px-4 py-3 font-semibold">Destination</th>
            <th className="px-4 py-3 font-semibold">Amount</th>
            <th className="px-4 py-3 font-semibold">Payment Status</th>
            <th className="px-4 py-3 font-semibold">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {purchaseHistory.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No sold packages found.
              </td>
            </tr>
          ) : (
            purchaseHistory.map((item, index) => (
              <tr key={item.id || index} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-4 py-3">{item.place}</td>
                <td className="px-4 py-3">₹{item.amount}</td>
                <td className="px-4 py-3">
                  {item.paymentStatus ? (
                    <span className="inline-block px-2 py-1 text-xs font-medium text-green-800 bg-green-200 rounded-full">
                      Success
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-1 text-xs font-medium text-red-800 bg-red-200 rounded-full">
                      Rejected
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span>{item.date}</span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loc, setLoc] = useState("");
  const [image, setImage] = useState("");
  const [postHistory, setPostHistory] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [orgId, setOrgId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        navigate("/orglogin");
        return;
      }

      try {
        const { exp } = jwtDecode(token);
        if (exp * 1000 < Date.now()) {
          await authService.logoutUser();
          navigate("/orglogin");
        }

        const { data, status } = await axios.get(
          `${import.meta.env.VITE_API_URL}/organizer`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (status === 200 && data) {
          setName(data.username);
          setOrganization(data.organization);
          setPhone(data.phone);
          setEmail(data.email);
          setLoc(data.location);
          setOrgId(data.id);
        }
      } catch (err) {
        console.error(err);
        await authService.logoutUser();
        navigate("/orglogin");
      }
    };

    init();
  }, [navigate]);
  useEffect(() => {
    const sync = () => setUsername(localStorage.getItem("username") || null);
    sync();
    window.addEventListener("userChanged", sync);
    return () => window.removeEventListener("userChanged", sync);
  }, []);

  const handleDelete = (id) => {
    setPostHistory((prev) => prev.filter((p) => p.id !== id));
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "profile":
        return (
          <div className="w-full md:border md:border-gray-300 rounded-md md:p-6 flex flex-col gap-6 overflow-x-hidden">
            <div className="flex justify-between">
              <h1 className="text-2xl sm:text-3xl font-bold text-black text-left">
                Profile
              </h1>
              <Link to={"/updateProfile"}>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                  Update Profile
                </button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row sm:px-10 justify-between items-start sm:items-center w-full border border-gray-300 rounded-md p-4 gap-4">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-semibold text-black text-left">
                    {name}
                  </span>
                  <span className="text-gray-700 text-sm sm:text-base">
                    {phone} | {loc}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 border border-gray-300 rounded-md p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex flex-col gap-6 w-full">
                  <h2 className="text-xl sm:text-2xl font-semibold text-black md:text-left">
                    Personal Information
                  </h2>
                  <div className="flex flex-col sm:flex-row justify-between gap-6 w-full">
                    <div className="flex flex-col items-start gap-1 w-full sm:w-1/2">
                      <label className="text-gray-600 text-base sm:text-lg">
                        Name
                      </label>
                      <span className="text-black text-base sm:text-lg">
                        {name}
                      </span>
                    </div>
                    <div className="flex flex-col items-start gap-1 w-full sm:w-1/2">
                      <label className="text-gray-600 text-base sm:text-lg">
                        Phone
                      </label>
                      <span className="text-black text-base sm:text-lg">
                        {phone}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between gap-6 w-full">
                    <div className="flex flex-col items-start gap-1 w-full sm:w-1/2">
                      <label className="text-gray-600 text-base sm:text-lg">
                        Organization
                      </label>
                      <span className="text-black text-base sm:text-lg">
                        {organization}
                      </span>
                    </div>
                    <div className="flex flex-col items-start gap-1 w-full sm:w-1/2">
                      <label className="text-gray-600 text-base sm:text-lg">
                        Email
                      </label>
                      <span className="text-black text-base sm:text-lg break-words">
                        {email}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-1 w-full sm:w-1/2">
                    <label className="text-gray-600 text-base sm:text-lg">
                      Location
                    </label>
                    <span className="text-black text-base sm:text-lg">
                      {loc}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "history":
        return (
          <HistoryTab
            postHistory={postHistory}
            setPostHistory={setPostHistory}
            handleDelete={handleDelete}
          />
        );
      case "sold":
        return (
          <SoldPackagesTab
            postHistory={postHistory}
            purchaseHistory={purchaseHistory}
            setPurchaseHistory={setPurchaseHistory}
            orgId={orgId}
          />
        );
      default:
        return <div>Select a section from the left</div>;
    }
  };

  return (
    <div className="relative min-h-screen w-full pt-10">
      {/* Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed z-30 top-15 left-0 p-1 rounded-full bg-white border text-gray-700 transition-transform"
      >
        {sidebarOpen ? (
          <MdChevronLeft size={24} />
        ) : (
          <MdChevronRight size={24} />
        )}
      </button>

      <div className="lg:grid lg:grid-cols-8 lg:gap-2">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static 
            top-0 left-0 z-20
            w-64 lg:w-auto
            bg-white 
            px-3 py-6
            transform transition-transform duration-300
            h-auto
            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
        >
          <div className="flex flex-col space-y-4 pt-16 lg:pt-0">
            {["profile", "history", "sold"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setSelectedTab(tab);
                  setSidebarOpen(false);
                }}
                className={`text-left rounded transition ${
                  selectedTab === tab
                    ? "bg-blue-100 font-bold text-blue-700"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
              >
                {tab === "profile"
                  ? "Your Profile"
                  : tab === "history"
                  ? "Post History"
                  : "Sold Packages"}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={`
            relative z-10
            bg-white
            p-4 sm:px-10
            sm:w-full
            lg:col-span-6
          `}
        >
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
