import React from 'react';
import { StyledSafeAreaView, StyledSafeAreaViewProps } from '../safeAreaView';

type StyledPageProps = StyledSafeAreaViewProps & {
    children?: React.ReactNode;
}

const StyledPage = ({ children, ...props }: StyledPageProps) => {
    return (
        <StyledSafeAreaView {...props}>
            {children}
        </StyledSafeAreaView>
    )
}

StyledPage.displayName = 'StyledPage';

export { StyledPage };
export type { StyledPageProps };