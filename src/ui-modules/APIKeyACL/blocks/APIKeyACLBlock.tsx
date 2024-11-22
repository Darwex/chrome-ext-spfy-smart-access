import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, InlineStack } from '@shopify/polaris';
import { AccessRightsType } from './types';
import { chainFunctionsWithTimeout } from '../../utils/chainFunctionsWithTimeout';

const checkboxesSelector = '.Polaris-LegacyCard input[type=checkbox]';

const getCheckBoxes = (): HTMLInputElement[] => {
    const checkboxes = document.querySelectorAll(
        checkboxesSelector,
    ) as NodeListOf<HTMLInputElement>;

    return Array.from(checkboxes);
};

const selectAccessGroups = (accessRightsType: AccessRightsType) => {
    const checkboxes = getCheckBoxes();

    checkboxes.forEach((input) => {
        const inputLabel = input.closest('label')?.textContent;

        if (accessRightsType === AccessRightsType.WRITE) {
            if (input.checked === true) return;
            input.click();
            return;
        }

        if (inputLabel?.startsWith(accessRightsType) && !input.checked) {
            input.click();
        } else if (!inputLabel?.startsWith(accessRightsType) && input.checked) {
            input.click();
        }
    });
};

const clearAccessGroups = () => {
    const checkboxes = getCheckBoxes(AccessRightsType.WRITE);

    checkboxes.forEach((input) => {
        if (!input.checked === true) return;
        input.click();
    });
};

const APIKeyACLBlock: React.FC = () => {
    const [accessRightsType, setAccessRightsType] = useState<
        AccessRightsType | null | ''
    >(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (accessRightsType === null) {
            return;
        }

        chainFunctionsWithTimeout([
            { func: () => setIsLoading(true), timeout: 100 },
            {
                func: () => {
                    if (accessRightsType === '') {
                        clearAccessGroups();
                        return;
                    }

                    selectAccessGroups(accessRightsType);
                },
                timeout: 101,
            },
            { func: () => setIsLoading(false), timeout: 102 },
        ]);
    }, [accessRightsType]);

    const accessRightsOptions: {
        label: string;
        value: AccessRightsType | '';
        handler: () => void;
        tone?: 'success' | 'critical';
    }[] = [
        {
            label: 'All',
            value: AccessRightsType.WRITE,
            handler: () => setAccessRightsType(AccessRightsType.WRITE),
        },
        {
            label: 'Read Only',
            value: AccessRightsType.READ,
            handler: () => setAccessRightsType(AccessRightsType.READ),
        },
        {
            label: 'Clear',
            value: '',
            handler: () => setAccessRightsType(''),
            tone: 'critical',
        },
    ];

    return (
        <div
            style={{
                position: 'absolute',
                marginTop: '8px',
                right: '17px',
                height: 'auto',
                zIndex: 10000,
                visibility: 'visible',
            }}
        >
            <InlineStack gap="200" blockAlign="center">
                <ButtonGroup variant="segmented">
                    {accessRightsOptions.map((option) => (
                        <Button
                            key={option.value}
                            variant={
                                option.value === accessRightsType
                                    ? 'primary'
                                    : 'secondary'
                            }
                            tone={option.tone}
                            onClick={option.handler}
                        >
                            {isLoading && accessRightsType === option.value
                                ? 'Executing...'
                                : option.label}
                        </Button>
                    ))}
                </ButtonGroup>
            </InlineStack>
        </div>
    );
};
export default APIKeyACLBlock;
