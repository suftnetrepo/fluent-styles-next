import React, { Fragment, useState, useEffect } from "react";
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
  StyledDropdown,
  DropdownOptionItem,
  StyledCheckBox,
  BellFill,
  BellOutline,
  StyledBadge,
  BadgeWithIcon,
  BadgeIcon,
  StyledConfirmDialog,
  StyledOkDialog,
  StyledDialog,
  Spinner,
  Circular,
  useToast,
  useNotification,
  useLoader,
  useDialogue,

} from "fluent-styles";
import { StackParamList } from "../../navigation/StackParamList";
import { useNavigation } from "@react-navigation/native";
import { capitalizeFirstLetter } from "../../../utiles/helper";

function useDialog(type: "delete" | "save" | "error" | "success") {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<any>(null);

  return {
    visible,
    data,
    show: (data?: any) => {
      setData(data);
      setVisible(true);
    },
    hide: () => setVisible(false),
  };
}

const Home = () => {
  const navigation = useNavigation<any>();
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const toast = useToast();
  const notification = useNotification();
  const loader = useLoader();
  const dialogue = useDialogue();

  const deleteDialog = useDialog("save");

  const options: DropdownOptionItem[] = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

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

  const onShowDialog = async () => {
    dialogue.show({
      title: 'Unsaved changes',
      icon: '📝',
      actions: [
        { label: 'Discard', variant: 'destructive', onPress: () => { } },
        { label: 'Keep editing', variant: 'primary', onPress: () => { } },
      ],
    })

    // const confirmed = await dialogue.confirm({ title: 'Are you sure?' })
  };

  const onShowLoader = async () => {
    const id = loader.show({ label: 'Saving…', variant: 'dots' })
    await new Promise(resolve => setTimeout(resolve, 8000)) // Simulate async work
    loader.hide(id)
  }

  const onShowToast = () => {
    toast.show({
      message: "This is a toast message",
      description: "This is a description for the toast message",
      variant: "success",
    });
  };

  const onShowNotification = () => {
    notification.show({
      title: "Build succeeded",
      body: "main → production • 47 files changed.",
      source: "CI/CD",
      initials: "⚙",
      timestamp: "2s ago",
    });
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
        onBackPress={() => { }}
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
          />
          <StyledSpacer marginVertical={8} />
          <StyledDropdown
            data={options}
            disabled={false}
            placeholder="Select an option"
            placeholderTextColor={theme.colors.gray[500]}
            onChange={(item) => console.log("Selected:", item.value)}
          />
          <StyledSpacer marginVertical={8} />
          <StyledCheckBox
            size={32}
            iconSize={18}
            checked={true}
            disabled={false}
            onCheck={(j) => {
              console.log(j);
            }}
            checkMarkColor={theme.colors.gray[100]}
          />

          <StyledDivider
            height={0.9}
            horizontal
            backgroundColor={theme.colors.gray[200]}
            marginVertical={8}
          />
          <StyledSpacer marginVertical={8} />
          <Stack
            horizontal
            gap={24}
            marginHorizontal={16}
            justifyContent="flex-end"
          >
            <BellFill size={24} color={theme.colors.gray[800]} />
            <BellOutline size={24} color={theme.colors.gray[800]} />
            <BadgeIcon
              backgroundColor={theme.colors.red[500]}
              top={-13}
              right={5}
              char="3"
              color={theme.colors.gray[1]}
              fontSize={10}
              icon={<BellOutline size={24} color={theme.colors.green[800]} />}
            />
          </Stack>
          <StyledSpacer marginVertical={8} />
          <StyledBadge
            alignSelf="flex-start"
            borderRadius={100}
            paddingHorizontal={8}
            paddingVertical={2}
            fontSize={12}
            backgroundColor={theme.colors.red[200]}
            color={theme.colors.red[800]}
          >
            Pending
          </StyledBadge>
          <StyledSpacer marginVertical={8} />
          <BadgeWithIcon
            borderRadius={30}
            paddingHorizontal={16}
            gap={8}
            paddingVertical={4}
            justifyContent="center"
            alignItems="center"
            title="New Messages"
            backgroundColor={theme.colors.blue[200]}
            color={theme.colors.blue[800]}
            fontSize={12}
            iconLeft={<BellFill size={16} color={theme.colors.blue[800]} />}
            iconRight={<BellOutline size={16} color={theme.colors.blue[800]} />}
          />
          <StyledDivider
            height={0.9}
            horizontal
            backgroundColor={theme.colors.gray[200]}
            marginVertical={8}
          />

          <Stack
            horizontal
            gap={16}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Spinner
              size={48}
              color={theme.colors.blue[500]}
              style={{ alignSelf: "center", marginVertical: 16 }}
            />
            <Circular
              size={48}
              color={theme.colors.green[500]}
              style={{ alignSelf: "center", marginVertical: 16 }}
            />
          </Stack>
          <StyledDivider
            height={0.9}
            horizontal
            backgroundColor={theme.colors.gray[200]}
            marginVertical={8}
          />

          <StyledScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Stack horizontal flex={1} gap={4}>
              <StyledButton
                backgroundColor={theme.colors.yellow[500]}
                flex={2}
                justifyContent="center"
                borderRadius={100}
                borderWidth={0.2}
                borderColor={theme.colors.yellow[500]}
                onPress={onShowToast}
              >
                <StyledButton.Text
                  color={theme.colors.gray[1]}
                  fontSize={theme.fontSize.medium}
                  fontWeight={theme.fontWeight.medium}
                >
                  Toast
                </StyledButton.Text>
              </StyledButton>
              <StyledButton primary flex={1} onPress={onShowNotification}>
                <StyledButton.Text
                  marginLeft={4}
                  color={theme.colors.gray[1]}
                  fontSize={theme.fontSize.medium}
                  fontWeight={theme.fontWeight.medium}
                >
                  Notify
                </StyledButton.Text>
              </StyledButton>
              <StyledButton outline flex={1} onPress={onShowDialog}>
                <StyledButton.Text
                  marginLeft={4}
                  color={theme.colors.gray[800]}
                  fontSize={theme.fontSize.medium}
                  fontWeight={theme.fontWeight.medium}
                >
                  Dialogue
                </StyledButton.Text>
              </StyledButton>
              <StyledButton backgroundColor={theme.colors.teal[600]} flex={1} onPress={onShowLoader}>
                <StyledButton.Text
                  marginLeft={4}
                  color={theme.colors.gray[1]}
                  fontSize={theme.fontSize.medium}
                  fontWeight={theme.fontWeight.medium}
                >
                  Loading
                </StyledButton.Text>
              </StyledButton>
            </Stack>
          </StyledScrollView>
        </StyledCard>
        <StyledConfirmDialog
          description="Your changes have been saved."
          variant="success"
          visible={deleteDialog.visible}
          title="Success?"
          onConfirm={deleteDialog.hide}
          onCancel={deleteDialog.hide}
          showNeutral={true}
        />
      </StyledScrollView>
      <StyledOkDialog
        visible={success}
        variant="success"
        okLabel="Ok"
        onOk={() => setSuccess(false)}
      />
    </StyledPage>
  );
};

export default Home;
