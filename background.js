console.log('[dedupe] background page loaded')
let ticker = 0
// start none
chrome.action.setBadgeText({text: "load"})

// Clear storage on click
chrome.action.onClicked.addListener(async() => {
	console.log(`[dedupe] [info] Browser action initiated. Emptying storage.`)
	await chrome.storage.local.remove('dupelist')
})
chrome.storage.onChanged.addListener(async () => {
	try {
		let dupes = await chrome.storage.local.get('dupelist') 
		if (typeof(dupes.dupelist) !== "undefined" ) {
			console.info(`${Date.now()} [dedupe] [info] Storage updated. Now has ${dupes.dupelist.length} item/s; ticker ${ticker}`)
			chrome.action.setBadgeText({text: dupes.dupelist.length.toString() })
		} else {
			console.log('[dedupe] Dupelist appears empty. Resetting badge to 0.')
			chrome.action.setBadgeText({text: "0"})
		}
		ticker++
	} catch (e) {
		console.error(`[dedupe] [error] Error handling storage update event. dupes.length is ${dupes}; Error is ${e}`)
	}
})
