import {Button, View, Text} from "react-native";
import {NavigationProp} from "@react-navigation/native";
type HomeScreenProps = {
    navigation: NavigationProp<any>;
};

export default function HomeScreen({navigation} : HomeScreenProps) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>K-aid: Emergency Assistant</Text>
            <Button
                title="Start Emergency Session"
                onPress={() => navigation.navigate('Emergency')}
            />
        </View>
    );
}