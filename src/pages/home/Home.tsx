import Navbar from "./Navbar";
import { useState } from "react";
import MenuList from "./MenuList";
import Items from "./Items";


export default function Home(): JSX.Element {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);


    return (
        <div>
            <Navbar
                setIsMenuOpen={setIsMenuOpen} />
            {isMenuOpen && <MenuList />}
            <Items />
        </div>
    );
}
