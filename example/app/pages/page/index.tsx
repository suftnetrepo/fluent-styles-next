import { StyledPage, StyledSpacer, Stack, theme, StyledScrollView } from "fluent-styles";

const PageDemo = () => {
    return (
        <StyledPage>
            <StyledPage.Header paddingHorizontal={16} backgroundColor={theme.colors.gray[100]} showBackArrow backArrowProps={{ onPress: () => {} }} shapeProps={{
                size:48, backgroundColor: theme.colors.gray[50], borderColor: theme.colors.gray[800], borderWidth: 1,
            }} title="Composite Page Header" titleAlignment="left"  />
           <StyledSpacer marginVertical={8} />
             <Stack flex={1}  borderRadius={16} backgroundColor={theme.colors.gray[1]}>
                  <StyledScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
  
                </StyledScrollView>
            </Stack>
           
        </StyledPage>
    )
}

export default PageDemo;