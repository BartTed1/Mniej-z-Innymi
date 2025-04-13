import { Offer } from "@/types/Offer";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export function useOffers() {
	const { userId } = useAuth();
	
	const [offerIds, setOfferIds] = useState<string[]>([]);
	const [offers, setOffers] = useState<Offer[]>([]);

	const loadOfferIdsFromLocalStorage = () => {
		const storedOfferIds = localStorage.getItem("offerIds");
		if (storedOfferIds) {
			setOfferIds(JSON.parse(storedOfferIds));
		}
	}

	const loadOffers = async () => {
		// TODO: Implement the logic to load offers from the server
	}

	const createOffer = (offer: Offer) => {
		// TODO: Implement the logic to create an offer
	}

	useEffect(() => {
		loadOfferIdsFromLocalStorage();
	}, []);

	useEffect(() => {
		loadOffers();
	}, [offerIds]);

	return {
		offerIds,
		setOfferIds,
		offers,
	};
}