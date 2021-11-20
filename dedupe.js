/****************************************************************************
   Copyright 2021 Nikita Sosnik

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
****************************************************************************/

console.info("[dedupe] Extension loaded...")
console.info(`[dedupe] jQuery is ${typeof(window.jQuery)} and tts is ${typeof(window.speechSynthesis)}`)

// constants
const RESULT_TITLE_ELEMENT=document.getElementsByTagName('h5')

async function init() {
  // On every page, retrieve a dupelist from storage if it exists
  let stored = await chrome.storage.local.get('dupelist')
  let dupelist = []
  if (typeof(stored.dupelist) !== "undefined") {
    dupelist = stored.dupelist
    console.log(`[dedupe] [info] Retrieved stored dupelist. It has ${dupelist.length} items.`)
  } 

  // Iterate over every article on the page and check it against the dupelist. 
  for (result of RESULT_TITLE_ELEMENT) {
    let title = result.innerText.toLowerCase()
    if (title == "") {} // avoids a nasty error if innerText is empty (if selection picks up wrong item)
    else if (dupelist.includes(title)) {
      console.log(`Found duplicate: ${title}`)
      result.closest(".titled_issues").style = "display: none; background-color: black; color: white; font-style: strikethrough"
    } else {
      dupelist.push(title)
    }
  }
  // When done, push the new dupelist to storage
  try { 
    console.log(`${Date.now()} | Dupelist length: ${dupelist.length}; last item: ${dupelist.at(-1)}`)
    chrome.storage.local.set({dupelist: dupelist})
  } catch {
    console.error('[debug] [error] something broke saving dupelist to storage')
  }
}
init()
