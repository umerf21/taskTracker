import React from 'react';
import { View, Text, TouchableOpacity, Alert, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Task } from '../../types';
import styles from './styles';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export const TaskItem: React.FC<Props> = ({ task, onToggle, onDelete }) => {
  const handleLongPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Alert.alert('Delete task', `Delete "${task.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => onDelete(task.id) },
    ]);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onToggle(task.id)}
      onLongPress={handleLongPress}
      accessibilityLabel={`Task ${task.name}`}
      accessibilityHint={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      style={styles.container}
    >
      <View style={styles.left}>
        <View style={[styles.checkbox, task.completed && styles.checked]} accessibilityRole="checkbox" accessibilityState={{ checked: task.completed }} />
        <View style={styles.meta}>
          <Text style={[styles.title, task.completed && styles.titleDone]} numberOfLines={1}>
            {task.name}
          </Text>
          {task.description ? <Text style={styles.desc} numberOfLines={1}>{task.description}</Text> : null}
        </View>
      </View>
      <View style={styles.right}>
        <Text style={styles.ts}>{new Date(task.createdAt).toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
  );
};