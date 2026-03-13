
import React from 'react'
import { Stack, StyledText, theme, fontStyles, StyledPage, StyleShape, StyledHeader } from 'fluent-styles'

const Home = () => {
    return (
        <StyledPage backgroundColor={theme.colors.gray[1]}>
            <StyledHeader  showBackArrow showStatusBar={true} 
               statusBarProps={{
                barStyle: 'dark-content',
                hidden: false,
            }} backArrowProps={{
                color: theme.colors.gray[100],
                size: 48
            }} title='Home Page' titleProps={{
                color: theme.colors.gray[1],
                marginHorizontal : 24
            }} paddingVertical={18} paddingHorizontal={32} backgroundColor={theme.colors.gray[800]} >
                <StyledText fontFamily={fontStyles.Roboto_Regular} fontSize={theme.fontSize.normal} color={theme.colors.gray[100]}>N</StyledText>
            </StyledHeader>
            <Stack flex={1} padding={48} vertical justifyContent='center' alignItems='center'>
                <StyledText fontFamily={fontStyles.Roboto_Regular} borderWidth={0.5} borderRadius={30} paddingVertical={8} fontSize={theme.fontSize.normal} paddingHorizontal={20} color={theme.colors.cyan[500]}>Not Home</StyledText>
                <StyleShape borderWidth={0} cycle size="48" backgroundColor={theme.colors.gray[800]} >
                    <StyledText fontFamily={fontStyles.Roboto_Regular} fontSize={theme.fontSize.normal} color={theme.colors.gray[100]}>N</StyledText>

                </StyleShape>
            </Stack>
        </StyledPage>
    )
}

export default Home
