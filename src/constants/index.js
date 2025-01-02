import wallpaper from '../../public/assets/images/wallpaper.svg'
import people from '../../public/assets/images/people.svg'
import bookmark from '../../public/assets/images/bookmark.svg'
import gallery from '../../public/assets/images/gallery-add.svg'
import Home from '../../public/assets/images/Home.svg'
import Alert from '../../public/assets/images/appointment.png'

export const sidebarLinks = [
    {
      imgURL: Home,
      route: "/",
      label: "Home",
    },
    {
      imgURL: wallpaper,
      route: "/explore",
      label: "Explore",
    },
    {
      imgURL: people,
      route: "/all-users",
      label: "People",
    },
    {
      imgURL: bookmark,
      route: "/saved",
      label: "Saved",
    },
    {
      imgURL: gallery,
      route: "/create-post",
      label: "Create Post",
    },
    {
      imgURL: Alert,
      route: "/notification",
      label: "Notifications",
    },

  ];
  
  export const bottombarLinks = [
    {
      imgURL: Home,
      route: "/",
      label: "Home",
    },
    {
      imgURL: wallpaper,
      route: "/explore",
      label: "Explore",
    },
    {
      imgURL: bookmark,
      route: "/saved",
      label: "Saved",
    },
    {
      imgURL: gallery,
      route: "/create-post",
      label: "Create",
    },

  ];