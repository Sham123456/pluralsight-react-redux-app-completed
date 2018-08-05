import React from 'react';
import {Link, IndexLink} from 'react-router';

const Header = (props) => {
    return(
        <nav>
            <IndexLink to="/" activeClassName="active">Home</IndexLink>
            {" | "}
            <Link to="/about" activeClassName="active">About</Link>
            {" | "}
            <Link to="/courses" activeClassName="active">Courses</Link>
        </nav>
    );
};

export default Header;