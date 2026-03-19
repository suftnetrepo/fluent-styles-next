import React, { Fragment } from "react";
import {
  ChevronRight,
  StyledTextInput,
  StyledPressable,
  StyledButton,
  StyledDivider,
  Stack,
  StyledText,
  theme,
  StyledScrollView,
  fontStyles,
  StyledPage,
  StyleShape,
  StyledHeader,
  StyledSpacer,
  StyledCard,
} from "fluent-styles";
import { StackParamList } from "../../navigation/StackParamList";
import { useNavigation } from "@react-navigation/native";
import { capitalizeFirstLetter } from "../../../utiles/helper";

const Home = () => {
  const navigation = useNavigation<any>();

  const routeConfig: {
    title: string;
    data: {
      title: string;
      name: keyof StackParamList;
    }[];
  }[] = [
    {
      title: "Getting Started",
      data: [
        {
          title: "Buttons",
          name: "buttons",
        },
        {
          title: "Cards",
          name: "cards",
        },
        {
          title: "Switch",
          name: "switch",
        },
        {
          title: "Inputs",
          name: "inputs",
        },
      ],
    },
  ];

  type props = {
    name: keyof StackParamList;
    index: number;
    lastIndex: number;
  };
  const renderCard = ({ name, index, lastIndex }: props) => {
    return (
      <StyledPressable onPress={() => navigation.navigate(name)}>
        <Stack
          horizontal
          justifyContent="space-between"
          alignItems="center"
          paddingVertical={8}
        >
          <StyledText
            fontSize={theme.fontSize.medium}
            fontWeight={theme.fontWeight.normal}
            color={theme.colors.gray[800]}
          >
            {capitalizeFirstLetter(name)}
          </StyledText>
          <StyleShape padding={8} borderWidth={0} cycle>
            <ChevronRight
              size={16}
              color={theme.colors.gray[800]}
              strokeWidth={2}
            />
          </StyleShape>
        </Stack>
        {index !== lastIndex && (
          <StyledDivider
            height={0.9}
            horizontal
            backgroundColor={theme.colors.gray[200]}
            marginVertical={2}
          />
        )}
      </StyledPressable>
    );
  };

  return (
    <StyledPage paddingHorizontal={16} backgroundColor={theme.colors.gray[100]}>
      <StyledHeader
        borderBottomColor={theme.colors.gray[200]}
        showBackArrow={false}
        showStatusBar={true}
        title="Fluent Styles"
        titleAlignment="left"
        titleProps={{
          color: theme.colors.gray[800],
          fontWeight: theme.fontWeight.medium,
          fontFamily: fontStyles.crimson_text_regular,
          marginLeft: 8,
        }}
        leftIcon={
          <StyleShape
            marginLeft={8}
            borderWidth={0}
            cycle
            size="32"
            backgroundColor={theme.colors.gray[800]}
          >
            <StyledText
              fontFamily={fontStyles.Roboto_Regular}
              fontSize={theme.fontSize.small}
              color={theme.colors.gray[100]}
            >
              N
            </StyledText>
          </StyleShape>
        }
        onBackPress={() => {}}
        paddingVertical={8}
        backgroundColor={theme.colors.gray[200]}
        borderRadius={30}
      ></StyledHeader>
      <StyledSpacer marginVertical={8} />
      <StyledScrollView showsVerticalScrollIndicator={false}>
        <StyledCard
          backgroundColor={theme.colors.gray[1]}
          marginHorizontal={1}
          borderWidth={0.5}
          borderColor={theme.colors.gray[1]}
          borderRadius={32}
          padding={16}
        >
          {routeConfig.map((item, index) => {
            return (
              <Fragment key={index}>
                <StyledText
                  fontSize={theme.fontSize.xlarge}
                  fontWeight={theme.fontWeight.semiBold}
                  color={theme.colors.gray[800]}
                  marginBottom={8}
                >
                  {capitalizeFirstLetter(item.title)}
                </StyledText>
                {item.data.map((routeItem, routeIndex) => (
                  <Fragment key={routeIndex}>
                    {renderCard({
                      ...routeItem,
                      index: routeIndex,
                      lastIndex: item.data.length - 1,
                    })}
                  </Fragment>
                ))}
              </Fragment>
            );
          })}
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
          <StyledSpacer marginVertical={8} />
          <StyledTextInput
            label="First name"
            labelProps={{
              fontSize: theme.fontSize.normal,
              fontWeight: theme.fontWeight.medium,
              color: theme.colors.gray[800],
            }}
            keyboardType="number-pad"
            returnKeyType="done"
            placeholder="Enter text"
            placeholderTextColor={theme.colors.gray[200]}
            fontSize={theme.fontSize.normal}
            error={false}
            errorMessage="First name is required"
            borderColor={theme.colors.gray[400]}
            borderRadius={8}
            accessibilityLabel="first-name-input"
            accessibilityHint="Input field for first name"
            accessibilityRole="text"
            maxLength={50}
            numberOfLines={4}
            multiline
            height={100}
          />
        </StyledCard>
      </StyledScrollView>
    </StyledPage> 
  );
};

export default Home;
