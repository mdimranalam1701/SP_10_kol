import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';

export default function App() {
  const [role, setRole] = useState<'none' | 'customer' | 'trainer'>('none');

  if (role === 'none') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.loginContainer}>
          <Text style={styles.loginTitle}>GymSaaS</Text>
          <Text style={styles.loginSubtitle}>Select your role to access your personalized dashboard.</Text>

          <TouchableOpacity style={styles.btnCustomer} onPress={() => setRole('customer')}>
            <Text style={styles.btnText}>Login as Customer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnTrainer} onPress={() => setRole('trainer')}>
            <Text style={styles.btnTextBlack}>Login as Trainer</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{paddingBottom: 40}}>
        {role === 'customer' ? <CustomerDashboard /> : <TrainerDashboard />}
      </ScrollView>
      <TouchableOpacity style={styles.logoutBtn} onPress={() => setRole('none')}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ----------------------------------------------------------------------
// CUSTOMER DASHBOARD
// ----------------------------------------------------------------------
function CustomerDashboard() {
  return (
    <View style={styles.screen}>
      <Text style={styles.greeting}>Welcome back, <Text style={{color: '#00d2ff'}}>John Doe</Text></Text>

      <View style={styles.glassCard}>
        <Text style={styles.cardTitle}>Active Plan</Text>
        <Text style={styles.planPrice}>Annual Pro</Text>
        <Text style={styles.planSub}>Expires: July 20, 2027</Text>
      </View>

      <View style={styles.glassCard}>
        <Text style={styles.cardTitle}>My Progress</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Current Weight</Text>
          <Text style={styles.val}>185 lbs</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Daily Calories</Text>
          <Text style={styles.val}>2,400 kcal</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Diet Plan</Text>
          <Text style={styles.valCyan}>Bulking Phase 2</Text>
        </View>
      </View>

      <View style={styles.glassCard}>
        <Text style={styles.cardTitle}>My Trainer</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Coach Mike</Text>
          <Text style={styles.valGreen}>Next Session: 2PM</Text>
        </View>
      </View>
    </View>
  );
}

// ----------------------------------------------------------------------
// TRAINER DASHBOARD
// ----------------------------------------------------------------------
function TrainerDashboard() {
  return (
    <View style={styles.screen}>
      <Text style={styles.greeting}>Trainer, <Text style={{color: '#00ff88'}}>Mike</Text></Text>

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  loginTitle: {
    fontSize: 48,
    fontWeight: '900',
    color: '#00d2ff',
    textAlign: 'center',
    marginBottom: 8,
  },
  loginSubtitle: {
    color: '#a1a1aa',
    textAlign: 'center',
    marginBottom: 48,
    fontSize: 16,
  },
  btnCustomer: {
    backgroundColor: '#8b5cf6', // Purple
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  btnTrainer: {
    backgroundColor: '#00ff88', // Green
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  btnTextBlack: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
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
  planSub: {
    color: '#00d2ff',
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  label: {
    color: '#a1a1aa',
    fontSize: 16,
  },
  val: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  valCyan: {
    color: '#00d2ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  valGreen: {
    color: '#00ff88',
    fontSize: 16,
    fontWeight: 'bold',
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
