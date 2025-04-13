import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import SearchableSelect from "./SearchableSelect";
import DateTimePicker from "./DateTimePicker";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader, Send, TrainFront } from "lucide-react";

const StationForm = () => {
  const [stations, setStations] = useState<string[]>([]);
  const [startStation, setStartStation] = useState("");
  const [endStation, setEndStation] = useState("");
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [contactMethod, setContactMethod] = useState("");
  const [before, setBefore] = useState("01:00");
  const [after, setAfter] = useState("01:00");

  useEffect(() => {
    fetch("/nazwy_stacji.json")
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
    };
    console.log("Form Data:", formData);
  };

  if (!stations.length) {
    return (
      <Card className="w-auto max-w-[410px] mniej-z-innymi-card">
        <CardHeader className="text-left">
          <CardTitle className="text-lg font-semibold flex gap-2 items-center">
            <TrainFront size={20} /> Mniej z innymi
          </CardTitle>
          <CardDescription className="flex gap-2 items-center">
            <Loader className="animate-spin" size={20} />
            Ładowanie stacji...
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-auto max-w-[410px] mniej-z-innymi-card">
      <CardHeader className="text-left">
        <CardTitle className="text-lg font-semibold flex gap-2 items-center">
        <TrainFront size={20} /> Mniej z innymi
        </CardTitle>
        <CardDescription>
          Znajdź inne osoby korzystające z oferty "Taniej z bliskimi" PKP.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
          <div className="flex flex-col gap-1">
            <Label htmlFor="startStation" className="text-xs text-zinc-500">Stacja początkowa</Label>
            <SearchableSelect stations={stations} startStation={startStation}
              setStartStation={setStartStation} placeholder={"Wybierz stację początkową"}
              error={startStation.length > 0 && startStation === endStation} />
            {startStation.length > 0 && startStation === endStation && (
              <p className="text-red-500 text-xs mt-1">
                Stacja początkowa i końcowa nie mogą być takie same
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="startStation" className="text-xs text-zinc-500">Stacja końcowa</Label>
            <SearchableSelect stations={stations} startStation={endStation}
              setStartStation={setEndStation} placeholder={"Wybierz stację końcową"}
              error={endStation.length > 0 && startStation === endStation} />
            {endStation.length > 0 && startStation === endStation && (
              <p className="text-red-500 text-xs mt-1">
                Stacja początkowa i końcowa nie mogą być takie same
              </p>
            )}
          </div>
            <div className="flex flex-col gap-1">
            <DateTimePicker
              date={departureDate}
              setDate={setDepartureDate}
              error={departureDate ? new Date(departureDate) < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) : false}
            />
            {departureDate && new Date(departureDate) < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) && (
              <p className="text-red-500 text-xs mt-1">
              Data wyjazdu musi być co najmniej 3 dni od dzisiaj
              </p>
            )}
            </div>
          <div className="flex flex-col gap-2 mt-2 items-center max-w-[360px]">
            <p className="text-sm text-left w-full">Mogę wyruszyć:</p>
            <div className="flex gap-2 items-center w-full">
              <div className="flex flex-col gap-1 w-full">
                <Label className="text-xs text-zinc-500" htmlFor="before">Wcześniej o:</Label>
                <Input className="w-full" id="before" type="time" value={before} onChange={(e) => setBefore(e.target.value)} />
              </div>
              <p>-</p>
              <div className="flex flex-col gap-1 w-full">
                <Label className="text-xs text-zinc-500" htmlFor="after">Później o:</Label>
                <Input className="w-full" id="after" type="time" value={after} onChange={(e) => setAfter(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 max-w-[360px]">
            <Label htmlFor="contactMethod" className="text-xs text-zinc-500">Preferowany sposób kontaktu</Label>
            <Input type="text" id="contactMethod" value={contactMethod} onChange={(e) => setContactMethod(e.target.value)} placeholder="E-mail, Telefon, Platforma: adres" />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full relative" disabled={
          !startStation || !endStation || !departureDate || !contactMethod
        } onClick={handleSubmit}>
          Zgłoś się <Send className="absolute top-auto right-3 mt-0.5" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StationForm;
