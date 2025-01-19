import styled from "styled-components";
import Wrapper from "../assets/wrapper/NavBar";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import { useLogout } from "../../features/authentication/useLogOut";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useState } from "react";
import { useSelector } from "react-redux";
import FriendRequest from "./FriendRequest";

function NavBar({ toggleDarkTheme, isDarkTheme }) {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.user);
  const [search, setSearch] = useState("");
  //console.log(search);

  //console.log(user);
  const { logout } = useLogout();
  function handleLogOut() {
    logout();
  }
  // function toggleDarkTheme() {
  //   const newDarkTheme = !isDarkTheme;
  //   setIsDarkTheme(newDarkTheme);
  //   // then if newDarkTheme is true will add class dark-theme to body , if false it will remove it
  //   document.body.classList.toggle("dark-theme", newDarkTheme);
  //   localStorage.setItem("darkTheme", newDarkTheme);
  // }
  function handleSearch(e) {
    e.preventDefault();

    if (search.length < 2) return;
    //console.log(search);
    navigate(`/findfriends/${search}`);
    setSearch("");
  }
  return (
    <Wrapper>
      <div>
        <Logo />
      </div>
      <div className="search">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="By Name..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </form>
        <LuSearch />
      </div>
      <nav className="nav-account-info">
        <div className="show-logout">
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.name}
              fetchpriority="high"
            />
          ) : (
            <MdOutlineAccountCircle className="svg" />
          )}
          <div className="logout">
            <Link to="personalpage"> Personal page</Link>
            <Link to="profilepicturepage">Profile picture</Link>
            <Link to="uploadpostpage">Create post</Link>
            <button className="logoutbutton" onClick={handleLogOut}>
              LOG Out !
            </button>
          </div>
        </div>
        <span>
          <FriendRequest />
        </span>

        <Link to="/homepage" className="tooltip">
          <IoHomeOutline className="svg" />
          <span className="tooltiptext">Home</span>
        </Link>
      </nav>
    </Wrapper>
  );
}

export default NavBar;
