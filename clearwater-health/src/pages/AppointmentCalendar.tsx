import React from 'react';
import { Calendar } from 'react-native-calendars';

export function AppointmentCalendar() {
  return (
    <Calendar
      style={{
        borderRadius: 20,
        height: 350,
        padding: 10,
        elevation: 4,
        shadowColor: '#E6E2DE',
      }}

      theme={{
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#4A4A48',
        selectedDayBackgroundColor: '#008080',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#FF7F50',
        dayTextColor: '#6B6A67',
        arrowColor: '#008080',
        fontFamily: 'System',
      }}
      markedDates={{
        '2026-02-02': { selected: true, marked: true, selectedColor: '#008080' },
      }}
    />
  );
}