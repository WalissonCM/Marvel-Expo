import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Personagens from './Personagens';
import Quadrinhos from './Quadrinhos';



const Tab = createBottomTabNavigator();


export default function TabRoutes() {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false
            }}
        >

            <Tab.Screen
                name='Personagens'
                component={Personagens}
                options={{
                    tabBarLabel: 'Personagens',
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name='megaphone-outline' color={color} size={size} />
                    }
                }}
            />
            <Tab.Screen>
                <Tab.Screen
                    name='Quadrinhos'
                    component={Quadrinhos}
                    options={{
                        tabBarLabel: 'Quadrinhos',
                        tabBarIcon: ({ color, size }) => {
                            return <Ionicons name='newspaper-outline' color={color} size={size} />
                        }
                    }}
                />
            </Tab.Screen>

        </Tab.Navigator>
    )
}