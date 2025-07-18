# School Management System

A comprehensive React-based application for managing university schedules, designed specifically for educational institutions with complex scheduling needs involving amphitheaters, TD (Directed Work) classes, and TP (Practical Work) labs.

## 🎯 Overview

This system helps school administrators efficiently manage class schedules across multiple groups, sub-groups, subjects, and facilities. It provides an interactive calendar interface where users can create, edit, and visualize academic schedules while ensuring no scheduling conflicts occur.

## ✨ Features

### 📅 Interactive Schedule Builder
- **Empty Schedule Start**: Begin with a blank calendar and build schedules from scratch
- **Click-to-Add**: Simply click any time slot to add a new class
- **Real-time Updates**: Changes are instantly reflected and auto-saved
- **Visual Feedback**: Color-coded groups and intuitive interface

### 🏛️ Multi-Facility Support
- **Amphitheaters**: Aboutajdine, Zaoui, Ibn Khaldoun (400 capacity each)
- **TD Classrooms**: Class 1-5 (50 capacity each)
- **TP Labs**: Lab 1-3 (25 capacity each)

### 👥 Group Management
- **4 Main Groups**: A, B, C, D (100 students each)
- **16 Sub-groups**: A1-A4, B1-B4, C1-C4, D1-D4 (25 students each)
- **Color-coded**: Red (A), Blue (B), Green (C), Yellow (D)

### 📚 Academic Structure
- **6 Core Subjects**: Calculus I, Physics I, Chemistry, Programming, Mathematics, English
- **3 Class Types**:
  - **Amphitheater Courses**: Full group lectures (100 students)
  - **TD Classes**: Directed work for sub-groups (25 students)
  - **TP Labs**: Practical work for sub-groups (25 students)

### 💾 Data Management
- **Local Storage**: All data persists in browser localStorage
- **Auto-save**: Changes automatically saved
- **Export/Import**: Download schedules as JSON files
- **Clear Function**: Reset entire schedule with confirmation

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager
- Modern web browser with localStorage support

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/school-management-system.git
cd school-management-system
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start the development server**
```bash
npm start
# or
yarn start
```

4. **Open your browser**
Navigate to `http://localhost:3000` to view the application.

## 🎮 How to Use

### Creating Your First Schedule

1. **Navigate to Schedule Builder**: Click the "Schedule Builder" tab
2. **Show Empty Slots**: Toggle "Show Empty Slots" to see available time slots
3. **Add a Class**: Click on any empty slot (dashed border with "+" icon)
4. **Fill Class Details**:
   - Select class type (Amphitheater/TD/TP)
   - Choose group or sub-group
   - Pick subject
   - Select appropriate room
5. **Save**: Click "Add Class" to confirm

### Managing Classes

- **Delete Classes**: Hover over any class block and click the trash icon
- **View Schedule**: Toggle empty slots on/off for cleaner view
- **Clear All**: Use "Clear All" button to reset entire schedule
- **Export**: Download your schedule as a JSON file

### Best Practices

#### Scheduling Rules
- **No Overlaps**: Students can't be in multiple places at once
- **Morning/Afternoon Split**: 
  - Morning: 8:30-11:45
  - Afternoon: 14:00-17:15
- **Group Coordination**: If Group A has amphitheater course in morning, sub-groups A1-A4 should have TDs/TPs in afternoon

#### Facility Usage
- **Amphitheaters**: Use for full group courses (100 students)
- **TD Classrooms**: Use for sub-group directed work (25 students)
- **TP Labs**: Use for practical subjects like Programming, Chemistry, Physics I

## 🏗️ Architecture

### Component Structure
```
src/
├── SchoolManagementTool.jsx     # Main application component
├── components/
│   ├── NavigationTabs.jsx       # Tab navigation
│   ├── ScheduleControls.jsx     # Control buttons and filters
│   ├── CalendarView.jsx         # Main calendar grid
│   ├── ClassBlock.jsx           # Individual class display
│   ├── AddClassModal.jsx        # Class creation modal
│   ├── EmptySlot.jsx           # Empty time slot component
│   ├── FacilitiesOverview.jsx   # Facility management
│   └── GroupsOverview.jsx       # Group information
├── utils/
│   └── StorageManager.js        # Local storage utilities
└── data/
    └── initialData.js           # Configuration and static data
```

### Data Structure
```javascript
{
  schedule: {
    amphitheater: [
      {
        id: 1,
        subject: "Calculus I",
        group: "A",
        time: "08:30 - 10:00",
        room: "Aboutajdine",
        day: "Monday"
      }
    ],
    td: [
      {
        id: 100,
        subject: "Programming",
        subGroup: "A1",
        time: "14:00 - 15:30",
        room: "Class 1",
        day: "Monday"
      }
    ],
    tp: [
      {
        id: 200,
        subject: "Chemistry",
        subGroup: "A1",
        time: "15:45 - 17:15",
        room: "Lab 1",
        day: "Monday"
      }
    ]
  },
  timestamp: "2024-07-18T10:30:00.000Z",
  version: "1.0"
}
```

## 🎨 Design System

### Colors
- **Primary**: #002c84 (Blue-900)
- **Group A**: Red theme (#ef4444)
- **Group B**: Blue theme (#3b82f6)
- **Group C**: Green theme (#10b981)
- **Group D**: Yellow theme (#f59e0b)

### Typography
- **Font Family**: Roboto
- **Design Language**: Sharp edges, no rounded corners
- **Modern University Aesthetic**: Clean, professional appearance

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full calendar view with all features
- **Tablet**: Optimized layout with horizontal scrolling
- **Mobile**: Stacked layout with touch-friendly controls

## 🔧 Configuration

### Time Slots
```javascript
timeSlots: [
  '08:30 - 10:00',  // Morning Block 1
  '10:15 - 11:45',  // Morning Block 2
  '14:00 - 15:30',  // Afternoon Block 1
  '15:45 - 17:15'   // Afternoon Block 2
]
```

### Academic Week
- Monday through Saturday
- 4 time slots per day
- 24 total time slots per week

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, please contact:
- Email: support@schoolmanagementsystem.com
- Documentation: [Wiki](https://github.com/your-username/school-management-system/wiki)
- Issues: [GitHub Issues](https://github.com/your-username/school-management-system/issues)

## 🔮 Future Enhancements

- [ ] Conflict detection and warnings
- [ ] Teacher assignment management
- [ ] Student attendance tracking
- [ ] Calendar import/export (iCal format)
- [ ] Multi-language support
- [ ] Print-friendly schedule views
- [ ] Mobile app version
- [ ] Real-time collaboration features
- [ ] Advanced analytics and reporting

## 🙏 Acknowledgments

- Built with React and Tailwind CSS
- Icons by Lucide React
- Inspired by modern university scheduling needs
- Designed for educational institutions worldwide

---

**Made with ❤️ for educational institutions seeking better schedule management.**