import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const CropDetails = ({ route }) => {
  const { crop } = route.params;

  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (index) => {
    setExpandedSections(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const renderSections = () => {
    if (!crop.sections) {
      return <Text>No sections available</Text>;
    }
    return crop.sections.map((section, index) => (
      <View key={index} style={styles.sectionContainer}>
        <TouchableOpacity onPress={() => toggleSection(index)} style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.toggleIcon}>{expandedSections[index] ? '-' : '+'}</Text>
        </TouchableOpacity>
        {expandedSections[index] && <Text style={styles.sectionContent}>{section.content}</Text>}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.cropName}>{crop.name}</Text>
      <Text style={styles.cropDescription}>{crop.description}</Text>
      {renderSections()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  cropName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1E3D15',
  },
  cropDescription: {
    fontSize: 16,
    color: '#1E3D15',
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D0D0D0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3D15',
  },
  toggleIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3D15',
  },
  sectionContent: {
    fontSize: 14,
    color: '#666',
    padding: 10,
  },
});

export default CropDetails;
