import React from 'react';
import { Button } from '@shopify/polaris';

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
            <Button size="large" fullWidth variant="primary">
                Enable all access groups
            </Button>
        </div>
    );
};
export default APIKeyACLBlock;
