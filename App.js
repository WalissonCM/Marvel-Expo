import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import TabRoutes from "./screens/Tab.Routes";


export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
          <TabRoutes/>
      </NavigationContainer>
    </PaperProvider>
    
  );
}

