import React from 'react';
import { View, Text, FlatList, StatusBar } from 'react-native';
import styles from './styles';
import { TaskItem } from '../../components/TaskItem/TaskItem';
import { TaskInput } from '../../components/TaskInput/TaskInput';
import { useTasks } from '../../hooks/useTasks';
import { SafeAreaView } from 'react-native-safe-area-context';


const TaskScreen: React.FC = () => {
  const { tasks, create, toggle, remove, remainingCount } = useTasks();

  const renderItem = ({ item }: any) => <TaskItem task={item} onToggle={toggle} onDelete={remove} />;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.header}>Task Tracker</Text>
        <Text style={styles.subHeader}>{remainingCount} {remainingCount === 1 ? 'task' : 'tasks'} remaining</Text>

        <TaskInput onAdd={(name, description) => create({ name, description })} />

        {tasks.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No tasks yet.</Text>
          </View>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 120 }}
            accessibilityRole="list"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default TaskScreen;
