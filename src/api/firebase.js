import {
	addDoc,
	doc,
	updateDoc,
	collection,
	onSnapshot,
	deleteDoc,
} from 'firebase/firestore';
import { db } from './config';
import { getFutureDate, getDaysBetweenDates } from '../utils';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

export function streamListItems(listId, handleSuccess) {
	const listCollectionRef = collection(db, listId);
	return onSnapshot(listCollectionRef, handleSuccess);
}

export function getItemData(snapshot) {
	return snapshot.docs.map((docRef) => {
		const data = docRef.data();

		data.id = docRef.id;

		return data;
	});
}

/**
 * Add a new item to the user's list in Firestore.
 * @param {string} listId The id of the list we're adding to.
 * @param {Object} itemData Information about the new item.
 * @param {string} itemData.itemName The name of the item.
 * @param {number} itemData.daysUntilNextPurchase The number of days until the user thinks they'll need to buy the item again.
 */
export async function addItem(listId, { itemName, daysUntilNextPurchase }) {
	const listCollectionRef = collection(db, listId);

	return await addDoc(listCollectionRef, {
		dateCreated: new Date(),

		dateLastPurchased: null,
		dateNextPurchased: getFutureDate(daysUntilNextPurchase),

		isChecked: false,
		name: itemName,
		totalPurchases: 0,
		previousEstimate: null,
		currentEstimate: parseInt(daysUntilNextPurchase),
	});
}

export async function updateItem(listId, itemData) {
	const docRef = doc(db, listId, itemData.id);
	// this variable gets the days since last transaction
	let daysSinceLastTransaction = itemData.totalPurchases
		? itemData.dateLastPurchased
			? getDaysBetweenDates(itemData?.dateLastPurchased)
			: getDaysBetweenDates(itemData?.dateCreated)
		: null;

	// calculateEstimate is stored in a variable
	let newEstimate = calculateEstimate(
		itemData.previousEstimate,
		daysSinceLastTransaction,
		itemData.totalPurchases,
	);

	await updateDoc(docRef, {
		isChecked: itemData.isChecked,
		...(itemData.totalPurchases && { dateLastPurchased: new Date() }),
		...(itemData.totalPurchases && { totalPurchases: itemData.totalPurchases }),
		...(itemData.totalPurchases && {
			previousEstimate: itemData.currentEstimate,
		}),
		...(itemData.totalPurchases && { currentEstimate: newEstimate }),
		...(itemData.totalPurchases && {
			dateNextPurchased: getFutureDate(newEstimate),
		}),
	});
}

export async function deleteItem(listId, id) {
	const docRef = doc(db, listId, id);
	return await deleteDoc(docRef);
}
