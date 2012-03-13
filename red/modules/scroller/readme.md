### red.module.Scroller

A module that enables inertial scrolling on iOS. Ported, scoped and modularized from [https://github.com/zynga/scroller](https://github.com/zynga/scroller)

### Usage

	var scrollable = $(".scroller");

	var scroller = new red.module.Scroller({
		target: scrollable,

		// All options below are optional
		scrollingX: true,
		scrollingY: true,
		animation: true,
		bouncing: true,
		locking: true,
		paging: false,
		snapping: false,
		zooming: false,
		minZoom: 0.5,
		maxZoom: 0.5,
		pullToRefresh: false
	});


### Public API

- Setup scroll object dimensions.

	`scroller.setDimensions(clientWidth, clientHeight, contentWidth, contentHeight);`

- Setup scroll object position (in relation to the document). Required for zooming to event position (mousewheel, touchmove).

	`scroller.setPosition(clientLeft, clientTop);`

- Setup snap dimensions (only needed when `snapping` is enabled)

	`scroller.setSnapSize(width, height);`

- Setup pull-to-refresh. Height of the info region plus three callbacks which are executed on the different stages.

	`scroller.activatePullToRefresh(height, activate, deactivate, start);`

- Stop pull-to-refresh session. Called inside the logic started by start callback for activatePullToRefresh call.

	`scroller.finishPullToRefresh();`

- Get current scroll positions and zooming.

	`scroller.getValues();`

- Zoom to a specific level. Origin defines the pixel position where zooming should centering to. Defaults to center of scroller.

	`scroller.zoomTo(level, duration ? false, originLeft, originTop);`

- Zoom by a given amount. Same as `zoomTo` but by a relative value.

	`scroller.zoomBy(factor, duration ? false, originLeft, originTop);`

- Scroll to a specific position.

	`scroller.scrollTo(left, top, duration ? false);`

- Scroll by the given amount.

	`scroller.scrollBy(leftOffset, topOffset, duration ? false);`

- Update scroller option

	`scroller.setOption("scrollingY", false);`

### Event API

	scroller.bind("touchstart", function (e) {
		console.log(e.type);
	});

	scroller.bind("touchmove", function (e) {
		console.log(e.type);
	});

	scroller.bind("touchend", function (e) {
		console.log(e.type);
	});

	scroller.bind("touchinertia", function (e) {
		console.log(e.type);
	});


### Demo

See [here](demo/demo.html) for a sample demo.

### License

See LICENSE.