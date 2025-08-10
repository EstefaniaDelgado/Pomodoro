import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from './src/components/Header';
import { Timer } from './src/components/Timer';
import { Audio } from 'expo-av';
import Tomato from './assets/tomato.png';

const TIMES = {
  POMO: 25 * 60,
  SHORT: 5 * 60,
  BREAK: 15 * 60,
};

const colors = {
  POMO: '#F7DC6F',
  SHORT: '#A2D9CE',
  BREAK: '#D7BDE2',
};

export default function App() {
  const [currentTime, setCurrentTime] = useState('POMO'); // valor por defecto válido
  const [time, setTime] = useState(TIMES['POMO']);
  const [isActive, setIsActive] = useState(false);

  // Cuando cambia la sesión (POMO, SHORT, BREAK), reiniciamos el tiempo
  useEffect(() => {
    setTime(TIMES[currentTime]);
  }, [currentTime]);

  // Temporizador
  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setIsActive(false);
            return TIMES[currentTime]; // reinicia el tiempo de la misma sesión
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, currentTime]);

  // Botón START/STOP
  function handleStartStop() {
    playSound();
    setIsActive((prev) => !prev);
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/click.mp3')
    );
    await sound.playAsync();
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: Platform.OS === 'android' && 30,

          position: 'relative',
        }}
      >
        <Image source={Tomato} style={styles.tomatoIcon} />

        <Text style={styles.text}>Pomodoro</Text>

        <Header
          time={time}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />

        <Timer time={time} />

        <TouchableOpacity onPress={handleStartStop} style={styles.button}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {isActive ? 'STOP' : 'START'}
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  tomatoIcon: {
    position: 'absolute',
    height: 60,
    width: 80,
    top: 20,
    right: 20,
  },
});
