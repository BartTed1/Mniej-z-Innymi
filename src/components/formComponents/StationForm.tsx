import React, { useState } from "react";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import SearchableSelect from "./SearchableSelect";
import DateTimePicker from "./DateTimePicker";

const StationForm = () => {
  const [stations, setStations] = useState<string[]>([]);
  const [startStation, setStartStation] = useState("");
  const [endStation, setEndStation] = useState("");
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [contactMethod, setContactMethod] = useState("");
  const [isFlexible, setIsFlexible] = useState(false);
  const [startStationSearch, setStartStationSearch] = useState("");

  React.useEffect(() => {
    // Load station names from the JSON file
    fetch("/src/assets/nazwy_stacji.json")
      .then((response) => response.json())
      .then((data: string) => setStations([...new Set(data)]));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      startStation,
      endStation,
      departureDate,
      contactMethod,
      isFlexible,
    };
    console.log("Form Data:", formData);
  };

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
        <div className="flex flex-col gap-1">
          <Label htmlFor="startStation" className="text-xs text-zinc-500">Stacja początkowa</Label>
          <SearchableSelect stations={stations} startStation={startStation}
            setStartStation={setStartStation} placeholder={"Wybierz stację początkową"} />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="startStation" className="text-xs text-zinc-500">Stacja końcowa</Label>
          <SearchableSelect stations={stations} startStation={endStation}
            setStartStation={setEndStation} placeholder={"Wybierz stację końcową"} />
        </div>
        <DateTimePicker 
          date={departureDate}
          setDate={setDepartureDate}
          label="Data wyjazdu"
        />
      </form>
    </Card>
  );
};

export default StationForm;
