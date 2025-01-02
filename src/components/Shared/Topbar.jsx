import { UserContext } from '@/Context/UserContext' 
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button";

const Topbar = () => {
  const { userData, setUserToken } = useContext(UserContext)
  const navigate = useNavigate()

   function logOut () {
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/sign-in')
  }

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src={"/assets/images/logo.svg"}
            alt="logo"
            width={130}
            height={325}
          />
        </Link>

        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => logOut()}>
            <img src={"/assets/images/logout.svg"} alt="logout" />
          </Button>
          
          {/* Conditionally render the Link based on userData */}
          {userData && (
            <Link to={`/profile/${userData.id}`} className="flex-center gap-3">
              <img
              src={userData?.profileImage.secure_url}
              alt="profile"
                className="h-8 w-8 rounded-full"
              />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
export default Topbar
