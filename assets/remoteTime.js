(function($) {
    $.fn.remoteTime = function(rtParams){
		
		/**
		 * The main function that is instantiated on each element in the group
		 * @param {HTML element} element - Element to print the time in
		 * @param {Object} params - object containing parameters
		 * @returns {remoteTime}
		 */
		function remoteTime(element, params){
			// From input parameters
			var key = params.hasOwnProperty("key") ? params.key : "";
			var location = params.hasOwnProperty("location") ? params.location : "Tampa, Florida";
			var format = params.hasOwnProperty("format") ? params.format : "m/d/y g:i a";
			
			// Properties
			this.element = element;
			this.location = location;
			this.key = key;
			this.format = format;
			
			this.lat = false;
			this.lng = false;
			
			this.dstOffset = 0;
			this.rawOffset = 0;
			this.lastOffsetCheck = 0;
			
			this.interval = false;
			
			var _this = this;
			geocode(_this).then(function(){
				getOffsets(_this).then(function(){
					startClock(_this);
				});
			});
		}
		
		/**
		 * This is basically where all the magic happens
		 * @param {remoteTime} _this - A remoteTime instance
		 * @returns {undefined}
		 */
		function startClock(_this){
			_this.interval = setInterval(function(){
				// check the time offset again ever hour
				if(_this.lastOffsetCheck + (60 * 60) < (new Date().getTime() / 1000)) getOffsets(_this);
				var realTime = (new Date().getTime() / 1000) + _this.dstOffset + _this.rawOffset;
				var date = new Date(realTime * 1000);
				var formatted = formatDate(date, _this.format);
				$(_this.element).html(formatted);
			}, 1000);
		}

		/**
		 * Format a date using PHP date shorthand
		 * slightly modified version of this function:
		 *	https://gist.github.com/Pamblam/4d33935d712903da10c7366c20157d21
		 * @param {String} format - The format of the outputted date
		 * @returns {String} - The formatted date
		 */
		function formatDate(date, format) {
			if (isNaN(date.getTime())) return "Invalid Date";
			var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

			var buffer = []; 
			for(var i=0; i<format.length; i++){
				switch(format[i]){
					// If the current char is a "\" then skip it and add then next literal char
					case "\\": buffer.push(format[++i]); break;

					// Symbols that represent numbers
					case "Y": buffer.push("" + date.getUTCFullYear()); break;
					case "y": buffer.push(("" + date.getUTCFullYear()).substring(2)); break;
					case "m": buffer.push(("0" + (date.getUTCMonth() + 1)).substr(-2, 2)); break;
					case "n": buffer.push("" + (date.getUTCMonth() + 1)); break;
					case "t": buffer.push("" + new Date(date.getUTCFullYear(), date.getUTCMonth() - 1, 0).getUTCDate()); break; 
					case "d": buffer.push(("0" + date.getUTCDate()).substr(-2, 2)); break;
					case "j": buffer.push(date.getUTCDate() + ""); break;
					case "w": buffer.push(date.getUTCDay()); break;
					case "g": buffer.push("" + (date.getUTCHours() > 12 ? date.getUTCHours() - 12 : date.getUTCHours())); break;
					case "G": buffer.push("" + (date.getUTCHours() + 1)); break;
					case "h": buffer.push(("0" + (date.getUTCHours() > 12 ? date.getUTCHours() - 12 : date.getUTCHours())).substr(-2, 2)); break;
					case "H": buffer.push(("0" + (date.getUTCHours() + 1)).substr(-2, 2)); break;
					case "i": buffer.push(("0" + date.getUTCMinutes()).substr(-2, 2)); break;
					case "s": buffer.push(("0" + date.getUTCSeconds()).substr(-2, 2)); break;

					// Symbols that represent text
					case "a": buffer.push(date.getUTCHours() > 11 ? "pm" : "am"); break;
					case "A": buffer.push(date.getUTCHours() > 11 ? "PM" : "AM"); break;
					case "l": buffer.push(days[date.getUTCDay()]); break;
					case "D": buffer.push(days[date.getUTCDay()].substr(0, 3)); break;
					case "F": buffer.push(months[date.getUTCMonth()]); break;
					case "M": buffer.push(months[date.getUTCMonth()].substring(0, 3)); break;
					
					// Ordinal suffix
					case "S":
						var suffix = false;
						var ones = buffer[buffer.length-1];
						var tens = buffer[buffer.length-2];
						if(ones == "1") suffix = "st";
						if(ones == "2") suffix = "nd";
						if(ones == "3") suffix = "rd";
						if(tens == "1" || !suffix) suffix = "th";
						buffer.push(suffix);
						break;

					default: buffer.push(format[i]); break;
						
				}
			}
			return buffer.join('');
		}
		
		/**
		 * Get UTC and DST offsets from the Googs
		 * @param {remoteTime} _this - A remoteTime instance
		 * @returns {Promise}
		 */
		function getOffsets(_this){
			return new Promise(function(done){
				if(!_this.lat || !_this.lng) return done();
				var timestamp = new Date().getTime() / 1000;
				$.ajax({
					url: "https://maps.googleapis.com/maps/api/timezone/json",
					data: {
						key: _this.key,
						location: _this.lat+","+_this.lng,
						timestamp: timestamp
					}
				}).done(function(results){
					if(results.status === "OK"){
						_this.dstOffset = results.dstOffset;
						_this.rawOffset = results.rawOffset;
					}
					_this.lastOffsetCheck = timestamp;
					done();
				});
			});
		}
		
		/**
		 * Geocode the string location given in the parameters
		 * @param {remoteTime} _this - A remoteTime instance
		 * @returns {Promise}
		 */
		function geocode(_this){
			return new Promise(function(done){
				$.ajax({
					url: "https://maps.google.com/maps/api/geocode/json",
					data: {
						key: _this.key,
						address: _this.location
					}
				}).done(function(results){
					if(results.status === "OK"){
						_this.lat = results.results[0].geometry.location.lat;
						_this.lng = results.results[0].geometry.location.lng;
					}
					done();
				});
			});
		}
		
		return this.each(function() {
			if ($(this).data('rtInstance') === undefined)
				$(this).data('rtInstance', new remoteTime(this, rtParams));
		});
    };
})(jQuery);

