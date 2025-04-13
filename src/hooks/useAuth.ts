import { useEffect, useState } from "react";

export function useAuth() {
  const [userId, setUserId] = useState<string | null>(null);

	const initializeUserId = () => {
		const newUserId = Math.random().toString(36).substring(2, 15);
		localStorage.setItem("userId", newUserId);
		setUserId(newUserId);
	}

	const loadUserIdFromLocalStorage = () => {
		const storedUserId = localStorage.getItem("userId");
		if (storedUserId) {
			setUserId(storedUserId);
		}
		else {
			initializeUserId();
		}
	}

	useEffect(() => {
		loadUserIdFromLocalStorage();
	}, []);

	return {
		userId
	}
}