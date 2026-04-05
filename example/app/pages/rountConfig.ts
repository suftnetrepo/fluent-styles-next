import { StackParamList } from "~/navigation/StackParamList";

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
          title: "Button",
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
        {
          title: "Collapsible",
          name: "collapsible",
        },
        {
          title: "Actionsheet",
          name: "actionSheet",
        },
        {
          title: "TabBar",
          name: "tabBar",
        },
        {
          title: "Popup",
          name: "popup",
        },
        {
          title: "Drawer",
          name: "drawer",
        },
        {
          title: "Dropdown",
          name: "dropdown",
        },
        {
          title: "Image",
          name: "image",
        },
        {
          title: "Badge",
          name: "badge",
        },
        {
          title: "Checkbox",
          name: "checkBox",
        },
        {
          title: "Dialogue",
          name: "dialogue",
        },
        {
          title: "Toast",
          name: "toast",
        },
        {
          title: "Notification",
          name: "notification",
        },
        {
          title: "Loader",
          name: "loader",
        },
        { title: "Circular Progress", name: "circularProgress" },
        { title: "Bar Chart", name: "barChart" },
        { title: "Chips", name: "chips" },
        { title: "Timeline", name: "timeline" },
        { title: "Radio", name: "radio" },
        { title: "Progress Bar", name: "progressBar" },
        { title: "Slider", name: "slider" },
        { title: "Date Picker", name: "datePicker" },
        { title: "Skeleton", name: "skeleton" },
        { title: "Empty State", name: "emptyState" },
        { title: "Search Bar", name: "searchBar" },
      ],
    },
  ];

export { routeConfig };
