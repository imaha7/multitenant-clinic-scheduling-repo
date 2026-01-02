'use client'

import { useEffect, useState } from 'react'
import { Doctor, Service } from '../types'

interface BookingFormProps {
    doctors: Doctor[]
    services: Service[]
    apiBase: string
}

async function getAvailability(id: string, apiBase: string, date: string, fromTime: string, toTime: string) {
    const res = await fetch(
        `${apiBase}/api/availability?service_id=${id}&from=${date}T${fromTime}:00.000Z&to=${date}T${toTime}:00.000Z`,
        {
            cache: 'no-store', // real-time
            headers: {
                'x-tenant-id': 'e966f1ee-3fb9-4b3d-a724-c3a0e44d2cff',
            },
        }
    );
    const data = await res.json();
    try {
        return data.slots;
    } catch (error) {
        throw new Error('Failed to fetch');
    }
}

async function createPatient(apiBase: string, tenantId: string, name: string) {
    const res = await fetch(
        `${apiBase}/patients`,
        {
            method: 'POST',
            cache: 'no-store', // real-time
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                tenantId: tenantId
            }),
        }
    );
    const data = await res.json();
    try {
        console.log(data);
        return data;
    } catch (error) {
        throw new Error('Failed to create patient');
    }
}

async function createAppointment(apiBase: string, name: string, startsAt: string, endsAt: string, tenantId: string, doctorId: string, patientId: string, serviceId: string, roomId: string, deviceId: string) {
    const res = await fetch(
        `${apiBase}/appointments`,
        {
            method: 'POST',
            cache: 'no-store', // real-time
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                startsAt: startsAt,
                endsAt: endsAt,
                doctorId: doctorId,
                patientId: patientId,
                serviceId: serviceId,
                roomId: roomId,
                deviceId: deviceId,
                tenantId: tenantId
            }),
        }
    );
    const data = await res.json();
    try {
        console.log(data);
        return data;
    } catch (error) {
        throw new Error('Failed to create appointment');
    }
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
}

