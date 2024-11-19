import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, InlineStack, Label } from '@shopify/polaris';
import { AccessRightsType } from './types';

const checkboxesSelector = '.Polaris-LegacyCard input[type=checkbox]';
const aclPopoverId = 'acl-popover';

const getCheckBoxes = (
    accessRightsType: AccessRightsType,
): HTMLInputElement[] => {
    const checkboxes = document.querySelectorAll(
        checkboxesSelector,
    ) as NodeListOf<HTMLInputElement>;

    return Array.from(checkboxes);
};

const selectAccessGroups = (accessRightsType: AccessRightsType) => {
    const checkboxes = getCheckBoxes(accessRightsType);

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

    useEffect(() => {
        if (accessRightsType === null) {
            return;
        }

        if (accessRightsType === '') {
            clearAccessGroups();
            return;
        }

        selectAccessGroups(accessRightsType);
        console.log(accessRightsType);
    }, [accessRightsType]);

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
                <Label id="access-rights-label">Select group</Label>
                <ButtonGroup variant="segmented">
                    <Button
                        variant={
                            accessRightsType === AccessRightsType.WRITE
                                ? 'primary'
                                : 'secondary'
                        }
                        size="large"
                        onClick={() =>
                            setAccessRightsType(AccessRightsType.WRITE)
                        }
                    >
                        All
                    </Button>
                    <Button
                        variant={
                            accessRightsType === AccessRightsType.READ
                                ? 'primary'
                                : 'secondary'
                        }
                        onClick={() =>
                            setAccessRightsType(AccessRightsType.READ)
                        }
                        size="large"
                    >
                        Read Only
                    </Button>
                    <Button
                        variant="secondary"
                        size="large"
                        tone="critical"
                        onClick={() => setAccessRightsType('')}
                    >
                        Clear
                    </Button>
                </ButtonGroup>
            </InlineStack>
        </div>
    );
};
export default APIKeyACLBlock;
