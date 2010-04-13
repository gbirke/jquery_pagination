/**
 * This jQuery plugin displays pagination links inside the selected elements.
 *
 * @author Gabriel Birke (birke *at* d-scribe *dot* de)
 * @version 1.5
 * @param {int} maxentries Number of entries to paginate
 * @param {Object} opts Several options (see README for documentation)
 * @return {Object} jQuery Object
 */
 
 (function($){
	
	/**
	 * @class Anonymous class for calculating pagination values
	 */
	var PaginationCalculator = function(maxentries, opts) {
		this.maxentries = maxentries;
		this.opts = opts;
	}
	$.extend(PaginationCalculator.prototype, {
		/**
		 * Calculate the maximum number of pages
		 * @method
		 * @returns {Number}
		 */
		numPages:function() {
			return Math.ceil(this.maxentries/this.opts.items_per_page);
		},
		/**
		 * Calculate start and end point of pagination links depending on 
		 * current_page and num_display_entries.
		 * @returns {Array}
		 */
		getInterval:function(current_page)  {
			var ne_half = Math.ceil(this.opts.num_display_entries/2);
			var np = this.numPages();
			var upper_limit = np - this.opts.num_display_entries;
			var start = current_page > ne_half ? Math.max(Math.min(current_page-ne_half, upper_limit), 0):0;
			var end = current_page > ne_half?Math.min(current_page+ne_half, np):Math.min(this.opts.num_display_entries, np);
			return {start:start, end:end};
		}
	});
	
	var PaginationRenderer = function(maxentries, opts) {
		this.maxentries = maxentries;
		this.opts = opts;
		this.pc = new PaginationCalculator(maxentries, opts);
	}
	$.extend(PaginationRenderer.prototype, {
		// Helper function for generating a single link (or a span tag if it's the current page)
		appendItem:function(container, page_id, appendopts){
			var np = this.pc.numPages(),
				current_page = container.data('current_page');
			page_id = page_id<0?0:(page_id<np?page_id:np-1); // Normalize page id to sane value
			appendopts = $.extend({text:page_id+1, classes:""}, appendopts||{});
			if(page_id == current_page){
				var lnk = $("<span class='current'>"+(appendopts.text)+"</span>");
			}
			else
			{
				var lnk = $("<a>"+(appendopts.text)+"</a>")
					.attr('href', this.opts.link_to.replace(/__id__/,page_id));
			}
			if(appendopts.classes){ lnk.addClass(appendopts.classes); }
			lnk.data('page_id', page_id);
			container.append(lnk);
		},
		appendRange:function(container, start, end) {
			var i;
			for(i=start; i<end; i++) {
				this.appendItem(container, i);
			}
		},
		drawLinks:function(container, current_page, eventHandler) {
			container.empty();
			var begin, end, i,
			 	interval = this.pc.getInterval(current_page),
				np = this.pc.numPages();
			
			// Generate "Previous"-Link
			if(this.opts.prev_text && (current_page > 0 || this.opts.prev_show_always)){
				this.appendItem(container, current_page-1,{text:this.opts.prev_text, classes:"prev"});
			}
			// Generate starting points
			if (interval.start > 0 && this.opts.num_edge_entries > 0)
			{
				end = Math.min(this.opts.num_edge_entries, interval.start);
				this.appendRange(container, 0, end);
				if(this.opts.num_edge_entries < interval.start && this.opts.ellipse_text)
				{
					jQuery("<span>"+this.opts.ellipse_text+"</span>").appendTo(container);
				}
			}
			// Generate interval links
			this.appendRange(container, interval.start, interval.end);
			// Generate ending points
			if (interval.end < np && this.opts.num_edge_entries > 0)
			{
				if(np-this.opts.num_edge_entries > interval.end && this.opts.ellipse_text)
				{
					jQuery("<span>"+this.opts.ellipse_text+"</span>").appendTo(container);
				}
				begin = Math.max(np-this.opts.num_edge_entries, interval.end);
				this.appendRange(container, begin, np);
				
			}
			// Generate "Next"-Link
			if(this.opts.next_text && (current_page < np-1 || this.opts.next_show_always)){
				this.appendItem(container, current_page+1,{text:this.opts.next_text, classes:"next"});
			}
			$('a', container).click(eventHandler);
		}
	});
	
	// Extend jQuery
	$.fn.pagination = function(maxentries, opts){
		
    // Initialize options with default values
	opts = jQuery.extend({
		items_per_page:10,
		num_display_entries:10,
		current_page:0,
		num_edge_entries:0,
		link_to:"#",
		prev_text:"Prev",
		next_text:"Next",
		ellipse_text:"...",
		prev_show_always:true,
		next_show_always:true,
		callback:function(){return false;}
	},opts||{});
	
	return this.each(function() {
		
		var renderer, current_page
		container = $(this);
		
		/**
		 * This is the event handling function for the pagination links. 
		 * @param {int} page_id The new page number
		 */
		function pageSelected(evt){
			var current_page = $(evt.target).data('page_id');
			container.data('current_page', current_page);
			renderer.drawLinks(container, current_page, pageSelected);
			var continuePropagation = opts.callback(current_page, container);
			if (!continuePropagation) {
				if (evt.stopPropagation) {
					evt.stopPropagation();
				}
				else {
					evt.cancelBubble = true;
				}
			}
			return continuePropagation;
		}
		
		current_page = opts.current_page;
		container.data('current_page', current_page);
		// Create a sane value for maxentries and items_per_page
		maxentries = (!maxentries || maxentries < 0)?1:maxentries;
		opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0)?1:opts.items_per_page;
		
		renderer = new PaginationRenderer(maxentries, opts);
		
		// Attach control functions to the DOM element 
		this.selectPage = function(page_id){ pageSelected(page_id);}
		this.prevPage = function(){
			var current_page = container.data('current_page');
			if (current_page > 0) {
				pageSelected(current_page - 1);
				return true;
			}
			else {
				return false;
			}
		}
		this.nextPage = function(){
			var current_page = container.data('current_page');
			if(current_page < numPages()-1) {
				pageSelected(current_page+1);
				return true;
			}
			else {
				return false;
			}
		}
		// When all initialisation is done, draw the links
		renderer.drawLinks(container, current_page, pageSelected);
        // call callback function
        opts.callback(current_page, this);
	});
}

})(jQuery);

