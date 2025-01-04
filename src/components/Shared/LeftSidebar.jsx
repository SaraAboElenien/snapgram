import { UserContext } from '@/Context/UserContext';
import React, { useContext } from 'react';
import logo11 from '../../../public/assets/images/logo.svg';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Loader from "@/components/Shared/Loader";
import logout from '../../../public/assets/images/logout.svg'
import { sidebarLinks } from "@/constants";
import { Button } from "@/components/ui/button";



const LeftSidebar = () => {
  const { userData, loading, setUserToken } = useContext(UserContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();


  function logOut() {
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/sign-in')
  }



  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img src={logo11} alt="logo" width={170} height={36} />
        </Link>

        {/* Conditionally render the profile section */}
        {loading || !userData ? (
          <div className="h-14">
            <Loader />
          </div>
        ) : (
          userData.email && (
            <Link to={`/profile/${userData?._id}`} className="flex-center gap-3">
              <img
                src={userData.profileImage?.secure_url || "/assets/images/profile-placeholder.svg"}
                alt="profile"
                className="h-10 w-10 rounded-full"
              />
              <div className="flex flex-col">
                <p className="body-bold text-light-1">{`Welcome ${userData.firstName}`}</p>
                <p className="small-regular text-light-3">
                  @{`${userData.firstName} ${userData.lastName}`}
                </p>
              </div>
            </Link>
          )
        )}

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group  ${isActive && "bg-primary-500"
                  }`}>
                <NavLink
                  to={link.route}
                  className="flex gap-2 items-center p-2 text-light-1">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={` text-light-1  group-hover:invert-white w-7 h-7 ${isActive && "invert-white"
                      }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>


        <Button
          variant="ghost"
          className="shad-button_ghost my-8"
          onClick={() => logOut()}>
          <img src={logout} alt="logout" />
          <p className="small-medium lg:base-medium text-light-1">Logout</p>
        </Button>
      </div>




    </nav>
  );
};

export default LeftSidebar;
