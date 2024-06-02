import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import MessageComponent from './components/MessageDisplay/MessageComponent';
import { Page } from '@shopify/polaris';
const Layout = () => {
    const location = useLocation();
    const { state } = location;
    const message = state?.message;
    const description = state?.description;
    const tone = state?.tone || 'success'; // デフォルトトーンを'success'に設定

    return (
        <>
            <Page>
                {message && <MessageComponent message={message} description={description} tone={tone} />}
            </Page>
            <Outlet />
        </>
    );
};

export default Layout;