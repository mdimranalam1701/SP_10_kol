import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';

export default function App() {
  const [activeTab, setActiveTab] = useState('schedule');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Trainer Dashboard</Text>
          <Text style={styles.name}>Coach Mike</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Image source={{uri: 'https://i.pravatar.cc/150?img=11'}} style={styles.avatar} />
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{paddingBottom: 100}}>
        {activeTab === 'schedule' ? <ScheduleScreen /> : <ClientsScreen />}
      </ScrollView>

      {/* Bottom Nav Mock */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('schedule')}>
          <Text style={[styles.navText, activeTab === 'schedule' && styles.navTextActive]}>📅 Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('clients')}>
          <Text style={[styles.navText, activeTab === 'clients' && styles.navTextActive]}>👥 Clients</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function ScheduleScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>4</Text>
          <Text style={styles.statLabel}>Classes Today</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumCyan}>2</Text>
          <Text style={styles.statLabel}>1-on-1 PT</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Today's Roster</Text>
      
      <View style={styles.scheduleItem}>
        <View style={styles.timeBlock}>
          <Text style={styles.timeText}>09:00</Text>
          <Text style={styles.ampmText}>AM</Text>
        </View>
        <View style={styles.eventBlock}>
          <Text style={styles.eventTitle}>Morning HIIT</Text>
          <Text style={styles.eventSubtitle}>Group Class • 12 Attendees</Text>
        </View>
      </View>

      <View style={styles.scheduleItem}>
        <View style={styles.timeBlock}>
          <Text style={styles.timeText}>11:30</Text>
          <Text style={styles.ampmText}>AM</Text>
        </View>
        <View style={styles.eventBlockCyan}>
          <Text style={styles.eventTitle}>Personal Training</Text>
          <Text style={styles.eventSubtitleCyan}>John Doe • Strength</Text>
        </View>
      </View>
      
      <View style={styles.scheduleItem}>
        <View style={styles.timeBlock}>
          <Text style={styles.timeText}>05:00</Text>
          <Text style={styles.ampmText}>PM</Text>
        </View>
        <View style={styles.eventBlock}>
          <Text style={styles.eventTitle}>Core Crusher</Text>
          <Text style={styles.eventSubtitle}>Group Class • 18 Attendees</Text>
        </View>
      </View>
    </View>
  );
}

function ClientsScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.searchBar}>
        <Text style={styles.searchPlaceholder}>🔍 Search clients...</Text>
      </View>

      <Text style={styles.sectionTitle}>My Roster</Text>
      
      <View style={styles.clientCard}>
        <Image source={{uri: 'https://i.pravatar.cc/150?img=68'}} style={styles.clientAvatar} />
        <View style={styles.clientInfo}>
          <Text style={styles.clientName}>John Doe</Text>
          <Text style={styles.clientGoal}>Goal: Hypertrophy</Text>
        </View>
        <TouchableOpacity style={styles.messageBtn}>
          <Text style={styles.messageBtnText}>💬</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.clientCard}>
        <Image source={{uri: 'https://i.pravatar.cc/150?img=47'}} style={styles.clientAvatar} />
        <View style={styles.clientInfo}>
          <Text style={styles.clientName}>Sarah Connor</Text>
          <Text style={styles.clientGoal}>Goal: Fat Loss</Text>
        </View>
        <TouchableOpacity style={styles.messageBtn}>
          <Text style={styles.messageBtnText}>💬</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 48,
  },
  greeting: {
    color: '#00ff88', // Green for trainer
    fontSize: 16,
    fontWeight: 'bold',
  },
  name: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#00ff88',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
  },
  screen: {
    padding: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(24, 24, 27, 0.8)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  statNum: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '900',
  },
  statNumCyan: {
    color: '#00d2ff',
    fontSize: 32,
    fontWeight: '900',
  },
  statLabel: {
    color: '#a1a1aa',
    fontSize: 14,
    marginTop: 4,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
  },
  scheduleItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timeBlock: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  timeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  ampmText: {
    color: '#a1a1aa',
    fontSize: 12,
  },
  eventBlock: {
    flex: 1,
    backgroundColor: 'rgba(24, 24, 27, 0.8)',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#00ff88',
  },
  eventBlockCyan: {
    flex: 1,
    backgroundColor: 'rgba(0, 210, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#00d2ff',
  },
  eventTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  eventSubtitle: {
    color: '#a1a1aa',
    fontSize: 14,
  },
  eventSubtitleCyan: {
    color: '#00d2ff',
    fontSize: 14,
  },
  searchBar: {
    backgroundColor: 'rgba(24, 24, 27, 0.8)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  searchPlaceholder: {
    color: '#a1a1aa',
  },
  clientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(24, 24, 27, 0.8)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  clientAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clientGoal: {
    color: '#a1a1aa',
    fontSize: 14,
    marginTop: 4,
  },
  messageBtn: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 12,
    borderRadius: 12,
  },
  messageBtnText: {
    fontSize: 16,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'rgba(9, 9, 11, 0.95)',
    paddingBottom: 32,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navText: {
    color: '#a1a1aa',
    fontSize: 14,
    fontWeight: '600',
  },
  navTextActive: {
    color: '#00ff88',
  }
});
