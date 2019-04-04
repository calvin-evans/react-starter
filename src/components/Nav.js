import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'
import navStyles from '../styles/Nav.module.scss'

const Nav = () => (
  <nav className={navStyles.root}>
    <Link to="/">
      <div className={navStyles.logo}>
        <h1>Express<br/>Starter</h1>
      </div>
    </Link>
    <ul className={navStyles.links}>
      <NavLink to="/appointments" activeClassName={navStyles.activeLink}>
        <li className={navStyles.link}>
          <FiHome /> Home
        </li>
      </NavLink>
    </ul>
  </nav>
)

export default Nav
