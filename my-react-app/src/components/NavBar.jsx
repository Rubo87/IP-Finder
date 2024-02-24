import React from 'react';

function NavBar() {
    return (
        <div className='navContainter'>
            <a href="#"><div className='navItems'>Home</div></a>
            <a href="#"><div className='navItems'>Locations</div></a>
            <a href="#"><div className='navItems'>Contact</div></a>
        </div>
    )
}

export default NavBar;