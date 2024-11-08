chrome.runtime.onInstalled.addListener(() => {
    console.info('Quick ACL for Shopify Installed');
});

chrome.runtime.onStartup.addListener(() => {
    console.info('Quick ACL for Shopify Started');
    console.log('aa');
});
