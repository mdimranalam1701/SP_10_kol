import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.name}>John Doe</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Image source={{uri: 'https://i.pravatar.cc/150?img=68'}} style={styles.avatar} />
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{paddingBottom: 100}}>
        {activeTab === 'home' ? <HomeScreen /> : <ProfileScreen />}
      </ScrollView>

      {/* Bottom Nav Mock */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('home')}>
          <Text style={[styles.navText, activeTab === 'home' && styles.navTextActive]}>🏠 Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('profile')}>
          <Text style={[styles.navText, activeTab === 'profile' && styles.navTextActive]}>⚙️ Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function HomeScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.activePlanCard}>
        <View style={styles.glowBorder} />
        <View style={styles.planHeader}>
          <Text style={styles.planTitle}>Annual Pro</Text>
          <View style={styles.activeBadge}><Text style={styles.activeBadgeText}>ACTIVE</Text></View>
        </View>
        <Text style={styles.planPrice}>$499.99<Text style={styles.planDuration}>/ 365d</Text></Text>
        <Text style={styles.planExpires}>Expires: July 20, 2027</Text>
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionGrid}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>📱</Text>
          <Text style={styles.actionText}>Check-in QR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>📅</Text>
          <Text style={styles.actionText}>Book Class</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Activity</Text>
      <View style={styles.glassPanel}>
        <View style={styles.activityRow}>
          <Text style={styles.activityLabel}>Visits this week</Text>
          <Text style={styles.activityValue}>4</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.activityRow}>
          <Text style={styles.activityLabel}>Next Class</Text>
          <Text style={styles.activityValueCyan}>Yoga (Today, 5PM)</Text>
        </View>
      </View>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.sectionTitle}>Identity Parameters</Text>
      <View style={styles.glassPanel}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>FIRST NAME</Text>
          <Text style={styles.inputVal}>John</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.inputGroup}>
          <Text style={styles.label}>LAST NAME</Text>
          <Text style={styles.inputVal}>Doe</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.inputGroup}>
          <Text style={styles.label}>EMAIL</Text>
          <Text style={styles.inputVal}>john@example.com</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.gradientButton}>
        <Text style={styles.gradientButtonText}>Edit Profile</Text>
      </TouchableOpacity>
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
    color: '#a1a1aa',
    fontSize: 16,
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
    borderColor: '#00d2ff',
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
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 24,
  },
  activePlanCard: {
    backgroundColor: 'rgba(24, 24, 27, 0.8)',
    borderRadius: 20,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
    borderColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
  },
  glowBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#00d2ff', // Cyan
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  planTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
  },
  activeBadge: {
    backgroundColor: 'rgba(0, 210, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 210, 255, 0.5)',
  },
  activeBadgeText: {
    color: '#00d2ff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  planPrice: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '900',
    marginBottom: 8,
  },
  planDuration: {
    fontSize: 16,
    color: '#a1a1aa',
    fontWeight: 'normal',
  },
  planExpires: {
    color: '#a1a1aa',
    fontSize: 14,
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'rgba(24, 24, 27, 0.8)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
  },
  glassPanel: {
    backgroundColor: 'rgba(24, 24, 27, 0.8)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  activityLabel: {
    color: '#a1a1aa',
    fontSize: 16,
  },
  activityValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityValueCyan: {
    color: '#00d2ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  inputGroup: {
    paddingVertical: 12,
  },
  label: {
    color: '#8b5cf6', // Purple
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  inputVal: {
    color: '#fff',
    fontSize: 18,
  },
  gradientButton: {
    backgroundColor: '#8b5cf6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 32,
  },
  gradientButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
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
    color: '#00d2ff',
  }
});
