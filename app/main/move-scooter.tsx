import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, FlatList, Alert, ActivityIndicator } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation, router } from 'expo-router';
import MenuButton from '@/components/ui/MenuButton';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { GetTasks } from '@/services/task-service';

interface MoveTask {
  id: number;
  scooterId: string;
  currentLocation: {
    latitude: number;
    longitude: number;
  };
  targetLocation: {
    latitude: number;
    longitude: number;
  };
  distance: string;
  reward: number;
}

export default function MoveScooter() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const [username, setUsername] = useState<string | null>(null);
  const [tasks, setTasks] = useState<MoveTask[]>([]);
  const [selectedTask, setSelectedTask] = useState<MoveTask | null>(null);
  const [activeTask, setActiveTask] = useState<MoveTask | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await GetTasks();

        // Add from scooter to target location
        for (const task of response.tasks) {
          const distance = measure(
            task.currentLocation.latitude,
            task.currentLocation.longitude,
            task.targetLocation.latitude,
            task.targetLocation.longitude
          );
          task.distance = `${distance.toFixed(0)} m`;
        }
        setTasks(response.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
    fetchTasks();
  }, []);

  function measure(lat1: number, lon1: number, lat2: number, lon2: number): number {
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d * 1000; // meters
  }

  const handleTakeTask = () => {
    Alert.alert(
      "Take Task",
      `Do you want to take the task to move Scooter ${selectedTask?.scooterId}?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Take Task",
          onPress: () => {
            setActiveTask(selectedTask);
          }
        }
      ]
    );
  };

  const handleCompleteTask = () => {
    setIsLoading(true);
    // TODO: Replace with actual API call to verify scooter location
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        "Task Completed",
        "The scooter has been successfully moved to the target location!",
        [
          {
            text: "OK",
            onPress: () => {
              setActiveTask(null);
              setSelectedTask(null);
              router.push('/main/tasks');
            }
          }
        ]
      );
    }, 2000);
  };

  const renderTask = ({ item }: { item: MoveTask }) => (
    <Pressable 
      style={[
        styles.taskItem,
        selectedTask?.id === item.id && styles.selectedTask
      ]}
      onPress={() => setSelectedTask(item)}
    >
      <View>
        <Text style={styles.scooterId}>Scooter {item.scooterId}</Text>
        <Text style={styles.taskDetails}>Distance: {item.distance}</Text>
      </View>
      <View style={styles.rewardContainer}>
        <Text style={styles.reward}>{item.reward} kr</Text>
      </View>
    </Pressable>
  );

  const MapContent = () => (
    <View style={[styles.mapContainer, activeTask && styles.fullscreenMap]}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: selectedTask!.currentLocation.latitude,
          longitude: selectedTask!.currentLocation.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        showsUserLocation={true}
        userInterfaceStyle="light"
      >
        <Marker
          coordinate={selectedTask!.currentLocation}
          title={`Scooter ${selectedTask!.scooterId}`}
        >
          <View style={styles.marker}>
            <Ionicons name="bicycle" size={24} color="black" />
          </View>
        </Marker>
        <Marker
          coordinate={selectedTask!.targetLocation}
          title="Target Location"
        >
          <View style={[styles.marker, styles.targetMarker]}>
            <Ionicons name="location" size={24} color="black" />
          </View>
        </Marker>
        <Polyline
          coordinates={[
            selectedTask!.currentLocation,
            selectedTask!.targetLocation,
          ]}
          strokeColor="#0a7ea4"
          strokeWidth={3}
        />
      </MapView>
      
      {!activeTask && (
        <>
          <Pressable 
            style={styles.backArrow}
            onPress={() => setSelectedTask(null)}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </Pressable>
          <Pressable 
            style={styles.actionButton}
            onPress={handleTakeTask}
          >
            <Text style={styles.actionButtonText}>Take Task</Text>
          </Pressable>
        </>
      )}

      {activeTask && (
        <Pressable 
          style={styles.actionButton}
          onPress={handleCompleteTask}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#333" size="small" />
          ) : (
            <Text style={styles.actionButtonText}>Complete Task</Text>
          )}
        </Pressable>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {!activeTask && <MenuButton navigation={navigation} />}
      <View style={[
        styles.content,
        { 
          padding: activeTask ? 0 : 20,
          paddingTop: activeTask ? 0 : 60
        }
      ]}>
        {!activeTask && <Text style={styles.title}>Move Scooter</Text>}

        {selectedTask ? (
          <MapContent />
        ) : (
          <FlatList
            data={tasks}
            renderItem={renderTask}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.taskList}
          />
        )}
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
  },
  title: {
    fontSize: 28,
    fontFamily: 'Nunito-Bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  taskList: {
    paddingBottom: 20,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedTask: {
    borderColor: '#0a7ea4',
    backgroundColor: '#f0f9fb',
  },
  scooterId: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#333',
    marginBottom: 5,
  },
  taskDetails: {
    fontSize: 14,
    fontFamily: 'Nunito',
    color: '#666',
  },
  rewardContainer: {
    backgroundColor: '#f2ffc4',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  reward: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#333',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  fullscreenMap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  map: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  marker: {
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#f2ffc4',
  },
  targetMarker: {
    borderColor: '#0a7ea4',
  },
  backArrow: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
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
    minHeight: 54,
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#333',
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
  },
}); 