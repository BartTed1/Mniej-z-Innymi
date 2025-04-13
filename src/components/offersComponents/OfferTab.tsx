import { ArrowRight, ArrowRightFromLine, ArrowRightToLine, CalendarClock } from "lucide-react";
import { Separator } from "../ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Offer } from "@/types/Offer";

interface OfferTabProps {
	offer: Offer;
	offerCreatorKey: string;
}

const OfferTab = ({
	offer,
	offerCreatorKey
}: OfferTabProps) => {

	const stringifyDate = (date: string) => {
		const dateObj = new Date(date);
		const options: Intl.DateTimeFormatOptions = {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		};
		return dateObj.toLocaleDateString('pl-PL', options);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="w-full border border-slate-200 rounded-md p-2 hover:shadow-md hover:cursor-pointer transition-all duration-200">
					<div className="w-full flex gap-2 items-center">
						<CalendarClock size={18} />
						<p className="font-medium w-full gap-2 grid grid-cols-[1fr_auto] items-center">
							<span>{stringifyDate(offer.departureDate)}</span>
							<span className="text-xs text-slate-500">
								-{offer.before} +{offer.after}
							</span>
						</p>
					</div>
					<Separator className="my-1" />
					<div className="w-full flex gap-2 items-center">
						<ArrowRightFromLine size={18} />
						<p className="font-medium">
							{offer.startStation}
						</p>
					</div>
					<div className="w-full flex gap-2 items-center">
						<ArrowRightToLine size={18} />
						<p className="font-medium">
							{offer.endStation}
						</p>
					</div>
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex gap-2 items-center">
						{offer.startStation}
						<ArrowRight size={18} />
						{offer.endStation}
					</DialogTitle>
					<DialogDescription>
						<div className="w-full grid grid-cols-[18px_1fr] gap-2 items-center">
							<CalendarClock size={18} />
							<p className="font-medium w-full gap-2 grid grid-cols-[1fr_auto] items-center">
								<span className="text-left">{stringifyDate(offer.departureDate)}</span>
								<span className="text-xs text-slate-500">
									-{offer.before} +{offer.after}
								</span>
							</p>
						</div>
					</DialogDescription>
				</DialogHeader>
				<ScrollArea className="w-full max-h-[400px] h-[50px]">

				</ScrollArea>
				<DialogFooter>
					<Button variant="destructive">
						Usuń zgłoszenie
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default OfferTab;