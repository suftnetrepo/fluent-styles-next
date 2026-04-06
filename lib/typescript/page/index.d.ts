import React from 'react';
import { StyledSafeAreaViewProps } from '../safeAreaView';
type StyledPageProps = StyledSafeAreaViewProps & {
    children?: React.ReactNode;
};
declare const StyledPage: {
    ({ children, ...props }: StyledPageProps): React.JSX.Element;
    displayName: string;
};
export { StyledPage };
export type { StyledPageProps };
//# sourceMappingURL=index.d.ts.map