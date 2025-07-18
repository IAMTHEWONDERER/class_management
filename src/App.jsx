import React, { useState, useEffect } from 'react';
import { Calendar, Users, Settings, BookOpen, Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';

// Data structure and initial data
const initialData = {
  groups: ['A', 'B', 'C', 'D'],
  subGroups: {
    A: ['A1', 'A2', 'A3', 'A4'],
    B: ['B1', 'B2', 'B3', 'B4'],
    C: ['C1', 'C2', 'C3', 'C4'],
    D: ['D1', 'D2', 'D3', 'D4']
  },
  subjects: ['Calculus I', 'Physics I', 'Chemistry', 'Programming', 'Mathematics', 'English'],
  facilities: {
    amphitheaters: ['Aboutajdine', 'Zaoui', 'Ibn Khaldoun'],
    tdClasses: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
    tpClasses: ['Lab 1', 'Lab 2', 'Lab 3']
  },
  timeSlots: ['08:30 - 10:00', '10:15 - 11:45', '14:00 - 15:30', '15:45 - 17:15'],
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  groupColors: {
    A: { bg: 'bg-red-100', border: 'border-red-500', text: 'text-red-800', accent: 'bg-red-500' },
    B: { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-800', accent: 'bg-blue-500' },
    C: { bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-800', accent: 'bg-green-500' },
    D: { bg: 'bg-yellow-100', border: 'border-yellow-500', text: 'text-yellow-800', accent: 'bg-yellow-500' }
  }
};

// Storage utilities with real localStorage
const StorageManager = {
  STORAGE_KEY: 'school_schedule_data',
  
  saveSchedule: (schedule) => {
    const data = { 
      schedule, 
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    try {
      localStorage.setItem(StorageManager.STORAGE_KEY, JSON.stringify(data));
      console.log('Schedule saved successfully');
    } catch (error) {
      console.error('Error saving schedule:', error);
    }
  },
  
  loadSchedule: () => {
    try {
      const stored = localStorage.getItem(StorageManager.STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        return data.schedule;
      }
    } catch (error) {
      console.error('Error loading schedule:', error);
    }
    
    // Return empty schedule if nothing stored
    return {
      amphitheater: [],
      td: [],
      tp: []
    };
  },
  
  clearSchedule: () => {
    try {
      localStorage.removeItem(StorageManager.STORAGE_KEY);
      console.log('Schedule cleared successfully');
    } catch (error) {
      console.error('Error clearing schedule:', error);
    }
  },
  
  exportSchedule: () => {
    const stored = localStorage.getItem(StorageManager.STORAGE_KEY);
    if (stored) {
      const blob = new Blob([stored], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `school_schedule_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }
};

// Navigation Component
const NavigationTabs = ({ activeTab, setActiveTab }) => {
  const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'bg-blue-900 text-white border-b-2 border-blue-900'
          : 'text-gray-600 hover:text-blue-900 hover:bg-gray-50'
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          <TabButton
            id="schedule"
            label="Schedule Builder"
            icon={Calendar}
            isActive={activeTab === 'schedule'}
            onClick={() => setActiveTab('schedule')}
          />
          <TabButton
            id="facilities"
            label="Facilities"
            icon={Settings}
            isActive={activeTab === 'facilities'}
            onClick={() => setActiveTab('facilities')}
          />
          <TabButton
            id="groups"
            label="Groups"
            icon={Users}
            isActive={activeTab === 'groups'}
            onClick={() => setActiveTab('groups')}
          />
        </div>
      </div>
    </nav>
  );
};

// Schedule Builder Controls
const ScheduleControls = ({ 
  showEmptySlots, 
  setShowEmptySlots, 
  onClearSchedule, 
  onExportSchedule,
  selectedGroup,
  setSelectedGroup,
  selectedSubject,
  setSelectedSubject 
}) => (
  <div className="bg-white p-6 border border-gray-200 mb-6">
    <div className="flex flex-wrap gap-4 items-center justify-between">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Group:</label>
          <select 
            value={selectedGroup} 
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-900"
          >
            <option value="">Select Group</option>
            {initialData.groups.map(group => (
              <option key={group} value={group}>Group {group}</option>
            ))}
            {Object.values(initialData.subGroups).flat().map(subGroup => (
              <option key={subGroup} value={subGroup}>Sub-group {subGroup}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Subject:</label>
          <select 
            value={selectedSubject} 
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-900"
          >
            <option value="">Select Subject</option>
            {initialData.subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        
        <button 
          onClick={() => setShowEmptySlots(!showEmptySlots)}
          className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-colors duration-200 ${
            showEmptySlots 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : 'bg-gray-600 text-white hover:bg-gray-700'
          }`}
        >
          {showEmptySlots ? <Eye size={16} /> : <EyeOff size={16} />}
          <span>{showEmptySlots ? 'Hide Empty Slots' : 'Show Empty Slots'}</span>
        </button>
      </div>
      
      <div className="flex gap-2">
        <button 
          onClick={onExportSchedule}
          className="bg-blue-900 text-white px-4 py-2 text-sm font-medium hover:bg-blue-800 transition-colors duration-200"
        >
          Export Schedule
        </button>
        <button 
          onClick={onClearSchedule}
          className="bg-red-600 text-white px-4 py-2 text-sm font-medium hover:bg-red-700 transition-colors duration-200"
        >
          Clear All
        </button>
      </div>
    </div>
  </div>
);

// Add Class Modal
const AddClassModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  day, 
  timeSlot, 
  selectedGroup, 
  selectedSubject,
  setSelectedGroup,
  setSelectedSubject 
}) => {
  const [classType, setClassType] = useState('amphitheater');
  const [room, setRoom] = useState('');

  useEffect(() => {
    if (isOpen) {
      setRoom('');
    }
  }, [isOpen]);

  const handleSave = () => {
    if (!selectedGroup || !selectedSubject || !room) {
      alert('Please fill in all fields');
      return;
    }

    const newClass = {
      id: Date.now(),
      subject: selectedSubject,
      day,
      time: timeSlot,
      room,
      ...(selectedGroup.length === 1 ? { group: selectedGroup } : { subGroup: selectedGroup })
    };

    onSave(newClass, classType);
    onClose();
  };

  const getRoomOptions = () => {
    switch (classType) {
      case 'amphitheater':
        return initialData.facilities.amphitheaters;
      case 'td':
        return initialData.facilities.tdClasses;
      case 'tp':
        return initialData.facilities.tpClasses;
      default:
        return [];
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 border border-gray-200 w-96">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Add Class - {day} {timeSlot}
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class Type:</label>
            <select 
              value={classType}
              onChange={(e) => setClassType(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-900"
            >
              <option value="amphitheater">Amphitheater Course</option>
              <option value="td">TD Class</option>
              <option value="tp">TP Lab</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Group/Sub-group:</label>
            <select 
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-900"
            >
              <option value="">Select Group</option>
              {classType === 'amphitheater' && initialData.groups.map(group => (
                <option key={group} value={group}>Group {group}</option>
              ))}
              {(classType === 'td' || classType === 'tp') && Object.values(initialData.subGroups).flat().map(subGroup => (
                <option key={subGroup} value={subGroup}>Sub-group {subGroup}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject:</label>
            <select 
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-900"
            >
              <option value="">Select Subject</option>
              {initialData.subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room:</label>
            <select 
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-900"
            >
              <option value="">Select Room</option>
              {getRoomOptions().map(roomOption => (
                <option key={roomOption} value={roomOption}>{roomOption}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="bg-blue-900 text-white px-4 py-2 text-sm font-medium hover:bg-blue-800 transition-colors duration-200"
          >
            Add Class
          </button>
        </div>
      </div>
    </div>
  );
};

// Class Block Component
const ClassBlock = ({ classItem, onDelete }) => {
  const getGroupFromItem = (item) => {
    if (item.group) return item.group;
    if (item.subGroup) return item.subGroup.charAt(0);
    return 'A';
  };

  const group = getGroupFromItem(classItem);
  const colors = initialData.groupColors[group];
  
  return (
    <div className={`${colors.bg} ${colors.border} border-l-4 p-3 mb-2 hover:shadow-md transition-shadow duration-200 relative group`}>
      <button 
        onClick={() => onDelete(classItem.id)}
        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity duration-200"
      >
        <Trash2 size={14} />
      </button>
      
      <div className="flex items-center justify-between mb-1">
        <span className={`text-sm font-semibold ${colors.text}`}>
          {classItem.subject}
        </span>
        <span className={`text-xs px-2 py-1 ${colors.accent} text-white`}>
          {classItem.type}
        </span>
      </div>
      <div className="text-xs text-gray-600 space-y-1">
        <div className="flex items-center justify-between">
          <span>{classItem.group ? `Group ${classItem.group}` : `Sub-group ${classItem.subGroup}`}</span>
          <span className="font-medium">{classItem.room}</span>
        </div>
      </div>
    </div>
  );
};

// Empty Slot Component
const EmptySlot = ({ day, timeSlot, onClick }) => (
  <div 
    onClick={() => onClick(day, timeSlot)}
    className="border-2 border-dashed border-gray-300 p-3 mb-2 hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
  >
    <div className="text-center text-gray-500 text-sm">
      <Plus size={16} className="mx-auto mb-1" />
      <span>Add Class</span>
    </div>
  </div>
);

// Calendar View Component
const CalendarView = ({ schedule, showEmptySlots, onAddClass, onDeleteClass }) => {
  const getClassesForTimeSlot = (day, timeSlot) => {
    const allClasses = [
      ...(schedule.amphitheater || []).map(item => ({ ...item, type: 'Amphitheater' })),
      ...(schedule.td || []).map(item => ({ ...item, type: 'TD' })),
      ...(schedule.tp || []).map(item => ({ ...item, type: 'TP' }))
    ];

    return allClasses.filter(item => item.day === day && item.time === timeSlot);
  };

  return (
    <div className="bg-white border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Schedule Builder</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-600">Groups:</span>
              {Object.entries(initialData.groupColors).map(([group, colors]) => (
                <div key={group} className="flex items-center space-x-1">
                  <div className={`w-3 h-3 ${colors.accent}`}></div>
                  <span className={`${colors.text} font-medium`}>{group}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200 w-24">
                Time
              </th>
              {initialData.days.map(day => (
                <th key={day} className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200 min-w-48">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {initialData.timeSlots.map(timeSlot => (
              <tr key={timeSlot} className="border-b border-gray-200">
                <td className="px-4 py-4 text-sm font-medium text-gray-900 bg-gray-50 align-top">
                  {timeSlot}
                </td>
                {initialData.days.map(day => {
                  const classes = getClassesForTimeSlot(day, timeSlot);
                  return (
                    <td key={`${day}-${timeSlot}`} className="px-4 py-4 align-top border-l border-gray-200">
                      <div className="min-h-20">
                        {classes.map(classItem => (
                          <ClassBlock 
                            key={classItem.id} 
                            classItem={classItem} 
                            onDelete={onDeleteClass}
                          />
                        ))}
                        {(showEmptySlots || classes.length === 0) && (
                          <EmptySlot 
                            day={day} 
                            timeSlot={timeSlot} 
                            onClick={onAddClass}
                          />
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Statistics Card Component
const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <Icon size={24} className={`text-${color}-600`} />
    </div>
  </div>
);

// Facilities Overview Component
const FacilitiesOverview = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard 
        title="Amphitheaters" 
        value={initialData.facilities.amphitheaters.length}
        icon={BookOpen}
        color="blue"
      />
      <StatCard 
        title="TD Rooms" 
        value={initialData.facilities.tdClasses.length}
        icon={Users}
        color="green"
      />
      <StatCard 
        title="TP Labs" 
        value={initialData.facilities.tpClasses.length}
        icon={Settings}
        color="purple"
      />
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Amphitheaters</h3>
        <div className="space-y-3">
          {initialData.facilities.amphitheaters.map(room => (
            <div key={room} className="flex items-center justify-between p-3 bg-gray-50">
              <span className="font-medium text-gray-700">{room}</span>
              <span className="text-sm text-gray-500">400 capacity</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">TD Rooms</h3>
        <div className="space-y-3">
          {initialData.facilities.tdClasses.map(room => (
            <div key={room} className="flex items-center justify-between p-3 bg-gray-50">
              <span className="font-medium text-gray-700">{room}</span>
              <span className="text-sm text-gray-500">50 capacity</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">TP Labs</h3>
        <div className="space-y-3">
          {initialData.facilities.tpClasses.map(room => (
            <div key={room} className="flex items-center justify-between p-3 bg-gray-50">
              <span className="font-medium text-gray-700">{room}</span>
              <span className="text-sm text-gray-500">25 capacity</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Groups Overview Component
const GroupsOverview = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {initialData.groups.map(group => (
        <div key={group} className="bg-white p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Group {group}</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Students:</span>
              <span className="font-semibold">100</span>
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-medium mb-2">Sub-groups:</p>
              <div className="grid grid-cols-2 gap-2">
                {initialData.subGroups[group].map(subGroup => (
                  <div key={subGroup} className="bg-gray-50 p-2 text-center">
                    <span className="font-medium">{subGroup}</span>
                    <br />
                    <span className="text-xs text-gray-500">25 students</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Main App Component
const App = () => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [showEmptySlots, setShowEmptySlots] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ day: '', timeSlot: '' });
  
  const [schedule, setSchedule] = useState({
    amphitheater: [],
    td: [],
    tp: []
  });

  // Load schedule on component mount
  useEffect(() => {
    const loadedSchedule = StorageManager.loadSchedule();
    setSchedule(loadedSchedule);
  }, []);

  // Save schedule whenever it changes
  useEffect(() => {
    StorageManager.saveSchedule(schedule);
  }, [schedule]);

  const handleAddClass = (day, timeSlot) => {
    setModalData({ day, timeSlot });
    setModalOpen(true);
  };

  const handleSaveClass = (newClass, classType) => {
    setSchedule(prev => ({
      ...prev,
      [classType]: [...prev[classType], newClass]
    }));
    setSelectedGroup('');
    setSelectedSubject('');
  };

  const handleDeleteClass = (classId) => {
    setSchedule(prev => ({
      amphitheater: prev.amphitheater.filter(c => c.id !== classId),
      td: prev.td.filter(c => c.id !== classId),
      tp: prev.tp.filter(c => c.id !== classId)
    }));
  };

  const handleClearSchedule = () => {
    if (window.confirm('Are you sure you want to clear the entire schedule?')) {
      setSchedule({
        amphitheater: [],
        td: [],
        tp: []
      });
      StorageManager.clearSchedule();
    }
  };

  const handleExportSchedule = () => {
    StorageManager.exportSchedule();
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <BookOpen size={32} className="text-blue-900" />
              <h1 className="text-2xl font-bold text-gray-900">School Management System DEMO ( ENSAK )</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Academic Year 2024/2025</span>
              <button className="bg-blue-900 text-white px-4 py-2 text-sm font-medium hover:bg-blue-800 transition-colors duration-200">
                Settings
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <ScheduleControls 
              showEmptySlots={showEmptySlots}
              setShowEmptySlots={setShowEmptySlots}
              onClearSchedule={handleClearSchedule}
              onExportSchedule={handleExportSchedule}
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
            />
            <CalendarView 
              schedule={schedule} 
              showEmptySlots={showEmptySlots}
              onAddClass={handleAddClass}
              onDeleteClass={handleDeleteClass}
            />
          </div>
        )}
        {activeTab === 'facilities' && <FacilitiesOverview />}
        {activeTab === 'groups' && <GroupsOverview />}
      </main>

      {/* Add Class Modal */}
      <AddClassModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveClass}
        day={modalData.day}
        timeSlot={modalData.timeSlot}
        selectedGroup={selectedGroup}
        selectedSubject={selectedSubject}
        setSelectedGroup={setSelectedGroup}
        setSelectedSubject={setSelectedSubject}
      />
    </div>
  );
};

export default App;