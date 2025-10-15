import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, AccessibilityRole } from 'react-native';
import styles from './styles';

type Props = {
  onAdd: (name: string, description?: string) => void;
};

export const TaskInput: React.FC<Props> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [desc, setDesc] = useState('');

  const submit = () => {
    if (!text.trim()) return;
    onAdd(text, desc);
    setText('');
    setDesc('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Task name"
        value={text}
        onChangeText={setText}
        accessibilityLabel="Add task name"
        style={styles.input}
        returnKeyType="done"
        onSubmitEditing={submit}
      />
      <TextInput
        placeholder="Optional description"
        value={desc}
        onChangeText={setDesc}
        accessibilityLabel="Add optional description"
        style={[styles.input, styles.desc]}
      />
      <TouchableOpacity
        accessibilityRole={'button' as AccessibilityRole}
        accessible
        accessibilityLabel="Add task"
        onPress={submit}
        style={styles.addButton}
      >
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

