import React from "react";
import Card from "./card";
import Collapsible from "./collapsible";
import {
  Stack,
  StyledPage,
  StyledHeader,
  type StyledPageProps,
  theme,
} from "fluent-styles";
import { useNavigation } from "@react-navigation/native";
import Button from "./button";
import ActionSheet from "./actionSheet";
import Switch from "./switch";
import TabBarUsage from "./tabBar";
import PopupUsage from "./popup";
import DrawerUsage from "./drawer";

const Page = ({
  title,
  children,
}: {
  title: string;
  children?: StyledPageProps["children"];
}) => {
  const navigation = useNavigation();
  return (
    <StyledPage>
      <StyledHeader
        borderRadius={32}
        marginHorizontal={16}
        paddingHorizontal={32}
        title={title}
        showBackArrow={true}
        backArrowProps={{
          color: theme.colors.gray[500],
          size: 32,
          onPress: () => navigation.goBack(),
        }}
        backgroundColor={theme.colors.gray[1]}
      />
      <Stack flex={1} vertical marginHorizontal={16}>
        {children}
      </Stack>
    </StyledPage>
  );
};

export type _path =
  | "cards"
  | "switch"
  | "inputs"
  | "buttons"
  | "collapsible"
  | "actionSheet"
  | "tabBar"
  | "popup"
  | "drawer";
export const config: { path: _path; Page: any }[] = [
  {
    path: "cards",
    Page: () => (
      <Page title="Card">
        <Card />
      </Page>
    ),
  },
  {
    path: "collapsible",
    Page: () => (
      <Page title="Collapsible">
        <Collapsible />
      </Page>
    ),
  },
  {
    path: "actionSheet",
    Page: () => (
      <Page title="ActionSheet">
        <ActionSheet />
      </Page>
    ),
  },
  {
    path: "buttons",
    Page: () => (
      <Page title="Button">
        <Button />
      </Page>
    ),
  },
  {
    path: "switch",
    Page: () => (
      <Page title="Switch">
        <Switch />
      </Page>
    ),
  },
  {
    path: "tabBar",
    Page: () => (
      <Page title="TabBar">
        <TabBarUsage />
      </Page>
    ),
  },
  {
    path: "popup",
    Page: () => (
      <Page title="Popup">
        <PopupUsage />
      </Page>
    ),
  },
  {
    path: "drawer",
    Page: () => (
      <Page title="Drawer">
        <DrawerUsage />
      </Page>
    ),
  },
];
