import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();
  const isMockMode = process.env.EXPO_PUBLIC_USE_MOCK === 'true';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Environment Status</Text>
        <View style={styles.statusCard}>
          <Text style={styles.label}>EXPO_PUBLIC_USE_MOCK:</Text>
          <Text style={[styles.value, isMockMode ? styles.mockOn : styles.mockOff]}>
            {String(process.env.EXPO_PUBLIC_USE_MOCK)}
          </Text>
        </View>
        <Text style={styles.statusDescription}>
          The app is currently using {isMockMode ? 'MOCK DATA' : 'REAL API'}.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuration Guide</Text>
        <Text style={styles.text}>
          • To toggle between Mock and Real API, update your <Text style={styles.bold}>.env</Text> file:
        </Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>EXPO_PUBLIC_USE_MOCK=true</Text>
        </View>

        <Text style={[styles.text, styles.mt15]}>
          • To change the active mock case, edit:
        </Text>
        <Text style={styles.filePath}>src/mock/mockWeatherData.ts</Text>
        <Text style={styles.text}>
          Update the <Text style={styles.bold}>ACTIVE_MOCK</Text> export.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Mock Cases</Text>
        <View style={styles.list}>
          {['sunny', 'rainy', 'cold', 'cloudy'].map((caseName) => (
            <View key={caseName} style={styles.listItem}>
              <Text style={styles.listItemText}>• {caseName}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginRight: 10,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mockOn: { color: '#28a745' },
  mockOff: { color: '#dc3545' },
  statusDescription: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  text: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
  },
  codeBlock: {
    backgroundColor: '#2d3436',
    padding: 10,
    borderRadius: 6,
    marginTop: 8,
  },
  codeText: {
    color: '#dfe6e9',
    fontFamily: 'monospace',
  },
  filePath: {
    color: '#0984e3',
    fontWeight: 'bold',
    marginVertical: 4,
  },
  mt15: {
    marginTop: 15,
  },
  list: {
    marginLeft: 5,
  },
  listItem: {
    marginBottom: 8,
  },
  listItemText: {
    fontSize: 16,
    color: '#555',
    textTransform: 'capitalize',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
