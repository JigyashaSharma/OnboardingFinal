/**
 * This file creates the Nav menu that display React(Home), Customers, Products, Stores, Sales on screen
 */
import { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, NavItem, Collapse, NavbarToggler } from 'reactstrap';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <Navbar className="navbar-expand-sm navbar-light bg-dark sticky top-0 md" >
                <NavbarToggler onClick={this.toggleNavbar} />
                <Collapse isOpen={!this.state.collapsed} navbar>
                    <NavItem>
                        <Link to="/" className="title"> React</Link>
                    </NavItem>
                    {/*<Nav className="ms-auto" navbar> This needed if I want below navitems to shift right*/}
                    <NavItem>
                        <NavLink className="nav-link-custom" to="/customers">Customers</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link-custom" to="/products">Products</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link-custom"  to="/stores">Stores</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link-custom"  to="/sales">Sales</NavLink>  {/*NavLink automatically highlights the link when hovered */}
                    </NavItem>
                </Collapse>
            </Navbar>
        );
    }
}
