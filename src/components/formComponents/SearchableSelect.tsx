import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { useState } from "react"
import { cn } from "@/lib/utils"

const SearchableSelect = ({
	stations,
	startStation,
	setStartStation,
	placeholder = "Wybierz",
	error = false,
	errorText = "Pole jest wypełnione nieprawidłow"
}: {
	stations: string[]
	startStation: string
	setStartStation: (station: string) => void,
	placeholder?: string,
	error?: boolean,
	errorText?: string
}) => {
	const [open, setOpen] = useState(false);
	const [startStationSearch, setStartStationSearch] = useState("")

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={cn(
						"justify-between max-w-[360px] w-full",
						error && "border-red-500 text-red-500 hover:border-red-500"
					)}
				>
					{startStation
						? stations.find((station) => station === startStation) && startStation
						: placeholder}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0">
				<Command>
					<CommandInput placeholder="Zacznij wyszukiwać" className="h-9" value={startStationSearch} onValueChange={setStartStationSearch} />
					<CommandList>
						{startStationSearch.length <= 2 && (
							<CommandEmpty>
								Proszę wpisać przynajmniej 2 znaki, aby wyszukać.
							</CommandEmpty>
						)}
						{startStationSearch.length > 2 && (
							<>
								<CommandEmpty>Nie znaleziono dopasowania.</CommandEmpty>
								<CommandGroup>
									{stations.map((station, id) => (
										<CommandItem
											key={id}
											value={station}
											onSelect={(currentValue) => {
												setStartStation(currentValue === startStation ? "" : currentValue)
												setOpen(false)
											}}
										>
											{station}
											<Check
												className={cn(
													"ml-auto",
													startStation === station ? "opacity-100" : "opacity-0"
												)}
											/>
										</CommandItem>
									))}
								</CommandGroup>
							</>
						)}

					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

export default SearchableSelect;