'use client';

import React from 'react';

type ItemCardProps = {
    title: string;
    subtitle?: string;
    description?: string;
    rightText?: string;
    onClick?: () => void;
    onDelete?: () => void;
    selected?: boolean;
};

export function ItemCard({
    title,
    subtitle,
    description,
    rightText,
    onClick,
    onDelete,
    selected = false,
}: ItemCardProps) {
    return (
        <div className='flex items-center justify-between gap-4
        rounded-xl
        transition-all
        my-4'>
            <div
                onClick={onClick}
                className={`
        flex items-center justify-between gap-4
        rounded-xl border
        transition-all p-4
        ${onClick ? 'cursor-pointer hover:shadow-md hover:bg-gray-50' : ''}
        ${selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
      `}
            >
                {/* LEFT */}
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">
                        {title}
                    </span>

                    {subtitle && (
                        <span className="text-sm text-gray-500">
                            {subtitle}
                        </span>
                    )}

                    {description && (
                        <span className="mt-1 text-xs text-gray-400">
                            {description}
                        </span>
                    )}
                </div>
            </div>
            {/* RIGHT */}
            {rightText && (
                <button
                    className="cursor-pointer text-sm font-medium text-red-600"
                    onClick={onDelete}
                // onClick={() => createAppointment(apiBase, `Appointment for ${selectedService} to ${selectedSlot.doctor_name}`, `${date}T${addMinutes(getCurrentTime(),selectedSlot.service_buffer_before)}:00+07:00`, `${date}T${addMinutes(getCurrentTime(),(selectedSlot.service_duration + selectedSlot.service_buffer_after))}:00+07:00`, selectedSlot.tenant_id, selectedSlot.doctor_id,)}
                // disabled={isDisabled}
                // className="bg-green-500 text-white px-4 py-2 rounded mt-2 disabled:opacity-50"
                >
                    {rightText}
                </button>
            )}
        </div>

    );
}