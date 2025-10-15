import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { padding: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', borderBottomWidth: 1, borderColor: '#f3f4f6' },
  left: { flexDirection: 'row', alignItems: 'center' },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: '#94a3b8', marginRight: 12 },
  checked: { backgroundColor: '#86efac', borderColor: '#16a34a' },
  meta: { maxWidth: '75%' },
  title: { fontSize: 16, color: '#0f172a' },
  titleDone: { textDecorationLine: 'line-through', color: '#94a3b8' },
  desc: { fontSize: 13, color: '#475569' },
  right: { alignItems: 'flex-end' },
  ts: { fontSize: 12, color: '#64748b' },
});
