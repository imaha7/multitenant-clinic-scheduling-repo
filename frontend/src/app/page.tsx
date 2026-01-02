'use client'

import { useState, useEffect, useCallback } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import BookingForm from './components/BookingForm'
import { Doctor, Service } from './types'
import { ItemCard } from './components/Card'

const API_BASE = 'http://localhost:3000' // Adjust to your backend URL

async function getDoctors() {
  const res = await fetch(
    `${API_BASE}/doctors`,
    {
      cache: 'no-store', // real-time
      // headers: {
      //   'X-Tenant-Id': '42',
      // },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch');
  }

  return res.json();
}

async function getServices() {
  const res = await fetch(
    `${API_BASE}/services`,
    {
      cache: 'no-store', // real-time
      // headers: {
      //   'X-Tenant-Id': '42',
      // },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch');
  }

  return res.json();
}

async function cancelAppointment(appointmentId: string) {
  const res = await fetch(
    `${API_BASE}/appointments/${appointmentId}`,
    {
      method: 'DELETE',
      cache: 'no-store', // real-time
      // headers: {
      //   'X-Tenant-Id': '42',
      // },
      // body: JSON.stringify({ appointmentId }),
    }
  );

  if (!res.ok) {
    throw new Error('Failed to delete');
  }

  if (res.status === 204) {
    return null; // ✅ JANGAN res.json()
  }

  const data = await res.json();
  return data;
}

async function getDoctorAppointments(doctorId: string, serviceId: string, apiBase: string, date: string) {
  const res = await fetch(
    `${apiBase}/api/${doctorId}/doctor-appointments?service_id=${serviceId}&from=${date}T00:00:00.000Z&to=${date}T23:59:59.000Z`,
    {
      cache: 'no-store', // real-time
      headers: {
        'x-tenant-id': 'e966f1ee-3fb9-4b3d-a724-c3a0e44d2cff',
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch');
  }

  const data = await res.json();
  if (data) {
    console.log(data);
    return data;
  } else {
    return;
  }
}

function toLocalISOString(date: Date) {
  const pad = (n: number) => String(n).padStart(2, '0');

  const tzOffset = -date.getTimezoneOffset(); // menit
  const sign = tzOffset >= 0 ? '+' : '-';
  const hours = pad(Math.floor(Math.abs(tzOffset) / 60));
  const minutes = pad(Math.abs(tzOffset) % 60);

  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
    // `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}` +
    // `${sign}${hours}:${minutes}`
  );
}

export default function Home() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [doctorAppointments, setDoctorAppointments] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const date = toLocalISOString(selectedDate);
  const [selectedAppointment, setSelectedAppointment] = useState<any>('')

  const handleDateChange = (value: Date | Date[] | any) => {
    if (value instanceof Date) {
      setSelectedDate(value)
      if (selectedDoctor && selectedService) {
        getDoctorAppointments(selectedDoctor?.id, selectedService?.id, API_BASE, date).then((data) => {
          if (data[0]?.appointments) {
            setDoctorAppointments(data[0]?.appointments);
          } else {
            setDoctorAppointments([]);
          }
        });
      }
    }
  }

  const callDoctorAppointments = () => {
    try {
      if (selectedDoctor && selectedService) {
        getDoctorAppointments(selectedDoctor?.id, selectedService?.id, API_BASE, date).then((data) => {
          if (data[0]?.appointments) {
            setDoctorAppointments(data[0]?.appointments);
          } else {
            setDoctorAppointments([]);
          }
        });
      } else {
        setDoctorAppointments([]);
      }
    } catch (error) {
      alert('Error cancelling appointment')
    }
  };

  const handleCancelAppointment = (id: string) => {
    try {
      cancelAppointment(id);
      callDoctorAppointments();
    } catch (error) {
      alert('Error cancelling appointment')
    }
  };

  useEffect(() => {
    getDoctors().then(setDoctors);
    getServices().then(setServices);
    callDoctorAppointments();
  }, [selectedDate, selectedService, selectedDoctor])

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Doctor Selection */}
      <div className="bg-white text-black p-4 rounded shadow">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Select Doctor</h2>
          <select
            value={selectedDoctor?.id || ''}
            onChange={(e) => {
              const doctor = doctors.find(d => d.id === e.target.value)
              setSelectedDoctor(doctor || null)
            }}
            className="border p-2 rounded w-full"
          >
            <option value="">Select a doctor</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Service</label>
          <select
            value={selectedService?.id || ''}
            onChange={(e) => {
              const service = services.find(s => s.id === e.target.value)
              setSelectedService(service || null)
              console.log(service?.id);
            }}
            className="border p-2 rounded w-full"
          >
            <option value="">Select a service</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>{service.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Calendar View */}
      {selectedDoctor && selectedService && (
        <div className="bg-white text-black p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Calendar for {selectedDoctor.name}</h2>
          <Calendar
            onChange={(e) => handleDateChange(e)}
            value={selectedDate}
            view="month"
            className="w-full"
          />
          {/* <p className="mt-2">Selected Date: {selectedDate.toDateString()}</p> */}
          {/* {isFetching && (<p className="mt-2">Fetching data...</p>)} */}
          {doctorAppointments.length > 0 && (doctorAppointments.map((d: any) => <ItemCard
            key={d.id}
            title={d.name}
            subtitle={d.startsAt.substring(11, 16) + ` -> ` + d.endsAt.substring(11, 16)}
            description=""
            rightText="Cancel"
            onClick={() => setSelectedAppointment(d.id)}
            onDelete={() => handleCancelAppointment(d.id)}
            selected={selectedAppointment === d.id}
          />))}
        </div>
      )}

      {/* Booking Form */}
      <BookingForm doctors={doctors} services={services} apiBase={API_BASE} />
    </div>
  )
}