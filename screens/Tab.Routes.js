import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Personagens from './Personagens';
import Quadrinhos from './Quadrinhos';
import Criadores from './Criadores';



const Tab = createBottomTabNavigator();


export default function TabRoutes() {
    return (
        <Tab.Navigator
            initialRouteName='Home'         
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: 'black',
                    borderTopColor: 'black',  
                }        
            }}         
        >

            <Tab.Screen
                name="Personagens"  
                component={Personagens}
                options={{ 
                    tabBarIcon: () =>
                    (
                        <MaterialCommunityIcons name="format-align-left" color="white" size={26} />
                      ), 
                }}
            />
                <Tab.Screen
                    name="Quadrinhos"
                    component={Quadrinhos}
                    options={{
                        tabBarIcon: () =>  (
                            <MaterialCommunityIcons name="book-open-page-variant" color="white" size={26} />
                          ),
                    }}
                />

                <Tab.Screen
                    name="Criadores"
                    component={Criadores}
                    options={{
                        tabBarIcon: () =>  (
                            <MaterialCommunityIcons name="book-open-page-variant" color="white" size={26} />
                          ),
                    }}
                />
        

        </Tab.Navigator>
    )
}