jQuery Pagination Plugin
========================

Description
-----------
When you have a a large list of items (e.g. search results or news articles), 
you can display them grouped in pages and present navigational elements to move 
from one page to another. This plugin creates these navigational elements. 


Usage
-----
Include jQuery, the pagination plugin script and the pagination.css file in your 
HTML page. In your HTML body create a container tag pair that will hold the link 
elements. Give it an id attribute (e.g. "News-Pagination"). This id will be the
selector for jQuery. It is important to select only one element because the
pagination links won't be synchronized!

Next, write a JavaScript function that has two parameters: page_index and
paging_container. This is the callback function where you react to clicks on the
pagination links. It should select a part from your content, depending on the
page id.

    function handlePaginationClick(new_page_index, pagination_container) {
        // This selects 20 elements from a content array
        for(var i=new_page_id;i<;i++) {
            $('#MyContentArea').append(content[i]);
        }
        return false;
    }

The code in this callback function requires knowledge of the jQuery DOM
manipulation functions. This is where you write your display routines.
    
After you have loaded the contents and know how many items you want to display 
overall, create the pagination like this:

	// First Parameter: number of items
	// Second Parameter: options object
	$("#News-Pagination").pagination(122, {
		items_per_page:20, 
		callback:handlePaginationClick
	});

This will create the navigation links inside the container. You will see the 
numbers 1-7, the first number is highlighted. When you click on another number, 
the highlighting changes and your callback function "handlePaginationClick" 
is called.

The plugin is highly configurable through the option parameter and all elements 
can be styled separately.


Available Options
-----------------
The following list describes what options you have for the option object:

callback
	A callback function that is called when a user clicks on a pagination link. The 
	function receives two parameters: the new page index and the pagination 
	container (a DOM element). If the callback returns false, the event 
	propagation is stopped. Default value: ``function(){return false;}``.
    This callback function is essential for the functionality of the pagination!
    It should contain code that updates your content.
    For a fast user experience you should NOT load content via AJAX in this 
    function. Instead, pre-load some content pages and switch betweem them with
    this function.
current_page
	The page that is selected when the pagination is initialized. Default: 0
items_per_page
	The number of items per page. The maximum number of pages is calculated by 
	dividing the number of items by items_per_page (rounded up, minimum 1). 
	Default: 10
link_to
	Link target of the pagination links. Normally the page selection is 
	triggered through an onclick event. If the link contains the string 
	``__id__``, it will be replaced with the page number. Default: ``#``
num_display_entries
	Maximum number of pagination links that are visible. Set to 0 to display a
	 simple "Previous/Next"-Navigation. Default: 10
next_text
	Text for the "Next"-link that increases the current page number by 1. 
	Leave blank to hide the link. Default: ``Next``
next_show_always
	If this is set to false, the "Next"-link is only shown when the page number 
	can be increased. Default: true
prev_text
	Text for the "Previous"-link that decreases the current page number by 1. 
	Leave blank to hide the link. Default: ``Previous``
prev_show_always
	If this is set to false, the "Previous"-link is only shown when the page 
	number can be decreased. Default: true
num_edge_entries
	If this number is set to 1, links to the first and the last page are always 
	shown, independent of the current position and the visibility constraints 
	set by num_display_entries. You can set it to bigger numbers to show more 
	links. Default: 0
ellipse_text
	When there is a gap between the numbers created by num_edge_entries and the 
	displayed number interval, this text will be inserted into the gap (inside a
	span tag). Can be left blank to avoid the additional tag. Default: ``...``


Version history
---------------
1.0 - inital release
1.1 - Fixed a bug when the click on a pagination item was propagated to the browser.
1.2 - Fixed bug with jQuery.noConflict(). Wrote better demo files. Tested with
      jQuery 1.3.1
    
TODO
----
   * Optionally synchronize several pagination containers when a paginations 
     link is clicked.
   * Optional links for jumping a fixed number of pages.

License and Contact Information
-------------------------------
This plugin is licensed under the GPL v2. You can find the full license text 
here: http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt

You can reach me at:

| describe europe Ltd.
| Gabriel Birke
| Eckerstr. 6
| 30161 Hannover
| birke (at) d-scribe (dot) de
| http://www.d-scribe.de/
