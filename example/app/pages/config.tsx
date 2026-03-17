import React from "react";
import Card from "./card";
import { Stack, StyledPage, StyledHeader, type StyledPageProps, theme } from 'fluent-styles'
import { useNavigation } from "@react-navigation/native";

const Page = ({ title, children }: { title: string, children?: StyledPageProps['children'] }) => {
    const navigation = useNavigation()
    return (
        <StyledPage>
            <StyledHeader borderRadius={32} marginHorizontal={16} paddingHorizontal={32} title={title} showBackArrow={true} backArrowProps={{
                color: theme.colors.gray[500],
                size: 32,
                onPress: () => navigation.goBack()
            }} backgroundColor={theme.colors.gray[1]} />
            <Stack flex={1} vertical marginHorizontal={16}>
                {children}
            </Stack>
        </StyledPage>
    )
}

export type _path = | 'cards' | 'switch' | 'text-inputs' | 'buttons' | 'typography' | 'quick-pad'
export const config: { path: _path, Page: any }[] = [
    {
        path: 'cards',
        Page: () => <Page title="Card" ><Card /></Page>
    }
]


