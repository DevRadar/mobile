import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Main from "./pages/Main";
import Profile from "./pages/Profile";

const Routes = createAppContainer(
  createStackNavigator(
    {
      Profile: {
        screen: Profile,
        navigationOptions: {
          title: "Github Profile",
          headerTitleAlign: "center",
        },
      },
      Main: {
        screen: Main,
        navigationOptions: {
          title: "DevRadar",
          headerTitleAlign: "center",
        }
      },
    },
    {
      initialRouteName: "Main",
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: "#7d40e7",
        },
        headerTintColor: "#fff",
      }
    }
  )
);

export default Routes;
