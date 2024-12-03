import Container from "react-bootstrap/Container"; // Bootstrap container for layout
import Nav from "react-bootstrap/Nav"; // Bootstrap Nav component for navigation links
import Navbar from "react-bootstrap/Navbar"; // Bootstrap Navbar for creating navigation bars
import "./../App.css"; // Import custom styles for additional design customization

/**
 * Header Component
 * This component renders a responsive navigation bar using Bootstrap.
 */
function Header() {
  return (
    <>
      {/* Navbar with a light background, expanded design for large screens, and custom styles */}
      <Navbar bg="light" className="custom-navbar" expand="lg">
        <Container fluid>
          {/* Brand Name */}
          <Navbar.Brand href="#home" className="navbar-brand-custom">
            Responsive Navbar
          </Navbar.Brand>

          {/* Toggle Button (visible on smaller screens) */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Collapsible Navigation Menu */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* Navigation Links */}
              <Nav.Link href="#home" className="nav-link-custom">
                Home
              </Nav.Link>
              <Nav.Link href="#features" className="nav-link-custom">
                Features
              </Nav.Link>
              <Nav.Link href="#pricing" className="nav-link-custom">
                Pricing
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
