A dirty job to deduplicate Informit.org search results.

Informit is an academic search engine that aggregates results from a number of databases. It is not uncommon for a single article to be available through a number of databases, or be indexed multiple times in the same one.
This script deduplicates the search results for the convenience of the researcher.

# How to use
Requires Google Chrome

1. Go to chrome://extensions and select "Load unpacked"
2. Start searching on Informit. Duplicate results will be automatically hidden. The number of cached article titles will appear as a badge on the extension icon.
3. Click the extension icon to reset the article cache. 

# Caveats
I am currently only matching on titles. It is possible but unlikely that users may encounter false positives or false negatives.

False negatives may occur on otherwise-identical titles with formatting differences.

False positives may occur if two completely different articles share the same name. This is unlikely for most complex academic articles but might occur with something like "High Court case review" in a periodical.

This extension does not track the original instance of an article. If you navigate away from a page and return to it, all articles on it will be hidden because they will appear as "duplicates".

# Development notes
Result titles are in a `<h5>` without a class.

The login UI also uses a `<h5>` element but I haven't encountered issues with it.

Future iterations on this extension could:

 * Target results more precisely
 * Perform more robust checks
   * stripping non-alphabetic characters from titles to avoid false negatives
   * comparing more fields, such as author/DOI, to minimize false positives
   * track the first instance of a given article? 
   * Display how many articles were hidden 

# License
This extension is released under the Apache-2.0 license.
jQuery is bundled with this extension for dev convenience (but not actively used). jQuery is available under the MIT license: jquery.org/license
