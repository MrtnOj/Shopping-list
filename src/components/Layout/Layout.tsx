import React, { Fragment } from 'react';
import Header from '../Header';

const Layout = (props: any) => {
    return (
        <Fragment>
            <Header />
            <main>
                {props.children}
            </main>
        </Fragment>
    )
}

export default Layout;