import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { AuthContext } from '../AuthContext';
import { StatusBar } from 'expo-status-bar';

export default function CustomerDashboard() {
  const { logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{paddingBottom: 40}}>
        <View style={styles.screen}>
          <Text style={styles.greeting}>Welcome back, <Text style={{color: '#00d2ff'}}>Customer</Text></Text>

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
  logoutBtn: {
    alignSelf: 'center',
    padding: 16,
  },
  logoutText: {
    color: '#ef4444',
    fontWeight: 'bold',
  }
});
