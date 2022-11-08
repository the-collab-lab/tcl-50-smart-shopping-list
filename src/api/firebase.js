import {
	addDoc,
	doc,
	updateDoc,
	collection,
	onSnapshot,
	query,
	orderBy,
	where,
} from 'firebase/firestore';
import { db } from './config';
import { getFutureDate, getDaysBetweenDates } from '../utils';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

/**
 * Subscribe to changes on a specific list in the Firestore database (listId), and run a callback (handleSuccess) every time a change happens.
 * @param {string} listId The user's list token
 * @param {Function} handleSuccess The callback function to call when we get a successful update from the database.
 * @returns {Function}
 *
 * @see: https://firebase.google.com/docs/firestore/query-data/listen
 */
export function streamListItems(listId, handleSuccess) {
	const listCollectionRef = comparePurchaseUrgency(collection(db, listId));
	return onSnapshot(listCollectionRef, handleSuccess);
}

/**
 * Read the information from the provided snapshot and return an array
 * that can be stored in our React state.
 * @param {Object} snapshot A special Firebase document with information about the current state of the database.
 * @returns {Object[]} An array of objects representing the user's list.
 */
export function getItemData(snapshot) {
	return snapshot.docs.map((docRef) => {
		/**
		 * We must call a special `.data()` method to get the data
		 * out of the referenced document
		 */
		const data = docRef.data();

		/**
		 * The document's ID is not part of the data, but it's very useful
		 * so we get it from the document reference.
		 */
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
	// TODO: Replace this call to console.log with the appropriate
	// Firebase function, so this information is sent to your database!
	return await addDoc(listCollectionRef, {
		dateCreated: new Date(),
		// NOTE: This is null because the item has just been created.
		// We'll put a Date here when the item is purchased!
		dateLastPurchased: null,
		dateNextPurchased: getFutureDate(daysUntilNextPurchase),
		// This property will be used when we build out more of our UI.

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

	/**

	 * TODO: Fill this out so that it uses the correct Firestore function
	 * to update an existing item! You'll need to figure out what arguments
	 * this function must accept!
**/
}

//setting up sort criteria for items
// export function comparePurchaseUrgency(listref) {
// 	// for multiple criteria, use => const q = query(citiesRef, orderBy("state"), orderBy("population", "desc"));
// 	const q = query(listref, where('dateNextPurchased', '>=', '7'), orderBy('name'));

// 	return [...soon, ...kindofsoon, ...notsoon, ];
// }

// export function comparePurchaseUrgency(listref) {
// 	const soon = query(listref, where('dateNextPurchased', '>=', '7'), orderBy('dateNextPurchased'));
// 	const kindOfSoon = query(listref, where('dateNextPurchased', '>=', '14'), orderBy('dateNextPurchased'));
// 	const notSoSoon = query(listref, where('dateNextPurchased', '>=', '30'), orderBy('dateNextPurchased'));

// 	return [...soon, ...kindOfSoon, ...notSoSoon ];
// }

export function comparePurchaseUrgency(listref) {
	const q = query(listref, orderBy('dateNextPurchased'));

	return q;
}

// export async function updateItem(db, listId, itemData, ) {
// 	const docRef = doc(db, itemData, listId);
// 	await updateDoc(docRef, itemData)
// 	{/**
// 	   const newCityRef = doc(collection(db, "cities"));
// 	 * @param database → db
// 	 * @param collection name → cities
// 	 * @param document ID
// 	 * TODO: Fill this out so that it uses the correct Firestore function
// 	 * to update an existing item! You'll need to figure out what arguments
// 	 * this function must accept!
// **/}
// }

export async function deleteItem() {
	/**
	 * TODO: Fill this out so that it uses the correct Firestore function
	 * to delete an existing item! You'll need to figure out what arguments
	 * this function must accept!
	 */
}
