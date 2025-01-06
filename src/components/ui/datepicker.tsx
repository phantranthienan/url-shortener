'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

type DatePickerProps = {
    date?: Date;
    onChange?: (date: Date | undefined) => void;
    placeholder?: string;
    buttonClassName?: string;
};

export const DatePicker: React.FC<DatePickerProps> = ({
    date,
    onChange,
    placeholder = 'Expiration date',
    buttonClassName,
}) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-full justify-between text-left font-normal',
                        !date && 'text-muted-foreground',
                        buttonClassName,
                    )}
                >
                    {date ? format(date, 'PPP') : <span>{placeholder}</span>}
                    <CalendarIcon size={16} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={onChange}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};
