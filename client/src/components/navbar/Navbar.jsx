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
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import { logout } from "../../managers/authManager";
import "./Navbar.css"

export default function NavBar({ loggedInUser, setLoggedInUser })
{
    const [open, setOpen] = useState(false);

    const toggleNavbar = () => setOpen(!open);

    return (
        <div className="take-space ">
            <Navbar className="bg-black-olive border-bottom border-black border-2" light fixed="top" expand="lg">
                <NavbarBrand className="mr-auto my-text" tag={RRNavLink} to="/">
                    🃏Blast Deck🃏
                </NavbarBrand>
                {loggedInUser ? (
                    <>
                        <NavbarToggler onClick={toggleNavbar} />
                        <Collapse isOpen={open} navbar>
                            <Nav className="me-auto" navbar>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle className="my-text" nav caret>
                                        Card
                                    </DropdownToggle>
                                    <DropdownMenu className="bg-battleship-gray" end>
                                        <DropdownItem>
                                            <NavLink className="my-text" href="/card">
                                                All Cards
                                            </NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink className="my-text" href="/card/mine">
                                                My Cards
                                            </NavLink>
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            <NavLink className="my-text" href="/card/create">
                                                Create Card
                                            </NavLink>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle className="my-text" nav caret>
                                        Set
                                    </DropdownToggle>
                                    <DropdownMenu className="bg-battleship-gray" end>
                                        <DropdownItem>
                                            <NavLink className="my-text" href="/set">
                                                My Sets
                                            </NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink className="my-text" href="/set">
                                                Create Set
                                            </NavLink>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
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