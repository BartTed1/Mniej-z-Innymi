import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronsUpDown } from "lucide-react"
import { pl } from "date-fns/locale"

interface DateTimePickerProps {
  date: Date | null
  setDate: (date: Date | null) => void
  label?: string
}

const DateTimePicker = ({
  date,
  setDate,
  label = "Wybierz datę",
}: DateTimePickerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-1 max-w-[360px]">
      <Label htmlFor="date" className="text-xs text-zinc-500">{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full">
            {date
              ? `${date.toLocaleDateString()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
              : "Wybierz datę i godzinę"}
            <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-[250px] p-0">
          <div className="max-w-[250px]">
            <Calendar 
              locale={pl} 
              mode="single" 
              selected={date || undefined}
              onSelect={(day) => setDate(day || null)} 
            />
            <div className="flex items-center justify-between mt-4 p-2 pt-0 gap-1">
              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="hours" className="text-xs text-zinc-500">Godzina</Label>
                <Select
                  value={date ? date.getHours().toString() : ""}
                  onValueChange={(value) => {
                    const newDate = new Date(date || new Date());
                    newDate.setHours(parseInt(value));
                    setDate(newDate);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="00" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {i.toString().padStart(2, '0')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="minutes" className="text-xs text-zinc-500">Minuta</Label>
                <Select
                  value={date ? date.getMinutes().toString() : ""}
                  onValueChange={(value) => {
                    const newDate = new Date(date || new Date());
                    newDate.setMinutes(parseInt(value));
                    setDate(newDate);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="00" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 60 }, (_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {i.toString().padStart(2, '0')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateTimePicker;
