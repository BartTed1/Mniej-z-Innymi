import { Ticket } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useOffers } from "@/hooks/useOffers";
import OfferTab from "./OfferTab";
import { ScrollArea } from "../ui/scroll-area";

const OffersCard = () => {
	const { offers } = useOffers();

	return (
		<Card className="w-auto max-w-[410px] mniej-z-innymi-card">
			<CardHeader className="text-left">
				<CardTitle className="text-lg font-semibold flex gap-2 items-center">
					<Ticket /> Twoje zgłoszenia
				</CardTitle>
				<CardDescription>
					Zgłoszenia które dodałeś z tego urządzenia.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ScrollArea className="w-full max-h-[400px] h-[24px]">
					{
						offers.length > 0 ? (
							offers.map((offer) => (
								<OfferTab key={offer.id} offer={offer} offerCreatorKey={""} />
							))
						) : (
							<p className="text-center text-slate-500">Brak zgłoszeń</p>
						)
					}
				</ScrollArea>
			</CardContent>
		</Card>
	)
}

export default OffersCard;