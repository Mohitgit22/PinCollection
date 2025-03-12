
import Image from "../image/image";
import UserButton from "../userButton/userButton";
import "./topBar.css";
const TopBar = () => {


  return (
    <div className="topBar">
      {/* SEARCH */}
      <form  className="search">
      <a href="/">
        <Image path="/general/search.svg" alt="" />
      </a>
        <input type="text" placeholder="Search" />
      </form>
      {/* USER */}
      <UserButton />
    </div>
  );
};

export default TopBar;