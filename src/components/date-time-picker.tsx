"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"

export function DateTimePicker({ date, setDate }: { date: Date | undefined, setDate: (date: Date | undefined) => void }) {
    const formatTimeToHHMMSS = (dateObj: Date) => {
        if (!dateObj) return '00:00:00';

        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        const seconds = String(dateObj.getSeconds()).padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    };

    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const [open, setOpen] = React.useState(false);
    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-3">
                <Label htmlFor="date-picker" className="px-1">
                    Date
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date-picker"
                            className="w-32 justify-between font-normal"
                        >
                            {date ? format(date, 'd MMM H:mm') : "Select date"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={(ddate) => {
                                if (ddate) {
                                    console.log(typeof date)
                                    const newDate = date || new Date();
                                    newDate.setFullYear(ddate.getFullYear(), ddate.getMonth(), ddate.getDate());
                                    setDate(newDate);
                                } else {
                                    setDate(undefined)
                                }
                                setOpen(false)
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex flex-col gap-3">
                <Label htmlFor="time-picker" className="px-1">
                    Time
                </Label>
                <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    value={date ? format(date, 'HH:mm:ss') : '00:00:00'}
                    onChange={(e) => {
                        if (date === undefined) {
                            date = new Date()
                        }
                        const [hours, minutes, seconds] = e.target.value.split(':').map(Number);
                        const newDateObj = new Date(date.toString());
                        newDateObj.setHours(hours, minutes, seconds);
                        setDate(newDateObj);
                    }}
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
            </div>
        </div>
    )
}
