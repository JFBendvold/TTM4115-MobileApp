import { Text, View, StyleSheet, Pressable, TextInput, Image } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from 'expo-router';
import MenuButton from '@/components/ui/MenuButton';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function FixParking() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  // TODO: Implement actual photo taking functionality
  const handleTakePhoto = (type: 'before' | 'after') => {
    console.log(`Taking ${type} photo`);
  };

  const handleSubmit = () => {
    // TODO: Implement submission to backend
    console.log('Submitting fix parking task:', {
      description,
      location,
    });
  };

  return (
    <View style={styles.container}>
      <MenuButton navigation={navigation} />
      <View style={styles.content}>
        <Text style={styles.title}>Fix Parking</Text>

        <View style={styles.photoSection}>
          <View style={styles.photoContainer}>
            <Text style={styles.photoLabel}>Before</Text>
            <Pressable style={styles.photoButton} onPress={() => handleTakePhoto('before')}>
              <Ionicons name="camera" size={32} color="#333" />
            </Pressable>
          </View>

          <View style={styles.photoContainer}>
            <Text style={styles.photoLabel}>After</Text>
            <Pressable style={styles.photoButton} onPress={() => handleTakePhoto('after')}>
              <Ionicons name="camera" size={32} color="#333" />
            </Pressable>
          </View>
        </View>

        <View style={styles.scanSection}>
          <Pressable style={styles.scanButton} onPress={() => console.log('Scanning QR')}>
            <Ionicons name="qr-code" size={24} color="#333" />
            <Text style={styles.scanButtonText}>Scan Scooter(s)</Text>
          </Pressable>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.formLabel}># Parkings fixed</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <TextInput
            style={styles.locationInput}
            placeholder="Location (edit)"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>
            Submit
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Nunito-Bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  photoSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  photoContainer: {
    alignItems: 'center',
  },
  photoLabel: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    marginBottom: 10,
    color: '#333',
  },
  photoButton: {
    width: 120,
    height: 120,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanSection: {
    marginBottom: 30,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  scanButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#333',
  },
  formSection: {
    marginBottom: 30,
  },
  formLabel: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#333',
    marginBottom: 10,
  },
  descriptionInput: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    height: 100,
    textAlignVertical: 'top',
    fontFamily: 'Nunito',
  },
  locationInput: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontFamily: 'Nunito',
  },
  submitButton: {
    backgroundColor: '#f2ffc4',
    borderWidth: 1,
    borderColor: '#333',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    color: '#333',
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
  },
}); 