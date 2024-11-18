console.info('Quick ACL for Shopify Started');

const getSpinner = () => {
    const spinnerHTML = `
      <span class="Polaris-Spinner Polaris-Spinner--sizeSmall" style="margin-left: 10px;">
        <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.542 1.487A21.507 21.507 0 00.5 22c0 11.874 9.626 21.5 21.5 21.5 9.847 0 18.364-6.675 20.809-16.072a1.5 1.5 0 00-2.904-.756C37.803 34.755 30.473 40.5 22 40.5 11.783 40.5 3.5 32.217 3.5 22c0-8.137 5.3-15.247 12.942-17.65a1.5 1.5 0 10-.9-2.863z">
          </path>
        </svg>
      </span>
    `;

    const htmlElementFromString = (htmlString: string): HTMLElement => {
        const template = document.createElement('template');
        template.innerHTML = htmlString.trim();
        return template.content.firstChild as HTMLElement;
    };

    return htmlElementFromString(spinnerHTML);
};

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
    const executeWithDelays = (offset: number, functions: (() => void)[]) => {
        if (functions.length === 0) return;
        const [firstFunction, ...restFunctions] = functions;
        setTimeout(() => {
            firstFunction();
            executeWithDelays(offset, restFunctions);
        }, offset);
    };

    button.addEventListener('click', () => {
        const spinner = getSpinner();
        executeWithDelays(100, [
            () => button.appendChild(spinner),
            selectAllAccessGroups,
            () => button.removeChild(spinner),
        ]);
    });
    polarisTabs.appendChild(button);
};

const selectAllAccessGroups = () => {
    const checkboxes = document.querySelectorAll(
        '.Polaris-LegacyCard input[type=checkbox]',
    ) as NodeListOf<HTMLInputElement>;

    checkboxes.forEach((input) => {
        if (input.checked === true) return;
        console.log(
            input.closest('.Polaris-Choice')?.querySelector('code')?.innerHTML,
        );
        input.click();
    });
};

const observer = new MutationObserver((mutations, observer) => {
    const polarisTabs = document
        ?.querySelector('input[type=search]')
        ?.closest('.Polaris-LegacyCard')
        ?.querySelector('.Polaris-LegacyTabs');

    if (polarisTabs) {
        initCheckAllButton(polarisTabs);
        observer.disconnect();
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});
