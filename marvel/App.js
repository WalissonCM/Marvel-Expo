import { PaperProvider } from "react-native-paper";
import TabRoutes from "./src/Tab.Routes";
import { NavigationContainer } from "@react-navigation/native";


export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
          <TabRoutes/>
      </NavigationContainer>
    </PaperProvider>
    
  );
}

