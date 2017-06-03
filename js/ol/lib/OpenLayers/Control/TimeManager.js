/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */


/**
 * @requires OpenLayers/Control.js
 */

/**
 * Class: OpenLayers.Control.TimeManager
 * Control to display and animate map layers across time.
 *
 * Inherits From:
 *  - <OpenLayers.Control>
 */
OpenLayers.Control.TimeManager = OpenLayers.Class(OpenLayers.Control, {

    /**
     * Constant: EVENT_TYPES
     *
     * Supported event types:
     *  - *beforetick* Triggered before the control advances one step in time.
     *      Return false to prevent the tick from occuring.
     *  - *tick* Triggered when the control advances one step in time.
     *      Listeners receive an event object with a *currentTime* parameter.
     *      Event is fired after the time has been incremented but before the
     *      map or layer display is modified.
     *  - *play* Triggered when the control begins a time-series animation.
     *  - *stop* Triggered when the control stops a time-series animation.
     *      Listeners receive an event object with a {Boolean} *rangeExceeded*
     *      property indicating the control stopped due to reaching the end of
     *      its configured time range (true) or due to the stop function call
     *      (false). This event will only fire on the stop function call during
     *      a loop-mode animation.
     *  - *reset* Triggered when the control resets a time-series animation.
     *      Listeners receive an event object with a {Boolean} *looped*
     *      property indicating the control reset due to running in looped mode
     *      (true) or the reset function call (false)
     */
    EVENT_TYPES: ["beforetick","tick","play","stop","reset"],


    /**
     * APIProperty: layers
     * {Array(<OpenLayers.Layer>)}
     */
    layers: null,
	
    /**
     * APIProperty: units
     * {OpenLayers.TimeUnit}
     */
	units:null,
	
    /**
     * APIProperty: step
     * {Number} The number of time units each tick will advance the current 
     *     animation time. Negative units with tick time in reverse.
     *     Default : 1.
     */
	step:1,
	
    /**
     * APIProperty: range
     * {Array(Date|String)} 2 member array containing the minimum and maximum times
     *     in UTC that the time-series animation will use. (Optional if using
     *     the intervals property). The 1st value should ALWAYS be less than
     *     the second value. Use negative step values to do reverse time.
     *     Note: You can use an ISO 8601 formated string (see 
     *     http://tools.ietf.org/html/rfc3339) or Date objects.
     */
	range:null,
	
	/**
	 * APIProperty: intervals
	 * {Array(Date|String)} Array of valid distinct UTC dates/times that the time-
	 * 	   series animation can use. (Optional)
	 *     Note: You can use an ISO 8601 formated string (see 
     *     http://tools.ietf.org/html/rfc3339) or Date objects.
	 */
	intervals:null,
		
	/**
	 * APIProperty: frameRate
	 * {Number} A positive floating point number of frames (or ticks) per 
	 *     second to use in time-series animations. Values less than 1 will
	 *     make each tick last for more than 1 second. Example: 0.5 = 1 tick
	 *     every 2 seconds. 3 = 3 ticks per second.  
	 *     Default : 1. 
	 */
	frameRate:1,
	
	/**
	 * APIProperty: loop
	 * {Boolean} true to continue running the animation until stop is called
	 *     Default:false
	 */
	loop:false,
	
	/**
	 * APIProperty: snapToIntervals
	 * {Boolean} If intervals are configured and this property is true then
	 *     tick will advance to the next time/date in the intervals array
	 *     regardless of the step value.
	 */
	snapToIntervals:false,
	
	/**
	 * APIProperty: maxFrameDelay
	 * {Number} The number of frame counts to delay the firing of the tick event
	 *     while the control waits for its time agents to be ready to advance.
	 *     Default: 1
	 */
    maxFrameDelay:1,
    /**
	 * APIProperty: currentTime
	 * {Date} The current time of the time-series animation
	 */
	currentTime:null,
	
	/**
	 * Property: timeAgents
	 * {Array(<OpenLayers.TimeAgent>)} An array of the agents that
	 *     this control "manages". Read-Only
	 */
	timeAgents:null,
	
	/**
     * Constructor: OpenLayers.Control.TimeManager
     * Create a new time manager control.
     *
     * Parameters:
     * options - {Object} Optional object whose properties will be set on the
     *     control.
     */
    initialize: function(options){
		options = options||{};
		OpenLayers.Control.prototype.initialize.call(this,options);
		if(this.intervals){
			for(var i=0,len=this.intervals.length;i<len;i++){
				var interval = this.intervals[i];
				if(!(interval[i] instanceof Date))this.intervals[i]=OpenLayers.Date.parse(interval);
			}
            this.intervals.sort(function(a,b){return a-b});
			this.range=[this.intervals[0],this.intervals[this.intervals.length-1]];
            this.fixedIntervals=true;
		}else if(this.range){
			if(!(this.range[0] instanceof Date))this.range[0]=OpenLayers.Date.parse(this.range[0]);
			if(!(this.range[1] instanceof Date))this.range[1]=OpenLayers.Date.parse(this.range[1]);
            this.fixedRange = true;
		}
		if (this.range && this.range.length) {
            this.currentTime = this.currentTime || new Date(this.range[0].getTime());
        }
		if (options.layers) {
            this.timeAgents = this.buildTimeAgents(options.layers);
            if(this.timeAgents.length){this.fixedLayers=true;}
        }
        this.events.on({
            'play': function(){
                if (!this.units) {
                    this.guessPlaybackRate()
                }
                else {
                    this.events.un({'play': arguments.caller.callee,scope: this})
                }
            },scope:this
        })
	},
	/**
	 * APIMethod: destroy
	 * Destroys the control
	 */
	destroy:function(){
		for(var i=this.timeAgents.length-1;i>-1;i--){
			this.timeAgents[i].destroy();
		}
		this.layers=null;
		OpenLayers.Control.prototype.destroy.call(this);
	},
    /**
     * APIMethod: setMap
     * Sets the map parameter of the control. Also called automattically when
     * the control is added to the map.
     * Parameter:
     *    map {<OpenLayers.Map>}
     */
    setMap:function(map){
        OpenLayers.Control.prototype.setMap.call(this,map);
        //if the control was not directly intialized with specific layers, then
        //get layers from map and build appropiate time agents
        if (!this.timeAgents) {
            for (var i = 0, len = map.layers.length; i < len; i++) {
                var lyr = map.layers[i];
                if ((lyr.dimensions && lyr.dimensions.time) || (lyr.metadata.timeInterval && lyr.metadata.timeInterval.length)) {
                    if (!this.layers) this.layers = [];
                    this.layers.push(lyr);
                }
            }
            this.timeAgents = this.buildTimeAgents(this.layers)
        }
        //if no interval was specified & interval !== false, get from timeAgents
        if(!this.intevals && this.intervals !== false){
            this.intervals = this.buildIntervals(this.timeAgents);
        }
        //if no range was specified then get from timeAgents
        if(!this.range){
            this.range = this.buildRange(this.timeAgents);
            if(this.range)this.currentTime = new Date(this.range[(this.step>0)?0:1].getTime())
        }
        
        //set map agents for layer additions and removal
        this.map.events.on({
            'addlayer':this.onAddLayer,
            'removelayer':this.onRemoveLayer,
            scope:this
        })
    },
    onAddLayer: function(evt){
        var lyr = evt.layer;
        if(lyr.dimensions && lyr.dimensions.time){
            lyr.metadata.timeInterval = this.timeExtentsToIntervals(lyr.dimensions.time)
        }
        var added=false;
        if (lyr.metadata.timeInterval && !this.fixedLayers) {
            this.timeAgents || (this.timeAgents = [])
            var agentClass = lyr.CLASS_NAME.match(/\.Layer\.(\w+)/)[1]
            for (var i = 0, len = this.timeAgents.length; i < len; i++) {
                if (!lyr.timeAgent && this.timeAgents[i] instanceof OpenLayers.TimeAgent[agentClass]) {
                    this.timeAgents[i].addLayer(lyr);
                    added = true;
                    break;
                }
            }
            if (!added) {
                var agents = this.buildTimeAgents([lyr]);
                this.timeAgents.push(agents[0]);
                added = true;
            }
            //check if layer could be used in a time agent & if so modify the
            //control range & interval as needed. time agent will convert timeInterval
            //values to real dates
            if(added){
                var lyrIntervals = lyr.metadata.timeInterval;
                if (lyrIntervals.length > 2 && !this.fixedIntervals) {
                    this.intervals || (this.intervals = []);
                    this.intervals = this.getUniqueDates(this.intervals.concat(lyrIntervals));
                    //adjust range as needed
                    if(!this.range){
                        this.setRange([this.intervals[0],this.intervals[this.intervals.length-1]])
                    }
                    else if(this.intervals[0]<this.range[0]||this.intervals[1]>this.range[1]){
                        this.setRange([Math.min(this.intervals[0],this.range[0]),Math.max(this.intervals[1],this.range[1])])
                    }
                }
                else if(!this.fixedRange){
                    if(!this.range){
                        this.setRange(lyrIntervals);
                    }
                    else if(lyrIntervals[0]<this.range[0]||lyrIntervals[1]>this.range[1]){
                        this.setRange([Math.min(lyrIntervals[0],this.range[0]),Math.max(lyrIntervals[1],this.range[1])])
                    }
                }
            }
        }
    },
    onRemoveLayer:function(evt){
        var lyr = evt.layer;
        if(lyr.metadata.timeInterval){
            var lyrIntervals = lyr.metadata.timeInterval;
            //find the agent with the layer
            for(var i=0, len = this.timeAgents.length;i<len;i++){
                var agent = this.timeAgents[i];
                if(OpenLayers.Util.indexOf(agent.layers,lyr)>-1){
                    agent.removeLayer(lyr);
                    //if the agent doesn't handle any layers, get rid of it
                    if(!agent.layers.length){
                        this.timeAgents.splice(i,1);
                        agent.destroy();
                    }
                    break;
                }
            }
            if(lyrIntervals.length>2 && !this.fixedIntervals){
                this.intervals = this.buildIntervals(this.timeAgents);
                if(this.intervals[0]<this.range[0]||this.intervals[1]>this.range[1]){
                    this.setRange([Math.min(this.intervals[0],this.range[0]),Math.max(this.intervals[1],this.range[1])])
                }
            }
            else if(!this.fixedRange){
                if (lyrIntervals[0].getTime() == this.range[0].getTime() || lyrIntervals[1].getTime() == this.range[1].getTime()) {
                    this.setRange(this.buildRange(this.timeAgents));
                }
            }
        }
    },
	/**
	 * Method: tick
	 * Advance/reverse time one step forward/backward. Fires the 'tick' event
	 * if time can be incremented without exceeding the time range.
	 * 
	 */
	tick:function(){
		if(this.intervals && this.snapToIntervals){
			var newIndex = OpenLayers.Util.indexOf(this.intervals,this.currentTime)+(this.step>0)?1:-1;
			if (newIndex < this.intervals.length && newIndex>-1) {
				this.currentTime = this.intervals[newIndex];
			}else{
				//force the currentTime beyond the range
				this.currentTime = (this.step>0)?new Date(this.range[1].getTime()+100):new Date(this.range[0].getTime()-100);
			}
		}
		else{
			this.incrementTime();
		}
		//test that we have reached the end of our range
		if (this.currentTime > this.range[1] || this.currentTime<this.range[0]) {
			//loop in looping mode
			if (this.loop) {
				this.timer && clearInterval(this.timer) && (this.timer=null);
				this.currentTime = (this.step>0)?new Date(this.range[0].getTime()):new Date(this.range[1].getTime());
				this.events.triggerEvent('reset',{'looped':true});
				this.play();
			}
			//stop in normal mode
			else {
				this.timer && clearInterval(this.timer) && (this.timer=null);
				this.events.triggerEvent('stop', {'rangeExceeded': true});
			}
		}
		else {
            
            if (this.canTickCheck()) {
                this.events.triggerEvent('tick', {currentTime: this.currentTime});
            }else{
                var intervalId,checkCount = 0,maxDelays = this.maxFrameDelay * 4;
                intervalId = setInterval(OpenLayers.Function.bind(function(){
                    var doTick = this.canTickCheck() || checkCount++ >= maxDelays
                    if(checkCount>maxDelays){console.log('ADVANCED DUE TO TIME LIMIT')}
                    if (doTick) {
                        clearInterval(intervalId);
                        this.events.triggerEvent('tick', {currentTime: this.currentTime});
                    }
                },this),1000/(this.frameRate*4))
            }
		}
	},
	/**
	 * APIMethod: play
	 * Begins/resumes the time-series animation. Fires the 'play' event,
	 * then calls 'tick' at the interval set by the frameRate property
	 */
	play:function(){
		//ensure that we don't have multiple timers running
		this.timer && clearInterval(this.timer) && (this.timer=null);
		//start playing
		this.events.triggerEvent('play');
		this.tick();
		this.timer = setInterval(OpenLayers.Function.bind(this.tick,this),1000/this.frameRate);
	},
	/**
	 * APIMethod: stop
	 * Stops the time-series animation. Fires the 'stop' event.
	 */
	stop:function(){
		this.timer && clearInterval(this.timer) && (this.timer=null);
		this.events.triggerEvent('stop',{'rangeExceeded':false});
	},
	/**
	 * APIMethod: setRange
	 * Sets the time range used by this control. Will modify the start time or
	 * current time only if the animation is not currently running
	 * 
	 * Parameters:
	 * range - {Arrray(Date|String)} UTC time range using either Date objects
	 *     or ISO 8601 formatted strings
	 */
	setRange:function(range){
		if(!(range[0] instanceof Date))range[0]=OpenLayers.Date.parse(range[0]);
		if(!(range[1] instanceof Date))range[1]=OpenLayers.Date.parse(range[1]);
		this.range=range;
		//set current time to correct location if the timer isn't running yet.
		if(!this.timer){this.currentTime = new Date(this.range[(this.step>0)?0:1].getTime())}
	},
	/**
	 * APIMethod:setStart
	 * Sets the start time for an animation. If the step is negative then this
	 * sets the maximum time in the control's range parameter. Will only effect
	 * the currentTime if an animation has not begun.
	 * 
	 * Parameters:
	 * time - {Date|String} UTC start time/date using either a Date object or
	 *     ISO 8601 formatted string.
	 */
	setStart:function(time){
		if(!(time instanceof Date))time=OpenLayers.Date.parse(time);
		this.range[(this.step>0)?0:1]=time;
		//set current time to this start time if we haven't already started
		!this.timer && (this.currentTime=new Date(time.getTime()));
	},
	/**
	 * APIMethod:setEnd
	 * Sets the end time for an animation. If the step is negative then this
	 * sets the minimum time in the control's range parameter. Will not effect
	 * the current time.
	 * 
	 * Parameters:
	 * time - {Date|String} UTC stop time/date using either a Date object or
	 *     ISO 8601 formatted string.
	 */	
	setEnd:function(time){
		if(!(time instanceof Date))time=OpenLayers.Date.parse(time);
		this.range[(this.step>0)?1:0]=time;
	},
	/**
	 * APIMethod:setTime
	 * Manually sets the currentTime used in the control's animation.
	 * 
	 * Parameters: {Object} time
	 * time - {Date|String} UTC current animantion time/date using either a 
	 *     Date object or ISO 8601 formatted string.
	 */
	setTime:function(time){
		if(!(time instanceof Date))time=OpenLayers.Date.parse(time);
		this.currentTime = time;
        this.events.triggerEvent('tick',{'currentTime':this.currentTime});
	},
	/**
	 * APIMethod:reset
	 * Resets the time to the animation start time. Fires the 'reset' event.
	 * 
	 * Returns:
	 * {Date} the control's currentTime, which is also the control's start time
	 */
	reset:function(){
		this.timer && clearInterval(this.timer);
		this.currentTime = new Date(this.range[(this.step>0)?0:1].getTime());
		this.events.triggerEvent('reset',{'looped':false});
        this.events.triggerEvent('tick',{'currentTime':this.currentTime});
		return this.currentTime;
	},
	/**
	 * APIMethod: incrementTime 
	 * Moves the current animation time forward by the specified step & stepUnit
	 * 
	 * Parameters:
	 * step - {Number}
	 * stepUnit - {<OpenLayers.TimeUnit>}
	 */
	incrementTime:function(step,stepUnit){
		step = step || this.step;
		stepUnit = stepUnit || this.units;
		this.currentTime['setUTC'+stepUnit](this.currentTime['getUTC'+stepUnit]()+step);
	},
	/**
	 * Method: buildTimeAgents
	 * Creates the controls "managed" by this control.
	 * 
	 * Parameters:
	 * layers - {Array(<OpenLayers.Layer>)}
	 * 
	 * Returns:
	 * {Array(<OpenLayers.Control.TimeControl>)}
	 */
	buildTimeAgents:function(layers){
		layers = layers || this.layers || [];
		var layerTypes = {}, agents = [];
		//categorize layers and separate into arrays for use in subclasses
		for(var i=0,len=layers.length;i<len;i++){
			var lyr = layers[i];
            if(lyr.dimensions && lyr.dimensions.time){lyr.metadata.timeInterval=this.timeExtentsToIntervals(lyr.dimensions.time)}
			//allow user specified overrides and custom behavior
            if (lyr.timeAgent) {
                var agent;
                if(lyr.timeAgent instanceof Function){
                    agent = new OpenLayers.TimeAgent({
                        onTick:lyr.timeAgent,
                        layers:[lyr],
                        timeManager:this
                    })
                }
                this.events.on({
                    tick: agent.onTick,
                    scope: this
                })
                agents.push(agent);
            }
            else {
                var lyrClass = lyr.CLASS_NAME.match(/\.Layer\.(\w+)/)[1];
                if (OpenLayers.TimeAgent[lyrClass]) {
                    !layerTypes[lyrClass] && (layerTypes[lyrClass] = [])
                    layerTypes[lyrClass].push(lyr);
                }
            }
		}
		//create subclassed time agents
		for(var k in layerTypes){
			var agentOpts = {
                layers: layerTypes[k],
                timeManager: this
            };
            if(this.agentOptions&&this.agentOptions[k]){OpenLayers.Util.applyDefaults(agentOpts,this.agentOptions[k])}
            var agent = new OpenLayers.TimeAgent[k](agentOpts);
			this.events.on({
				'tick': agent.onTick,
				scope: agent
			})
			agents.push(agent)
		}
		return (agents.length)?agents:null;
	},
	/**
	 * Method: buildIntervals
	 * Builds an array of distinct date/times that the time agents are
	 * configured with
	 * Parameters:
	 *    agents - {Array(<OpenLayers.TimeAgent>)}
	 *       (Optional) An array of time agents to calculate the intervals from.
	 *       Defaults to the control's timeAgents property. 
	 * Returns: {Array(Date)}
	 */
    buildIntervals:function(agents){
        agents = agents || this.timeAgents || [];
        var intervals = [];
        for(var i=0,len=agents.length;i<len;i++){
            var agent = agents[i];
            if(agent.intervals){
                intervals = intervals.concat(agent.intervals);
            }
        }
        intervals =(intervals.length)?this.getUniqueDates(intervals):null;
        return intervals;
    },
	/**
	 * Method: buildRange
	 * Builds an 2 member array with the overall start & stop date/times that
	 * the time agents are configured with.
	 * Parameters:
	 *    agents - {Array(<OpenLayers.TimeAgent>)}
	 *       (Optional) An array of time agents to calculate the intervals from.
	 *       Defaults to the control's timeAgents property. 
	 * Returns: {Array(Date)}
	 */
    buildRange:function(agents){
        agents = agents || this.timeAgents || [];
        var range = [];
        for(var i=0,len=agents.length;i<len;i++){
            var subrange = agents[i].range;
            if(!range[0] || subrange[0]<range[0]){range[0]=new Date(subrange[0].getTime())}
            if(!range[1] || subrange[1]>range[1]){range[1]=new Date(subrange[1].getTime())}
        }
        return (range.length)?range:null;
    },
    guessPlaybackRate:function(){
        var timeSpans=this.getValidTimeSpans();
        if (timeSpans) {
            timeSpans.sort(function(a, b){
                //sort by most restrictive range
                var arange = a.end - a.start, brange = b.end - b.start;
                if (arange != brange) {
                    return (arange < brange) ? 1 : -1
                }
                else if (a.resolution.units != b.resolution.units) {
                    //same range find biggest step unit
                    switch (a.resolution.units) {
                        case OpenLayers.TimeUnit.YEARS:
                            return 1
                        case OpenLayers.TimeUnit.SECONDS:
                            return -1
                        case OpenLayers.TimeUnit.MONTHS:
                            return (b.resolution.units == OpenLayers.TimeUnit.YEARS) ? -1 : 1
                        case OpenLayers.TimeUnit.MINUTES:
                            return (b.resolution.units == OpenLayers.TimeUnit.SECONDS) ? 1 : -1
                        case OpenLayers.TimeUnit.HOURS:
                            if (b.resolution.units == OpenLayers.TimeUnit.MINUTES || b.resolution.units == OpenLayers.TimeUnit.SECONDS) {
                                return 1
                            }
                            else {
                                return -1
                            }
                        case OpenLayers.TimeUnit.DAYS:
                            if (b.resolution.units == OpenLayers.TimeUnit.MONTHS || b.resolution.units == OpenLayers.TimeUnit.YEARS) {
                                return -1
                            }
                            else {
                                return 1
                            }
                    }
                }
                else {
                    //same range and units, pick largest step
                    return a.resolution.step - b.resolution.step
                }
            });
            this.setRange([timeSpans[0].start, timeSpans[0].end]);
            this.units = timeSpans[0].resolution.units;
            this.step = timeSpans[0].resolution.step;
        }
        else if (this.intervals) {
            this.snapToIntervals = true;
        }
        else {
            //guess based on range, keep step at 1
            var diff = this.range[1] - this.range[0];
            if (diff < 6e3) {
                this.units = OpenLayers.TimeUnit.SECONDS;
            }
            else if (diff < 36e5) {
                this.units = OpenLayers.TimeUnit.MINUTES;
            }
            else if (diff < 864e5) {
                this.units = OpenLayers.TimeUnit.HOURS;
            }
            else if (diff < 2628e6) {
                this.units = OpenLayers.TimeUnit.DAYS;
            }
            else if (diff < 31536e6) {
                this.units = OpenLayers.TimeUnit.MONTHS;
            }
            else {
                this.units = OpenLayers.TimeUnit.YEARS;
            }
        }
    },
    getValidTimeSpans:function(agents){
        agents = agents || this.timeAgents || [];
        var validTimes = []
        for(var i=0,len=agents.length;i<len;i++){
            if(agents[i].timeSpans){
                validTimes=validTimes.concat(agents[i].timeSpans)
            }
        }
        return (validTimes.length)?validTimes:null;
    },
    timeExtentsToIntervals: function(timeExtents){
        var intervals=[];
        for (var i = 0; i < timeExtents.length; ++i) {
            var timeParts = timeExtents[i].split("/");
            if (timeParts.length > 1) {
                var min = timeParts[0], max = timeParts[1], res = timeParts[2];
                intervals.push([min, max, res])
            }
            else {
                intervals.push(timeParts[0])
            }
        }
        return (intervals.length) ? intervals : null;
    },
    getUniqueDates:function(dates){
        //sort the times
        dates.sort(function(a, b){return a - b;});
        //filter for unique
        dates = OpenLayers.Array.filter(dates, function(item, index, array){
            for (var i = index + 1; i < array.length; i++) {
                if (item.getTime() == array[i].getTime()) {
                    return false
                }
            }
            return true;
        });
        return dates
    },
    canTickCheck: function(){
        var canTick = false;
        for (var i = 0, len = this.timeAgents.length; i < len; i++) {
            canTick = this.timeAgents[i].canTick;
            if (!canTick) break;
        }
        return canTick;
    },
	CLASS_NAME:'OpenLayers.Control.TimeManager'
});

OpenLayers.TimeUnit = {
	SECONDS:'Seconds',
	MINUTES:'Minutes',
	HOURS:'Hours',
	DAYS:'Date',
	MONTHS:'Month',
	YEARS:'FullYear'
}