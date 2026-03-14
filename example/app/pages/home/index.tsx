
import React from 'react'
import { Stack, StyledText, theme, fontStyles, StyledPage, StyleShape, StyledHeader } from 'fluent-styles'

const Home = () => {
    return (
        <StyledPage backgroundColor={theme.colors.gray[1]}>
            <StyledHeader borderBottomColor={theme.colors.gray[200]} showBackArrow={false} showStatusBar={true}
                title='Fluent Styles' titleAlign='left' titleProps={{
                    color: theme.colors.gray[800],
                    fontWeight: theme.fontWeight.medium,
                    fontFamily: fontStyles.crimson_text_regular,
                    marginLeft:8
                }}
                leftIcon={
                    <StyleShape marginLeft={8} borderWidth={0} cycle size="32" backgroundColor={theme.colors.gray[800]} >
                        <StyledText fontFamily={fontStyles.Roboto_Regular} fontSize={theme.fontSize.small} color={theme.colors.gray[100]}>N</StyledText>
                    </StyleShape>
                }
                onPress={() => { }
                } paddingVertical={8} backgroundColor={theme.colors.gray[50]} >
            </StyledHeader>
            <Stack flex={1} padding={48} vertical justifyContent='center' alignItems='center'>
                <StyledText fontFamily={fontStyles.Roboto_Regular} borderWidth={0.5} borderRadius={30} paddingVertical={8} fontSize={theme.fontSize.normal} paddingHorizontal={20} color={theme.colors.cyan[500]}>Not Home</StyledText>

            </Stack>
        </StyledPage>
    )
}

export default Home
