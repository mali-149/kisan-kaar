import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

const Carousel = () => {
  const flatListRef = useRef();
  const width = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState(0);

  const data = [
    {id: '1', image: require('../assets/animations/marketfar.jpg')},
    {id: '2', image: require('../assets/animations/farm.jpg')},
    {id: '3', image: require('../assets/animations/tech.jpg')},
    {id: '4', image: require('../assets/animations/farweather.jpg')},
  ];

  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex === data.length - 1) {
        flatListRef.current.scrollToIndex({
          index: 0,
          animation: true,
        });
      } else {
        flatListRef.current.scrollToIndex({
          index: activeIndex + 1,
          animation: true,
        });
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [activeIndex, data.length]);

  const getItemLayout = (data, index) => ({
    length: width,
    offset: width * index,
    index: index,
  });

  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <Image
          source={item.image}
          style={styles.image}
        />
      </View>
    );
  };

  const renderDotIndicator = () => {
    return data.map((dot, index) => {
      if (activeIndex === index) {
        return (
          <View
            key={index}
            style={styles.activeDot}
          />
        );
      } else {
        return (
          <View
            key={index}
            style={styles.inactiveDot}
          />
        );
      }
    });
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        ref={flatListRef}
        getItemLayout={getItemLayout}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <View style={styles.dotContainer}>
        {renderDotIndicator()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: Dimensions.get('window').width - 10,
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#1E3D15',
    marginTop: 5,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  activeDot: {
    backgroundColor: '#1DB954',
    height: 8,
    width: 15,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  inactiveDot: {
    backgroundColor: '#1DB954',
    height: 8,
    width: 8,
    borderRadius: 5,
    marginHorizontal: 2,
  },
});

export default Carousel;
