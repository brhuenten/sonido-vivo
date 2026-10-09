import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
    return(
        <>
              <Header/>
            <main>
              <Outlet />

            </main>
        
              <Footer />
        </>
    )
}
