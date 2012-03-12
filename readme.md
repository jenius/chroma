## Chroma

Chroma is a quick and easy way to manipulate colors with javascript. Currently it's a baby project and only has the ability to darken, lighten, saturate, desature, and convert between color formats. But as it grows, it will gain the ability to add, subtract, mix, and generate colors as well as employ various blend modes (like photoshop).

#### Usage

Just include the script on your page - it occupies the global namespace, adding a couple of convenience functions to your toolbelt. Later on it might be turned into a class, but I don't see a need for this yet.

**lighten(color, amount)**
Color can be passed as a hex in a string (ex. "#BB3C2D") or the color's rgb values in an array (ex. [186, 60, 45]).
Amount is a percentage, passed as a value between 0 and 1. So .5 would be 50%.

Example: `lighten("#BB3C2D", .25)` would lighten that fine red hue by 25% and return the resulting hex color.

You can also use `darken`, `saturate`, and `desaturate` - they all work the same way.

If you want to convert between formats (not sure why you would), you can use `to_rgb(color)` or `to_hex(color)`.

#### Contributing

This plugin is young as has a lot of potential for growth. If you want to feed it, by all means send a pull request. There is a super basic test suite running on jasmine in the test folder - writing tests for your new features will earn many bonus points.

Please add to the coffeescript source - it's much cleaner and easier to maintain this way. If you insist on writing javascript, I'm going to convert it to coffee anyway.