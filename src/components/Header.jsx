import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const options = [
  { label: 'Pomodoro', value: 'POMO' },
  { label: 'Short Break', value: 'SHORT' },
  { label: 'Long Break', value: 'BREAK' },
];

const Header = ({ currentTime, setCurrentTime, setTime }) => {
 

  function handlePress(value) {
    setCurrentTime(value);
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {options.map((option, index) => (
        <TouchableOpacity
          onPress={() => handlePress(option.value)}
          key={`item-option-${index}`}
          style={[
            styles.itemStyle,
            currentTime !== option.value && { borderColor: 'transparent' },
          ]}
        >
          <Text style={{ fontWeight: 'bold' }}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  itemStyle: {
    width: '33%',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 20,
    borderWidth: 3,
    padding: 5,
    borderColor: 'white',
  },
});
