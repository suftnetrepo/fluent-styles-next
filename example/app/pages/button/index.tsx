
import React, { Fragment } from 'react'
import { ChevronRight, Stack, StyledText, StyledDivider, theme, StyledScrollView, StyleShape, StyledSpacer, StyledCard, StyledButton } from 'fluent-styles'

const Button = () => {

    return (
        <Fragment>
            <StyledSpacer marginVertical={8} />
            <StyledScrollView showsVerticalScrollIndicator={false}>
                <StyledCard backgroundColor={theme.colors.gray[1]} marginHorizontal={1} borderWidth={0.5} borderColor={theme.colors.gray[1]} borderRadius={32} padding={16} >
                    <Stack horizontal flex={1} gap={4}>
                        <StyledButton
                            backgroundColor={theme.colors.yellow[500]}
                            flex={2}
                            justifyContent="center"
                            borderRadius={100}
                            borderWidth={0.2}
                            borderColor={theme.colors.yellow[500]}
                        >
                            <StyledButton.Text
                                color={theme.colors.gray[1]}
                                fontSize={theme.fontSize.medium}
                                fontWeight={theme.fontWeight.medium}
                            >
                                View on GitHub
                            </StyledButton.Text>
                        </StyledButton>
                        <StyledButton primary flex={1}>
                            <StyledButton.Text
                                marginLeft={4}
                                color={theme.colors.gray[1]}
                                fontSize={theme.fontSize.medium}
                                fontWeight={theme.fontWeight.medium}
                            >
                                Submit
                            </StyledButton.Text>
                        </StyledButton>
                    </Stack>
                </StyledCard>
            </StyledScrollView>
        </Fragment>
    )
}

export default Button