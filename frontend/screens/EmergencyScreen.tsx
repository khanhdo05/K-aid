import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function EmergencyScreen() {
    const [response, setResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleEmergency = async () => {
        setLoading(true);

        // Call the API to process emergency request (example API calls)
        try {
            const res = await axios.post('YOUR_BACKEND_ENDPOINT', { message: "I can't breathe" });
            setResponse(res.data);
        } catch (error) {
            setResponse('Error processing request.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Describe your emergency</Text>
            <Button title="Simulate Emergency" onPress={handleEmergency} />
            {loading && <ActivityIndicator size="large" />}
            {response && <Text>{response}</Text>}
        </View>
    );
}