function addMinutes(time: string, minutes: number) {
    const [hour, minute] = time.split(':').map(Number);

    const date = new Date();
    date.setHours(hour, minute, 0, 0);
    date.setMinutes(date.getMinutes() + minutes);

    const pad = (n: number) => String(n).padStart(2, '0');

    return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function BookingForm({ doctors, services, apiBase }: BookingFormProps) {
    const [selectedService, setSelectedService] = useState<Service | null>(null)
    // const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
    const [availableSlots, setAvailableSlots] = useState<string[]>([])
    const [selectedSlot, setSelectedSlot] = useState<any>('')
    const [date, setDate] = useState<string>('');
    const [fromTime, setFromTime] = useState<string>('');
    const [toTime, setToTime] = useState<string>('');
    const [patientName, setPatientName] = useState<string>('');
    const [isDisabled, setDisabled] = useState<boolean>(true);
    const [message, setMessage] = useState<string>('');
    const today = new Date().toISOString().split('T')[0];
    const now = new Date();

    const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
        console.log('Selected date: ', e.target.value);
    };

    const handleChangeFromTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFromTime(e.target.value);
        console.log('Selected From Time: ', e.target.value);
    };

    const handleChangeToTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        setToTime(e.target.value);
        console.log('Selected To Time: ', e.target.value);
    };

    const handleChangePatientName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPatientName(e.target.value);
        setDisabled(!selectedSlot && patientName.length === 0);
    };

    const handleMakeAppointment = () => {
        setDisabled(true);
        try {
            createPatient(apiBase, selectedSlot.tenant_id, patientName).then((patient) => {
                createAppointment(
                    apiBase,
                    `Appointment for ${selectedService?.name} to ${selectedSlot.doctor_name}`,
                    `${date}T${addMinutes(getCurrentTime(), selectedSlot.service_buffer_before)}:00+02:00`,
                    `${date}T${addMinutes(getCurrentTime(), (selectedSlot.service_duration + selectedSlot.service_buffer_after))}:00+02:00`,
                    selectedSlot.tenant_id,
                    selectedSlot.doctor_id,
                    patient.id,
                    selectedService?.id || '',
                    'a028fd98-915c-4ead-80fd-e931de8518f7',
                    '66c06e3d-cdec-4b6b-a854-3361772f997e'
                ).finally(() => setDisabled(true))
            });
            setMessage('Appointments created successfully!');
            setAvailableSlots([]);
            setPatientName('');
            setSelectedSlot('');
        } catch (error) {
            alert('Error creating appointment')
            setDisabled(false);
        }
    };

    // const createAppointment = () => {
    //     if (!selectedService || !selectedDoctor || !selectedSlot) return
    //     fetch(`${apiBase}/appointments`, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             doctorId: selectedDoctor.id,
    //             serviceId: selectedService.id,
    //             slot: selectedSlot
    //         })
    //     })
    //         .then(res => res.json())
    //         .then(() => alert('Appointment created!'))
    //         .catch(() => alert('Error creating appointment'))
    // }

    useEffect(() => {
        console.log('Selected Patient Name: ', patientName);
        console.log('Disabled: ', isDisabled);
        console.log('Current Time: ', now.getTime());
    }, [availableSlots, selectedSlot, patientName, isDisabled, message]);

    return (
        <div className="bg-white text-black p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Create Booking</h2>
            <div className="mb-4">
                <label className="block mb-1">Service</label>
                <select
                    value={selectedService?.id || ''}
                    onChange={(e) => {
                        const service = services.find(s => s.id === e.target.value)
                        setSelectedService(service || null)
                        console.log('Service : ', e.target.value)
                    }}
                    className="border p-2 rounded w-full"
                >
                    <option value="">Select a service</option>
                    {services.map(service => (
                        <option key={service.id} value={service.id}>{service.name}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-1">Select Date</label>
                <input
                    id="date"
                    className="border p-2 rounded w-full"
                    type="date"
                    min={today}
                    value={date}
                    onChange={handleChangeDate}
                    style={{
                        padding: '6px 10px',
                        borderRadius: 6,
                        border: '1px solid #ccc',
                    }}
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Select Time</label>
                <span>
                    <input
                        id="fromTime"
                        className="border p-2 mr-4 rounded"
                        type="time"
                        value={fromTime}
                        onChange={handleChangeFromTime}
                        style={{
                            padding: '6px 10px',
                            borderRadius: 6,
                            border: '1px solid #ccc',
                        }}
                    />
                    <input
                        id="toTime"
                        className="border p-2 rounded"
                        type="time"
                        value={toTime}
                        onChange={handleChangeToTime}
                        style={{
                            padding: '6px 10px',
                            borderRadius: 6,
                            border: '1px solid #ccc',
                        }}
                    />
                </span>
            </div>
            <button
                onClick={() => getAvailability(selectedService?.id || '', apiBase, date, fromTime, toTime).then(data => {
                    setAvailableSlots(data)
                    setMessage(data.length === 0 ? 'No available slots. Please check the others.' : '');
                })}
                disabled={!selectedService}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
                Check Availability
            </button>
            {availableSlots.length > 0 && (
                <div className="mt-4">
                    <div className="mb-4">
                        <h3 className="font-semibold">Available Slots:</h3>
                        <ul>
                            {availableSlots.map((slot: any) => (
                                <li key={slot}>
                                    <button
                                        onClick={() => { setSelectedSlot(slot); console.log('Selected slot: ', slot); }}
                                        className={`p-2 rounded ${selectedSlot === slot ? 'bg-green-200' : 'bg-gray-200'}`}
                                    >
                                        {slot.tenant_name} ({slot.doctor_name})
                                        <br />
                                        {slot.doctor_working_hours.toLocaleString()}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Please Input Your Name</label>
                        <input
                            id="patientName"
                            className="border p-2 mr-4 rounded"
                            type="text"
                            value={patientName}
                            onChange={handleChangePatientName}
                            style={{
                                padding: '6px 10px',
                                borderRadius: 6,
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <button
                        onClick={handleMakeAppointment}
                        // onClick={() => createAppointment(apiBase, `Appointment for ${selectedService} to ${selectedSlot.doctor_name}`, `${date}T${addMinutes(getCurrentTime(),selectedSlot.service_buffer_before)}:00+07:00`, `${date}T${addMinutes(getCurrentTime(),(selectedSlot.service_duration + selectedSlot.service_buffer_after))}:00+07:00`, selectedSlot.tenant_id, selectedSlot.doctor_id,)}
                        disabled={isDisabled}
                        className="bg-green-500 text-white px-4 py-2 rounded mt-2 disabled:opacity-50"
                    >
                        Confirm Appointment
                    </button>
                </div>
            )}
            {availableSlots.length === 0 && (
                <p className="mt-4">{message}</p>
            )}
        </div>
    )
}