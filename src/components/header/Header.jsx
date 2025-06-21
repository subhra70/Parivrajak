import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link} from "react-router-dom";
import authService from "../../authentication/auth";

function Header() {
  const [username, setUsername] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return;
    try {
      const { exp } = jwtDecode(token);
      if (exp < Math.floor(Date.now() / 1000)) authService.logoutUser();
    } catch (e) {
      authService.logoutUser();
      console.log(e);
      
    }
  }, []);

  useEffect(() => {
    const sync = () => setUsername(localStorage.getItem("username") || null);
    sync();
    window.addEventListener("userChanged", sync);
    return () => window.removeEventListener("userChanged", sync);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
    setUsername(null);
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen((p) => !p);
  const closeMenu = () => setMenuOpen(false);

  const MobileLink = ({ to, children }) => (
    <Link
      to={to}
      onClick={closeMenu}
      className="w-full px-6 py-3 text-lg hover:bg-white/10 transition-colors"
    >
      {children}
    </Link>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-r from-orange-400 to-blue-600 text-white shadow-md">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex justify-center space-x-3 items-center">
        <div className="rounded-full hidden md:block"><img className="w-10 h-10" src="./logo.svg" alt="logo"/></div>
        <Link to="/" className="text-xl font-bold hover:opacity-90">
          PARIVRAJAK
        </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:justify-center md:space-x-8">
          <Link to="/" className="hover:underline underline-offset-4">
            Home
          </Link>
          <Link to="/explore" className="hover:underline underline-offset-4">
            Explore
          </Link>
          <Link to="/history" className="hover:underline underline-offset-4">
            History
          </Link>
        </nav>
        <div className="hidden md:flex md:items-center md:justify-center md:gap-2">
          {username ? (
            <div className="flex items-center gap-4 ml-2">
              <div className="flex flex-col">
                <span className="font-bold">Welcome</span>
                <span className="font-semibold">{username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg hover:bg-white/10 border border-white/20 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 shadow-sm transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
        <div className="md:hidden flex space-x-2">
          {username ? (
            <div className="flex flex-col">
              <span className="font-medium">Welcome</span>
              <span>{username}</span>
            </div>
          ) : null}
          {/* Mobile Navigation Toggle - Always visible */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            className="p-2 text-xl rounded-md hover:bg-white/10 transition-colors md:hidden"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <>
          {/* Clickable backdrop that closes the menu */}
          <div
            className="fixed inset-0 bg-black/50 z-40 mt-16 md:hidden"
            onClick={closeMenu}
          />

          {/* Dropdown menu */}
          <div className="fixed right-4 top-16 z-50 w-56 rounded-lg shadow-lg bg-gradient-to-b from-orange-500 to-blue-700 animate-fadeIn overflow-hidden md:hidden">
            <div className="flex flex-col w-full">
              <MobileLink to="/">Home</MobileLink>
              <MobileLink to="/explore">Explore</MobileLink>
              
              <MobileLink to="/history">History</MobileLink>
              {username ? (
                <button
                  onClick={handleLogout}
                  className="py-2 text-lg bg-orange-600 text-red-100 font-medium transition-colors"
                >
                  Logout
                </button>
              ) : (
                <div className="flex flex-col p-2 gap-2 border-t border-white/20">
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="w-full py-2 text-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeMenu}
                    className="w-full py-2 text-center rounded-lg bg-orange-500 hover:bg-orange-600 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
