<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'

interface Subject {
  id: string;
  name: string;
  color: string;
  professor?: string;
}

interface TimeSlot {
  day: string;
  time: string;
  subject: Subject | null;
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = [];
for (let hour = 8; hour < 17; hour++) {
  timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
}

const schedule = ref<TimeSlot[]>([]);
const subjects = ref<Subject[]>([]);
const newSubjectName = ref('');
const newSubjectProfessor = ref('');
const selectedSubject = ref<Subject | null>(null);
const showSubjectForm = ref(false);
const searchTerm = ref('');

// Initialize schedule
const initializeSchedule = () => {
  schedule.value = [];
  days.forEach(day => {
    timeSlots.forEach(time => {
      schedule.value.push({ day, time, subject: null });
    });
  });
};

// Load saved data from localStorage
const loadSavedData = () => {
  const savedSchedule = localStorage.getItem('schedule');
  const savedSubjects = localStorage.getItem('subjects');
  
  if (savedSchedule) {
    schedule.value = JSON.parse(savedSchedule);
  } else {
    initializeSchedule();
  }
  
  if (savedSubjects) {
    subjects.value = JSON.parse(savedSubjects);
  }
};

// Save data to localStorage
const saveData = () => {
  localStorage.setItem('schedule', JSON.stringify(schedule.value));
  localStorage.setItem('subjects', JSON.stringify(subjects.value));
};

// Watch for changes and save
watch([schedule, subjects], () => {
  saveData();
}, { deep: true });

onMounted(() => {
  loadSavedData();
});

const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 80%)`;
};

const addSubject = () => {
  if (newSubjectName.value.trim()) {
    const newSubject: Subject = {
      id: (subjects.value.length + 1).toString(),
      name: newSubjectName.value,
      professor: newSubjectProfessor.value,
      color: getRandomColor()
    };
    subjects.value.push(newSubject);
    newSubjectName.value = '';
    newSubjectProfessor.value = '';
    showSubjectForm.value = false;
  }
};

const deleteSubject = (subjectId: string) => {
  // Remove subject from schedule
  schedule.value.forEach(slot => {
    if (slot.subject?.id === subjectId) {
      slot.subject = null;
    }
  });
  
  // Remove subject from list
  subjects.value = subjects.value.filter(s => s.id !== subjectId);
  if (selectedSubject.value?.id === subjectId) {
    selectedSubject.value = null;
  }
};

const getTimeSlot = (day: string, time: string) => {
  return schedule.value.find(slot => slot.day === day && slot.time === time);
};

const handleCellClick = (day: string, time: string) => {
  if (!selectedSubject.value) return;
  
  const slot = getTimeSlot(day, time);
  if (slot) {
    slot.subject = selectedSubject.value;
  }
};

const clearSlot = (day: string, time: string) => {
  const slot = getTimeSlot(day, time);
  if (slot) {
    slot.subject = null;
  }
};

const clearSchedule = () => {
  if (confirm('Are you sure you want to clear the entire schedule?')) {
    initializeSchedule();
  }
};

const filteredSubjects = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return subjects.value.filter(subject => 
    subject.name.toLowerCase().includes(term) || 
    subject.professor?.toLowerCase().includes(term)
  );
});
</script>

<template>
  <div class="schedule-container">
    <div class="header">
      <h2>Weekly Schedule</h2>
      <div class="actions">
        <button @click="showSubjectForm = true" class="btn primary">
          <span class="icon">➕</span> Add Subject
        </button>
        <button @click="clearSchedule" class="btn danger">
          <span class="icon">🗑️</span> Clear Schedule
        </button>
      </div>
    </div>
    
    <!-- Subject Form Modal -->
    <div v-if="showSubjectForm" class="modal-overlay">
      <div class="modal">
        <h3>Add New Subject</h3>
        <div class="form-group">
          <label>Subject Name:</label>
          <input 
            v-model="newSubjectName" 
            placeholder="Enter subject name"
            @keyup.enter="addSubject"
          >
        </div>
        <div class="form-group">
          <label>Professor:</label>
          <input 
            v-model="newSubjectProfessor" 
            placeholder="Enter professor name"
            @keyup.enter="addSubject"
          >
        </div>
        <div class="modal-actions">
          <button @click="showSubjectForm = false" class="btn">Cancel</button>
          <button @click="addSubject" class="btn primary">Add Subject</button>
        </div>
      </div>
    </div>
    
    <div class="controls">
      <div class="search-box">
        <input 
          v-model="searchTerm"
          placeholder="Search subjects..."
          type="text"
        >
      </div>
      
      <div class="subject-list">
        <div 
          v-for="subject in filteredSubjects" 
          :key="subject.id"
          class="subject-item"
          :class="{ selected: selectedSubject?.id === subject.id }"
          :style="{ backgroundColor: subject.color }"
          @click="selectedSubject = subject"
        >
          <div class="subject-info">
            <div class="subject-name">{{ subject.name }}</div>
            <div v-if="subject.professor" class="subject-professor">
              👤 {{ subject.professor }}
            </div>
          </div>
          <button 
            @click.stop="deleteSubject(subject.id)" 
            class="delete-btn"
            title="Delete subject"
          >
            ✖
          </button>
        </div>
      </div>
    </div>

    <div class="table-container">
      <table class="schedule-table">
        <thead>
          <tr>
            <th>Time</th>
            <th v-for="day in days" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="time in timeSlots" :key="time">
            <td class="time-cell">{{ time }}</td>
            <td 
              v-for="day in days" 
              :key="day"
              class="schedule-cell"
              :class="{ 'has-subject': getTimeSlot(day, time)?.subject }"
              @click="handleCellClick(day, time)"
              @contextmenu.prevent="clearSlot(day, time)"
            >
              <div 
                v-if="getTimeSlot(day, time)?.subject"
                class="subject-tag"
                :style="{ backgroundColor: getTimeSlot(day, time)?.subject?.color }"
              >
                <div class="subject-tag-name">
                  {{ getTimeSlot(day, time)?.subject?.name }}
                </div>
                <div v-if="getTimeSlot(day, time)?.subject?.professor" class="subject-tag-professor">
                  {{ getTimeSlot(day, time)?.subject?.professor }}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="instructions">
      <details>
        <summary>Instructions</summary>
        <ul>
          <li>Click "Add Subject" to create a new subject</li>
          <li>Click a subject from the list to select it</li>
          <li>Click any cell in the schedule to add the selected subject</li>
          <li>Right-click a cell to clear it</li>
          <li>Use the search box to filter subjects</li>
          <li>Click the delete button (✖) to remove a subject</li>
        </ul>
      </details>
    </div>
  </div>
</template>

<style scoped>
.schedule-container {
  background-color: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

h2 {
  color: #1a1a1a;
  font-size: 1.8rem;
  margin: 0;
}

.actions {
  display: flex;
  gap: 1rem;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background-color: #f3f4f6;
  color: #1f2937;
}

.btn:hover {
  background-color: #e5e7eb;
}

.btn.primary {
  background-color: #3b82f6;
  color: white;
}

.btn.primary:hover {
  background-color: #2563eb;
}

.btn.danger {
  background-color: #ef4444;
  color: white;
}

.btn.danger:hover {
  background-color: #dc2626;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.modal h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #1a1a1a;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #4b5563;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.controls {
  margin-bottom: 2rem;
}

.search-box {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.subject-list {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.subject-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.subject-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.subject-item.selected {
  outline: 3px solid #3b82f6;
}

.subject-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.subject-name {
  font-weight: 500;
}

.subject-professor {
  font-size: 0.875rem;
  opacity: 0.8;
}

.delete-btn {
  padding: 0.25rem 0.5rem;
  border: none;
  background: none;
  color: #4b5563;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.delete-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
  color: #1f2937;
}

.table-container {
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.schedule-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
  background-color: white;
}

th, td {
  padding: 1rem;
  text-align: left;
  border: 1px solid #e5e7eb;
}

th {
  background-color: #f9fafb;
  font-weight: 600;
  color: #1f2937;
}

.time-cell {
  background-color: #f9fafb;
  font-weight: 500;
  white-space: nowrap;
  color: #4b5563;
}

.schedule-cell {
  height: 80px;
  cursor: pointer;
  transition: background-color 0.2s;
  vertical-align: top;
}

.schedule-cell:hover {
  background-color: #f9fafb;
}

.schedule-cell.has-subject:hover {
  opacity: 0.9;
}

.subject-tag {
  height: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.subject-tag-name {
  font-weight: 500;
}

.subject-tag-professor {
  font-size: 0.875rem;
  opacity: 0.8;
}

.instructions {
  margin-top: 2rem;
  color: #4b5563;
}

.instructions summary {
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.instructions ul {
  margin-top: 0.5rem;
  padding-left: 1.5rem;
}

.instructions li {
  margin-bottom: 0.5rem;
}

@media (max-width: 640px) {
  .header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .actions {
    flex-direction: column;
  }
  
  .schedule-container {
    padding: 1rem;
  }
}
</style>