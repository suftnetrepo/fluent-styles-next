
import React, { Fragment } from 'react'
import { ChevronRight, Stack, StyledText, theme, StyledScrollView, fontStyles, StyledPage, StyleShape, StyledHeader, StyledSpacer, StyledCard } from 'fluent-styles'

const Home = () => {

    const data = [
        {
            name: 'Quick Pad',
            route: 'quick-pad'
        },
        {
            name: 'Typography',
            route: 'typography'
        },
        {
            name: 'Buttons',
            route: 'buttons'
        },
        {
            name: 'Cards',
            route: 'cards'
        },
        {
            name: 'Switches',
            route: 'switches'
        },
        {
            name: 'Text Inputs',
            route: 'text-inputs'
        },
    ]

    type props = {
        name: string
        route: string
        index: number
        lastIndex: number
    }
    const renderCard = ({ name, route, index, lastIndex }: props) => {
        return (
            <>
                <Stack horizontal justifyContent='space-between' alignItems='center' paddingVertical={8}>
                    <StyledText fontSize={theme.fontSize.medium} fontWeight={theme.fontWeight.normal} color={theme.colors.gray[800]}>{name}</StyledText>
                    <StyleShape padding={8} borderWidth={0} cycle>
                        <ChevronRight size={16} color={theme.colors.gray[800]} strokeWidth={2} />
                    </StyleShape>
                </Stack>
                {index !== lastIndex && <StyledSpacer borderBottomWidth={1} borderBottomColor={theme.colors.gray[200]} marginVertical={2} />}
            </>
        )
    }

    return (
        <StyledPage paddingHorizontal={8} backgroundColor={theme.colors.gray[100]}>
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
                <StyledCard backgroundColor={theme.colors.gray[1]} marginHorizontal={1} borderWidth={0.5} borderColor={theme.colors.gray[1]} borderRadius={32} padding={16} >
                    {
                        data.map((item, index) => (
                            <Fragment key={index}>
                                {renderCard({ ...item, index, lastIndex: data.length - 1 })}
                            </Fragment>
                        ))
                    }
                </StyledCard>
            </StyledScrollView>
        </StyledPage>
    )
}

export default Home
