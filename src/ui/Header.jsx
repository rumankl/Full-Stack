import { Button, Navbar, Typography } from "@material-tailwind/react";
import ProfileMenu from "./ProfileMenu";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import SearchInput from "../features/search/SearchInput";

export function Header() {
  const nav = useNavigate();

  const { user } = useSelector((state) => state.userSlice);


  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <div className=" flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          Material Tailwind
        </Typography>



        <div className="flex gap-4">
          <SearchInput />

          {user ? <ProfileMenu user={user} /> : <Button onClick={() => nav('/login')} size="sm" variant="text">
            <span>Log In</span>
          </Button>}

        </div>



      </div>

    </Navbar>
  );
}





