
import React, { Fragment } from 'react'
import {  Collapse,
  CollapseGroup, CollapseItem, ChevronRight, Stack, StyledText, StyledDivider, theme, StyledScrollView, StyleShape, StyledSpacer, StyledCard } from 'fluent-styles'


const Collapsible = () => {

    return (
        <Fragment>
            <StyledSpacer marginVertical={8} />
            <StyledScrollView showsVerticalScrollIndicator={false}>
                <StyledCard backgroundColor={theme.colors.gray[1]} marginHorizontal={1} borderWidth={0.5} borderColor={theme.colors.gray[1]} borderRadius={32} padding={16} >
                    
                </StyledCard>
            </StyledScrollView>
        </Fragment>
    )
}

export default Collapsible