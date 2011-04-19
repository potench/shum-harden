## Starters:

- What is SASS?
	- Sass is an extension of CSS3, adding nested rules, variables, mixins, selector inheritance, and more. It’s translated to well-formatted, standard CSS using the command line tool or a web-framework plugin
- What is Compass?
	- Compass is an open-source CSS authoring framework which uses the Sass stylesheet language to make writing stylesheets powerful and easy.
	- Compass:SASS::Django:Python
	- Compass:SASS::Rails:Ruby

## Outline:

- resources vs static

- resources/style.scss
	- maps to: static/css/style.css
	- show off SASS features
		- Nested Rules
			- Parent Selectors
		- Variables
		- Math
		- Mixins
			- border-radius
			- opacity
			- inline-block
			- min-height / min-width
			- clearfix / pie-clearfix
			- inline-image
		- Sprites

- resources/config.rb

- @import
	- resources/sass/_base.scss
	- resources/sass/_defaults.scss
	- resources/sass/_mixins.scss

## Takeaways:

- SCSS > CSS
- SCSS is inviting, not intimidating
- Start low, end high. Nesting -> Mixins -> Variables -> Sprites
- Compass is language-agnostic
- You can use SCSS even in CSS projects