import React from 'react';
import { Button } from '@shopify/polaris';

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

const APIKeyACLBlock: React.FC = () => {
    return (
        <div
            style={{
                position: 'absolute',
                marginTop: '8px',
                right: '20px',
                height: '40px',
                visibility: 'visible',
            }}
        >
            <Button
                size="large"
                fullWidth
                variant="primary"
                onClick={selectAllAccessGroups}
            >
                Enable all access groups
            </Button>
        </div>
    );
};
export default APIKeyACLBlock;
