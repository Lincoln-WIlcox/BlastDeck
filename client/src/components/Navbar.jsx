import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import
{
    Button,
    Collapse,
    Nav,
    NavLink,
    NavItem,
    Navbar,
    NavbarBrand,
    NavbarToggler,
} from "reactstrap";
import { logout } from "../managers/authManager";

export default function NavBar({ loggedInUser, setLoggedInUser })
{
    const [open, setOpen] = useState(false);

    const toggleNavbar = () => setOpen(!open);

    return (
        <div>
            <Navbar className="bg-black-olive border-bottom border-black border-2" light fixed="top" expand="lg">
                <NavbarBrand className="mr-auto my-text " tag={RRNavLink} to="/">
                    🃏Blast Deck🃏
                </NavbarBrand>
                {loggedInUser ? (
                    <>
                        <NavbarToggler onClick={toggleNavbar} />
                        <Collapse isOpen={open} navbar>
                            <Nav navbar></Nav>
                        </Collapse>
                        <Button
                            color="primary"
                            onClick={(e) =>
                            {
                                e.preventDefault();
                                setOpen(false);
                                logout().then(() =>
                                {
                                    setLoggedInUser(null);
                                    setOpen(false);
                                });
                            }}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <Nav navbar>
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/login">
                                <Button color="primary">Login</Button>
                            </NavLink>
                        </NavItem>
                    </Nav>
                )}
            </Navbar>
        </div>
    );
}