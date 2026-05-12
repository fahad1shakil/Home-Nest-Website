import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FallingLines } from "react-loader-spinner";
import { Link, NavLink } from "react-router";
import logo from "../assets/logo_new.png";
import { useAuth } from "../hooks/useAuth";
import Container from "./Container";

const Navbar = () => {
  const { user, setUser, loading, setLoading, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const documentHtml = document.querySelector("html");
    documentHtml.setAttribute("data-theme", theme);
    if (theme === "dark") {
      documentHtml.classList.add("dark");
    } else {
      documentHtml.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = (isChecked) => {
    setTheme(isChecked ? "dark" : "light");
  };

  const logOutHandler = () => {
    logOut()
      .then(() => {
        toast.success("Logout Successful"), setLoading(false), setUser(null);
      })
      .catch((err) => toast.error(err.message));
  };
  const navItems = (
    <>
      {/* Main Home Page */}
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "bg-primary/10 text-primary font-bold" : "hover:text-primary transition-colors"
          }
          to="/"
        >
          Home
        </NavLink>
      </li>

      {/* Public Listings Page */}
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "bg-primary/10 text-primary font-bold" : "hover:text-primary transition-colors"
          }
          to="/all-properties"
        >
          All Properties
        </NavLink>
      </li>

      {/* User's Own Listed Properties */}
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "bg-primary/10 text-primary font-bold" : "hover:text-primary transition-colors"
          }
          to="/my-properties"
        >
          My Properties
        </NavLink>
      </li>

      {/* User's Ratings and Reviews */}
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "bg-primary/10 text-primary font-bold" : "hover:text-primary transition-colors"
          }
          to="/my-ratings"
        >
          My Ratings
        </NavLink>
      </li>

      {/* Action: Add a New Property Listing */}
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "bg-primary/10 text-primary font-bold" : "hover:text-primary transition-colors"
          }
          to="/add-properties"
        >
          Add Properties
        </NavLink>
      </li>
    </>
  );
  return (
    <div
      className={`sticky top-0 z-[100] bg-base-100/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-transform duration-500 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Container>
        <div className="navbar justify-between px-2 py-2 sm:px-4 top-0 z-50">
          <div className="navbar-start flex-none w-auto">
            <button
              className="md:hidden btn btn-ghost btn-circle btn-sm me-0.5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-[#0F5660]" />
              ) : (
                <Menu className="w-5 h-5 text-[#0F5660]" />
              )}
            </button>
            <Link to="/" className="flex items-center gap-3 sm:gap-4 group">
              <div className="p-1 sm:p-1.5 bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-100 group-hover:scale-110 transition-transform duration-300">
                <img className="w-6 h-6 sm:w-8 sm:h-8 object-contain" src={logo} alt="logo" />
              </div>
              <span className="text-base sm:text-xl lg:text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                HomeNest
              </span>
            </Link>
          </div>

          <div className="navbar-center hidden md:flex items-center gap-2">
            <ul className="menu menu-horizontal px-1 hidden md:flex">
              {navItems}
            </ul>

            {/* Mobile Menu */}
            <div className="md:hidden dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <Menu className="w-6 h-6 text-primary" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu menu-sm mt-2 p-2 shadow bg-base-100 rounded-box "
              >
                {navItems}
              </ul>
            </div>
          </div>
          <div className="navbar-end flex-none w-auto">
            <div className="flex justify-end items-center gap-1">
              {loading ? (
                <FallingLines
                  color="#0e5660"
                  width="40"
                  visible={true}
                  ariaLabel="falling-circles-loading"
                />
              ) : user ? (
                <div className="dropdown dropdown-end cursor-pointer">
                  <div tabIndex={0} role="button">
                    <img
                      className="w-10 rounded-full h-10"
                      src={user?.photoURL}
                      alt={user?.displayName}
                      title={user?.displayName}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <ul
                    tabIndex="-1"
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                  >
                    <li>
                      <a>{user?.displayName}</a>
                    </li>
                    <li>
                      <a>{user?.email}</a>
                    </li>
                    <li>
                      <button onClick={logOutHandler}>LogOut</button>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <Link to="/login" className="btn btn-xs sm:btn-sm md:btn-md border border-primary/30 hover:border-primary bg-primary/5 hover:bg-primary/10 text-primary font-bold px-2 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-300">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn-premium px-2 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 text-[10px] sm:text-xs md:text-sm lg:text-base"
                  >
                    Register
                  </Link>
                </>
              )}
              <div>
                {/* STYLISH TOGGLE BUTTON */}
                <button
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-2xl bg-gray-100 dark:bg-slate-800 hover:bg-primary/10 transition-all duration-300 group shadow-inner ms-1 sm:ms-2"
                  aria-label="Toggle Theme"
                >
                  {theme === "light" ? (
                    <Moon className="h-5 w-5 sm:h-6 sm:w-6 text-slate-700" />
                  ) : (
                    <Sun className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-sm animate-slideDown">
            <ul className="flex flex-col gap-3 py-3 px-6 text-gray-700 font-medium">
              {navItems}
            </ul>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Navbar;
