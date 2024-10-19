import {Button, View, Text} from "react-native";
import {NavigationProp} from "@react-navigation/native";
import axios from "axios";
import {useState} from "react";
type HomeScreenProps = {
    navigation: NavigationProp<any>;
};

export default function HomeScreen({navigation} : HomeScreenProps) {
    const [message, setMessage] = useState('');

    const verifyBackend = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/verify'); // Update to your backend URL if needed
            setMessage(response.data.message);
        } catch (error) {
            console.error("Error connecting to the backend:", error);
            setMessage('Failed to connect to the backend.');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>K-aid: Emergency Assistant</Text>
            <Text>{message}</Text>
            <Button
                title="Verify Backend Connection"
                onPress={verifyBackend}/>
            <Button
                title="Start Emergency Session"
                onPress={() => navigation.navigate('Emergency')}
            />
        </View>
    );
}