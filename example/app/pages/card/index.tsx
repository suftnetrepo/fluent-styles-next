
import React, { Fragment } from 'react'
import { ChevronRight, Stack, StyledText, StyledDivider, theme, StyledScrollView, StyleShape, StyledSpacer, StyledCard } from 'fluent-styles'


const Card = () => {

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
    const renderCard = ({ name, index, lastIndex }: props) => {
        return (
            <>
                <Stack horizontal justifyContent='space-between' alignItems='center' paddingVertical={8}>
                    <StyledText fontSize={theme.fontSize.medium} fontWeight={theme.fontWeight.normal} color={theme.colors.gray[800]}>{name}</StyledText>
                    <StyleShape padding={8} borderWidth={0} cycle>
                        <ChevronRight size={16} color={theme.colors.gray[800]} strokeWidth={2} />
                    </StyleShape>
                </Stack>
                {index !== lastIndex && <StyledDivider marginVertical={2} />}
            </>
        )
    }

    return (
        <Fragment>
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
        </Fragment>
    )
}

export default Card