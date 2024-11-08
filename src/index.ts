console.info('Quick ACL for Shopify Started');

const initCheckAllButton = (polarisTabs: Element) => {
    console.log('initCheckAllButton');

    const button = document.createElement('button');
    button.innerHTML = 'Enable all access groups';
    button.style.position = 'absolute';
    button.style.marginTop = '4px';
    button.style.right = '20px';
    button.style.height = '40px';
    button.style.visibility = 'visible';
    button.classList.add(
        'Polaris-Button',
        'Polaris-Button--pressable',
        'Polaris-Button--variantPrimary',
        'Polaris-Button--sizeMedium',
        'Polaris-Button--textAlignCenter',
    );
    polarisTabs.appendChild(button);
};

const observer = new MutationObserver((mutations, observer) => {
    const polarisTabs = document
        ?.querySelector('input[type=search]')
        ?.closest('.Polaris-LegacyCard')
        ?.querySelector('.Polaris-LegacyTabs');

    console.log(polarisTabs);
    if (polarisTabs) {
        initCheckAllButton(polarisTabs);
        observer.disconnect();
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});
