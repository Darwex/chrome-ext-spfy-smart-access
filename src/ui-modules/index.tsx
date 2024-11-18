import React from 'react';
import ReactDOM from 'react-dom/client';
import APIKeyACLBlock from './APIKeyACL/blocks/APIKeyACLBlock';
import { AppProvider } from '@shopify/polaris';

const observer = new MutationObserver((mutations, observer) => {
    const polarisTabs = document
        ?.querySelector('input[type=search]')
        ?.closest('.Polaris-LegacyCard')
        ?.querySelector('.Polaris-LegacyTabs');

    console.log(polarisTabs);
    if (polarisTabs) {
        ReactDOM.createRoot(polarisTabs).render(
            <React.StrictMode>
                <AppProvider i18n={{}}>
                    <APIKeyACLBlock />
                </AppProvider>
            </React.StrictMode>,
        );
        observer.disconnect();
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});
