import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { AuthContext } from '../AuthContext';
import { StatusBar } from 'expo-status-bar';

export default function TrainerDashboard() {
  const { logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{paddingBottom: 40}}>
        <View style={styles.screen}>
          <Text style={styles.greeting}>Trainer, <Text style={{color: '#00ff88'}}>Welcome</Text></Text>

          <View style={{flexDirection: 'row', gap: 16}}>
            <View style={[styles.glassCard, {flex: 1, borderColor: '#00ff88'}]}>
              <Text style={styles.label}>Today's Payout</Text>
              <Text style={styles.planPrice}>$145.00</Text>
            </View>
            <View style={[styles.glassCard, {flex: 1}]}>
              <Text style={styles.label}>Clients</Text>
              <Text style={styles.planPrice}>8</Text>
            </View>
          </View>

          <View style={styles.glassCard}>
            <Text style={styles.cardTitle}>Today's Schedule</Text>
            
            <View style={styles.scheduleItem}>
              <Text style={styles.timeText}>09:00 AM</Text>
              <View style={styles.eventBlock}>
                <Text style={styles.eventTitle}>Morning HIIT</Text>
                <Text style={styles.eventSub}>Class • 12 Attendees</Text>
              </View>
            </View>

            <View style={styles.scheduleItem}>
              <Text style={styles.timeText}>11:30 AM</Text>
              <View style={styles.eventBlockCyan}>
                <Text style={styles.eventTitle}>Personal Training</Text>
                <Text style={styles.eventSubCyan}>Client: John Doe</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  screen: {
    padding: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 24,
    marginTop: 24,
  },
  glassCard: {
    backgroundColor: 'rgba(24, 24, 27, 0.8)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
  },
  label: {
    color: '#a1a1aa',
    fontSize: 16,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeText: {
    color: '#00ff88',
    fontWeight: 'bold',
    width: 70,
  },
  eventBlock: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 16,
    borderRadius: 12,
  },
  eventTitle: {
    color: '#fff',
    fontWeight: 'bold',
  },
  eventSub: {
    color: '#a1a1aa',
    fontSize: 12,
    marginTop: 4,
  },
  eventBlockCyan: {
    flex: 1,
    backgroundColor: 'rgba(0, 210, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 2,
    borderLeftColor: '#00d2ff',
  },
  eventSubCyan: {
    color: '#00d2ff',
    fontSize: 12,
    marginTop: 4,
  },
  logoutBtn: {
    alignSelf: 'center',
    padding: 16,
  },
  logoutText: {
    color: '#ef4444',
    fontWeight: 'bold',
  }
});
