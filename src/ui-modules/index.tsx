import React from 'react';
import ReactDOM from 'react-dom/client';
import APIKeyACLBlock from './APIKeyACL/blocks/APIKeyACLBlock';
import { AppProvider } from '@shopify/polaris';
import en from './i18n/en';

const observer = new MutationObserver((mutations, observer) => {
    const polarisTabs = document
        ?.querySelector('input[type=search]')
        ?.closest('.Polaris-LegacyCard')
        ?.querySelector('.Polaris-LegacyTabs');

    if (polarisTabs) {
        ReactDOM.createRoot(polarisTabs).render(
            <React.StrictMode>
                <AppProvider i18n={en}>
                    <APIKeyACLBlock />
                </AppProvider>
            </React.StrictMode>,
        );
        observer.disconnect();
    }
});

let lastUrl = location.href;

const observeChanges = () => {
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
};

new MutationObserver(() => {
    const currentUrl = location.href;

    if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        observeChanges();
    }
}).observe(document, { subtree: true, childList: true });

window.addEventListener('load', observeChanges);
