import { Link, useMatch, useResolvedPath } from "react-router-dom"
import './NavBar.css'; // Import the CSS file


export default function Navbar() {
  return (
    <nav className="navbar"> {/* Update class name to "navbar" */}
      <Link to="/" className="site-title">
        BLISSMED
      </Link>
      <ul>
        <CustomLink to="/GetStartedPage">Home</CustomLink>
        <CustomLink to="/about">About Us</CustomLink>
        <CustomLink to="/BreastCancerInfoPage">Prevention of Breast Cancer </CustomLink>
        <CustomLink to="/GetStartedPage">Predict </CustomLink>
        <CustomLink to="/GetStartedPage">Health Journal </CustomLink>
        <CustomLink to="/contact">Contact Us</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}




