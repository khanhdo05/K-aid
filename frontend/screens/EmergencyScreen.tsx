import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Audio } from 'expo-av';

export default function EmergencyScreen() {
  const [recording, setRecording] = useState<null | Audio.Recording>(null);
  const [message, setMessage] = useState('');

  const setAudioMode = async () => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: true,
    });
  };

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      await setAudioMode(); // Set audio mode before requesting permissions
      if (status !== 'granted') {
        console.error('Permission to access audio was denied');
        return;
      }
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (error) {
      console.error('startRecording error: ', error);
    }
  };

  const stopRecording = async () => {
    if (recording) {
      setRecording(null);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      const messageStop = 'Recording stopped and stored at ' + uri;
      console.log(messageStop);
      setMessage(messageStop);
      // Optional: Send the recorded audio to the backend here
      //await uploadAudio(uri);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Describe your emergency</Text>
      <Text>{message}</Text>
      <Button
        title="Start Recording"
        onPress={startRecording}
        disabled={recording !== null}
      />
      <Button
        title="Stop Recording"
        onPress={stopRecording}
        disabled={recording === null}
      />
    </View>
  );
}
