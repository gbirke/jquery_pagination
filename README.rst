jQuery Pagination Plugin
========================

Description
-----------
When you have a a large list of items (e.g. search results or news articles), 
you can display them grouped in pages and present navigational elements to move 
from one page to another. This plugin creates these navigational elements. 

Usage
-----
Include jQuery, the pagination plugin script and the pagination.css file in
your HTML page. In your HTML body create a container tag pair that will hold
the link elements. Give it an id or class attribute (e.g. "News-Pagination").
This attribute can used as the selector for jQuery.

Next, write a JavaScript function that has two parameters: page_index and
paging_container. This is the callback function where you react to clicks on the
pagination links. It should select a slice from your content, depending on the
page id.::

    function handlePaginationClick(new_page_index, pagination_container) {
        // This selects 20 elements from a content array
        for(var i=new_page_id;i<;i++) {
            $('#MyContentArea').append(content[i]);
        }
        return false;
    }

The code in this callback function requires knowledge of the jQuery DOM
manipulation functions. This is where you write your display routines.
    
In the initialisation function of your page, when you know how many items you
want to display overall, create the pagination element like this:::

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
	**Please note:** This value is only for calculating the number of pages. 
	The actual selection of the items correlating to thhe current page and
	number of items must be done by your code in your callback function!
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
	can be increased. Default: `true`
	
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
Version 1.0 
+++++++++++
Inital release   

Version 1.1 
+++++++++++
Fixed a bug when the click on a pagination item was propagated to the browser.   

Version 1.2 
+++++++++++
Fixed bug with jQuery.noConflict(). Wrote better demo files. Tested with 
jQuery 1.3.1

Version 2.0rc1
+++++++++++
  - Complete, more object-oriented rewrite
  - Now requires jQuery 1.4. Tested with jQuery 1.4.2
  - Support for several synchronized pagination containers
  
Future Plans
------------
   * Optional links for jumping a fixed number of pages.
   * Trigger events when a page is selected.
   * More renderers for rendering the Pagination elements differently.
   * Documentation and examples how you implement your own renderers.
   * Write unit tests and use QUnit instead of JSUnit.

I'll implement these features as I see fit and when my time allows it. If 
you'd like to see any of those features *now*, feel free to contact me and we 
can discuss a reasonable fee.

I'd be glad if you could send me a notice where you use jQuery Pagination. 
Knowing common use cases will help me to improve the plugin in the future.

License and Contact Information
-------------------------------
This plugin is licensed under the GPL v2. You can find the full license text 
here: http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt
If you need another license, ask me.

Source code: http://github.com/gbirke/jquery_pagination

You can reach me at:

| describe europe Ltd.
| Gabriel Birke
| Eckerstr. 6
| 30161 Hannover
| birke (at) d-scribe (dot) de
| http://www.d-scribe.de/
