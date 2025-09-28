import React, { useRef, useState } from 'react';
import {
    LayoutChangeEvent,
    PanResponder,
    PanResponderGestureState,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const BUTTON_SIZE = 44;
const PREVIEW_HEIGHT = 200;

const ColorPicker: React.FC = () => {
  const [red, setRed] = useState(120);
  const [green, setGreen] = useState(80);
  const [blue, setBlue] = useState(200);

  const updateColor = (color: 'red' | 'green' | 'blue', value: number) => {
    const newValue = Math.max(0, Math.min(255, value));
    
    switch (color) {
      case 'red':
        setRed(newValue);
        break;
      case 'green':
        setGreen(newValue);
        break;
      case 'blue':
        setBlue(newValue);
        break;
    }
  };

  const sliderRefs = useRef<{[key: string]: View}>({});
  const [activeSlider, setActiveSlider] = useState<string | null>(null);
  const [sliderWidth, setSliderWidth] = useState(0);

  const handleSliderLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setSliderWidth(width);
  };

  const handlePanResponderMove = (color: 'red' | 'green' | 'blue', gestureState: PanResponderGestureState) => {
    if (sliderWidth === 0) return;
    
    sliderRefs.current[color].measure((x, y, width, height, pageX, pageY) => {
      if (pageX === undefined) return;
      
      const relativeX = Math.max(0, Math.min(sliderWidth, gestureState.moveX - pageX));
      const percentage = relativeX / sliderWidth;
      const newValue = Math.round(percentage * 255);
      
      updateColor(color, newValue);
    });
  };

  const panResponder = (color: 'red' | 'green' | 'blue') => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState) => {
        setActiveSlider(color);
        handlePanResponderMove(color, gestureState);
      },
      onPanResponderMove: (_, gestureState) => {
        handlePanResponderMove(color, gestureState);
      },
      onPanResponderRelease: () => {
        setActiveSlider(null);
      },
      onPanResponderTerminate: () => {
        setActiveSlider(null);
      },
    });
  };

  const renderColorControl = (color: 'red' | 'green' | 'blue', value: number) => {
    const colorName = {
      red: 'Đỏ',
      green: 'Xanh lá',
      blue: 'Xanh dương'
    }[color];

    const pan = panResponder(color).panHandlers;

    return (
      <View style={styles.colorControl} key={color}>
        <Text style={styles.colorLabel}>
          {colorName}: <Text style={styles.colorValue}>{value}</Text>
        </Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.minusButton]}
            onPress={() => updateColor(color, value - 10)}
            onLongPress={() => {
              const interval = setInterval(() => updateColor(color, value - 10), 100);
              const clear = () => {
                clearInterval(interval);
                document.removeEventListener('touchend', clear);
              };
              document.addEventListener('touchend', clear);
            }}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          
          <View 
            style={[
              styles.slider, 
              { 
                backgroundColor: `rgba(${color === 'red' ? value : 0}, ${color === 'green' ? value : 0}, ${color === 'blue' ? value : 0}, 0.5)`,
                opacity: 1
              }
            ]}
            onLayout={handleSliderLayout}
            ref={ref => {
              if (ref) {
                sliderRefs.current[color] = ref;
              }
            }}
            {...pan}
          >
            <View 
              style={[styles.sliderFill, { 
                width: `${(value / 255) * 100}%`,
                backgroundColor: `rgb(${color === 'red' ? value : 0}, ${color === 'green' ? value : 0}, ${color === 'blue' ? value : 0})`
              }]} 
            />
            <View 
              style={[
                styles.thumb,
                {
                  left: `${(value / 255) * 100}%`,
                  marginLeft: -10,
                  backgroundColor: `rgb(${color === 'red' ? value : 0}, ${color === 'green' ? value : 0}, ${color === 'blue' ? value : 0})`,
                  opacity: 1
                }
              ]}
            />
          </View>
          
          <TouchableOpacity
            style={[styles.button, styles.plusButton]}
            onPress={() => updateColor(color, value + 10)}
            onLongPress={() => {
              const interval = setInterval(() => updateColor(color, value + 10), 100);
              const clear = () => {
                clearInterval(interval);
                document.removeEventListener('touchend', clear);
              };
              document.addEventListener('touchend', clear);
            }}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.preview, { backgroundColor: `rgb(${red}, ${green}, ${blue})` }]}>
        <Text style={styles.previewText}>
          RGB({red}, {green}, {blue})
        </Text>
        <Text style={styles.hexText}>
          #{red.toString(16).padStart(2, '0')}{green.toString(16).padStart(2, '0')}{blue.toString(16).padStart(2, '0').toUpperCase()}
        </Text>
      </View>

      <View style={styles.controlsContainer}>
        {renderColorControl('red', red)}
        {renderColorControl('green', green)}
        {renderColorControl('blue', blue)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  preview: {
    height: PREVIEW_HEIGHT,
    borderRadius: 12,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  previewText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 8,
  },
  hexText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  controlsContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  colorControl: {
    marginBottom: 20,
  },
  colorLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  colorValue: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  minusButton: {
    marginRight: 12,
  },
  plusButton: {
    marginLeft: 12,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 28,
  },
  slider: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#e9ecef',
    position: 'relative',
    justifyContent: 'center',
  },
  sliderFill: {
    height: 10,
    borderRadius: 5,
    position: 'absolute',
    top: '50%',
    marginTop: -5,
    left: 0,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    top: '50%',
    marginTop: -10,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default ColorPicker;
