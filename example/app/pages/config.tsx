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
import TextInputUsage from "./input";
import DropdownUsage from "./dropdown";
import ImageUsage from "./image";
import BadgeUsage from "./badge";
import CheckBoxUsage from "./checkBox";
import DialogueUsage from "./dialogue";
import ToastUsage from "./toast";
import NotificationUsage from "./notification";
import LoaderUsage from "./loader";
import Demo from "./home/quick-pad";
import CircularProgressUsage from "./circularProgess";
import StyledBarDemo from "./barChart";
import StyledChipDemo from "./chips";
import DailyPlanScreen from "./timeLine";

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
        titleAlignment="left"
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
  | "drawer"
  | "dropdown"
  | "image"
  | "badge"
  | "checkBox" 
  | "dialogue"
  | "toast"
  | "notification"
  | "loader"
  | "demo"
  | "circularProgress"
  | "barChart"
  | "chips"
  | "timeline";
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
  {
    path: "inputs",
    Page: () => (
      <Page title="Input">
        <TextInputUsage />
      </Page>
    ),
  },
  {
    path: "dropdown",
    Page: () => (
      <Page title="Dropdown">
        <DropdownUsage />
      </Page>
    ),
  },
  {
    path: "image",
    Page: () => (
      <Page title="Image">
        <ImageUsage />
      </Page>
    ),
  },
  { 
    path: "badge",
    Page: () => (
      <Page title="Badge">
        <BadgeUsage />
      </Page>
    ),  
  },
  { 
    path: "checkBox",
    Page: () => (
      <Page title="CheckBox">
        <CheckBoxUsage />
      </Page>
    ),  
  },
  {
    path: "dialogue",
    Page: () => (
      <Page title="Dialogue">
        <DialogueUsage />
      </Page>   
    )},
  {
    path: "toast",
    Page: () => (
      <Page title="Toast">
        <ToastUsage />
      </Page>
    ),
  },
  {
    path: "notification",
    Page: () => (
      <Page title="Notification">
        <NotificationUsage />
      </Page>
    ),
  },
  {
    path: "loader",
    Page: () => (
      <Page title="Loader">
        <LoaderUsage />
      </Page>
    ),
  },
  {
    path : "demo",
    Page : () => (
      <Page title="Demo">
        <Demo />
      </Page>
    )
  },
  {
    path: "circularProgress",
    Page: () => (
      <Page title="Circular Progress">
        <CircularProgressUsage />
      </Page>
    )
  },
  {
    path: "barChart",
    Page: () => (
      <Page title="Bar Chart">
        <StyledBarDemo />
      </Page>
    )
  },
  {
    path: "chips",
    Page: () => (
      <Page title="Chips">
        <StyledChipDemo />
      </Page>
    )
  },
  {
    path: "timeline",
    Page: () => (
      <Page title="Timeline">
        <DailyPlanScreen />
      </Page>
    )
  }
];
