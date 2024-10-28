import Navbar from "./Navbar";
import { useState } from "react";
import MenuList from "./MenuList";
import Items from "./Items";
import { Toaster } from "react-hot-toast";
import LogoutModal from "../../components/ui/LogoutModal";


export default function Home(): JSX.Element {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [logoutModal, setLogoutModal] = useState<boolean>(false);


    return (
        <div>
            {logoutModal && <LogoutModal setLogoutModal={setLogoutModal} />}
            <Navbar
                setLogoutModal={setLogoutModal}
                setIsMenuOpen={setIsMenuOpen} />
            <Toaster />
            {isMenuOpen && <MenuList
                setLogoutModal={setLogoutModal}
                setIsMenuOpen={setIsMenuOpen} />}
            <Items />
        </div>
    );
}
