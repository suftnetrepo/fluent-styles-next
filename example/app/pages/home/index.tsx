
import React from 'react'
import { Stack, StyledText, theme, StyledScrollView, fontStyles, StyledPage, StyleShape, StyledHeader, StyledImageBackground, StyledSpacer, StyledCard } from 'fluent-styles'

const Home = () => {
    return (
        <StyledPage paddingHorizontal={8} backgroundColor={theme.colors.gray[1]}>
            <StyledHeader borderBottomColor={theme.colors.gray[200]} showBackArrow={false} showStatusBar={true}
                title='Fluent Styles' titleAlignment='left' titleProps={{
                    color: theme.colors.gray[800],
                    fontWeight: theme.fontWeight.medium,
                    fontFamily: fontStyles.crimson_text_regular,
                    marginLeft: 8
                }}
                leftIcon={
                    <StyleShape marginLeft={8} borderWidth={0} cycle size="32" backgroundColor={theme.colors.gray[800]} >
                        <StyledText fontFamily={fontStyles.Roboto_Regular} fontSize={theme.fontSize.small} color={theme.colors.gray[100]}>N</StyledText>
                    </StyleShape>
                }
                onBackPress={() => { }
                } paddingVertical={8} backgroundColor={theme.colors.gray[100]} >
            </StyledHeader>
            <StyledSpacer marginVertical={8} />
            <StyledScrollView showsVerticalScrollIndicator={false}>
                <Stack gap={8}>
                    <StyledImageBackground height={400} borderRadius={8} borderWidth={0.4} borderColor={theme.colors.gray[500]} source={require('../../../assets/bus.png')} >
                    </StyledImageBackground>
                    <StyledCard backgroundColor={theme.colors.gray[1]} borderWidth={0.1} borderColor={theme.colors.gray[500]} borderRadius={8} padding={8} shadow="light">
                        <StyledCard.Header>
                            <StyledText fontSize={theme.fontSize.medium} fontWeight={theme.fontWeight.semiBold} color={theme.colors.gray[800]}>Card Title</StyledText>
                        </StyledCard.Header>
                        <StyledSpacer marginVertical={8} />
                        <StyledCard.Image source={require('../../../assets/bus.png')} height={200} borderRadius={8} borderWidth={0.4} borderColor={theme.colors.gray[500]} >
                           </StyledCard.Image>
                        <StyledSpacer marginVertical={8} />
                        <StyledCard.Content>
                            <StyledText fontSize={theme.fontSize.small} color={theme.colors.gray[700]}>This is a description of the card content. It provides additional information about the card.</StyledText>
                        </StyledCard.Content>
                        <StyledSpacer marginVertical={8} />
                        <StyledCard.Footer horizontal gap={8} paddingVertical={12} paddingHorizontal={16} backgroundColor={theme.colors.gray[100]}>
                            <StyleShape padding={8} borderWidth={0} cycle backgroundColor={theme.colors.blue[500]}>
                                <StyledText fontSize={theme.fontSize.small} color={theme.colors.gray[100]}>Action 1</StyledText>
                            </StyleShape>
                            <StyleShape padding={8} borderWidth={0} cycle backgroundColor={theme.colors.blue[500]}>
                                <StyledText fontSize={theme.fontSize.small} color={theme.colors.gray[100]}>Action 2</StyledText>
                            </StyleShape>
                        </StyledCard.Footer>
                    </StyledCard>


                </Stack>
            </StyledScrollView>


        </StyledPage>
    )
}

export default Home
