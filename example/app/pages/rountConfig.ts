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
        ],
      },
    ];

    export { routeConfig }