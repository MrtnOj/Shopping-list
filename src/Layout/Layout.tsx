import React, { Fragment } from 'react';
import Header from '../Header/containers/Header';

const layout = (props: any) => {
    return (
        <Fragment>
            <Header />
            <main>
                {props.children}
            </main>
        </Fragment>
    )
}

export default layout;