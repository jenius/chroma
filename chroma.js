(function() {
  var check_inputs, darken, desaturate, hex_to_hsl, hex_to_rgb, hsl_to_hex, hsl_to_rgb, hue_to_rgb, lighten, lightness, rgb_to_hex, rgb_to_hsl, saturate, to_hex, to_hsl, to_rgb;

  hex_to_rgb = function(hex) {
    var blue, green, red;
    if (hex.length <= 4) {
      hex = "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }
    if (hex[0] === '#') {
      red = parseInt(hex.substring(1, 3), 16);
      green = parseInt(hex.substring(3, 5), 16);
      blue = parseInt(hex.substring(5, 7), 16);
    }
    return [red, green, blue];
  };

  hex_to_hsl = function(hex) {
    return rgb_to_hsl(hex_to_rgb(hex));
  };

  rgb_to_hsl = function(rgbin) {
    var diff, h, l, max, min, rgb, s, val, _i, _len;
    rgb = [];
    for (_i = 0, _len = rgbin.length; _i < _len; _i++) {
      val = rgbin[_i];
      rgb.push(val / 255.0);
    }
    max = Math.max.apply(Math, rgb);
    min = Math.min.apply(Math, rgb);
    diff = max - min;
    h = (function() {
      switch (max) {
        case min:
          return 0;
        case rgb[0]:
          return 60 * (rgb[1] - rgb[2]) / diff;
        case rgb[1]:
          return 60 * (rgb[2] - rgb[0]) / diff + 120;
        case rgb[2]:
          return 60 * (rgb[0] - rgb[1]) / diff + 240;
      }
    })();
    l = (max + min) / 2.0;
    s = max === min ? 0 : l < 0.5 ? diff / (2 * l) : diff / (2 - 2 * l);
    return [h % 360, s * 100, l * 100];
  };

  hsl_to_rgb = function(hsl) {
    var h, l, m1, m2, rgb, s;
    h = hsl[0] / 360.0;
    s = hsl[1] / 100.0;
    l = hsl[2] / 100.0;
    m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
    m1 = l * 2 - m2;
    rgb = [];
    rgb[0] = Math.round(hue_to_rgb(m1, m2, h + 1.0 / 3) * 0xff);
    rgb[1] = Math.round(hue_to_rgb(m1, m2, h) * 0xff);
    rgb[2] = Math.round(hue_to_rgb(m1, m2, h - 1.0 / 3) * 0xff);
    return rgb;
  };

  rgb_to_hex = function(rgb) {
    var blue, green, red;
    red = rgb[0].toString(16);
    green = rgb[1].toString(16);
    blue = rgb[2].toString(16);
    return ("#" + red + green + blue).toUpperCase();
  };

  hsl_to_hex = function(hsl) {
    return rgb_to_hex(hsl_to_rgb(hsl));
  };

  hue_to_rgb = function(m1, m2, h) {
    if (h < 0) h += 1;
    if (h > 1) h -= 1;
    if (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
    if (h * 2 < 1) return m2;
    if (h * 3 < 2) return m1 + (m2 - m1) * (2.0 / 3 - h) * 6;
    return m1;
  };

  to_hsl = function(color) {
    if (color[0] === '#') {
      return hex_to_hsl(color);
    } else {
      return rgb_to_hsl(color);
    }
  };

  to_rgb = function(color) {
    if (color[0] === '#') {
      return hex_to_rgb(color);
    } else {
      return false;
    }
  };

  to_hex = function(color) {
    if (color[0] !== '#') {
      return rgb_to_hex(color);
    } else {
      return false;
    }
  };

  check_inputs = function(amount, color) {
    if (typeof color === 'object' || typeof color === 'string') {
      if (typeof color === 'string' && color[0] !== '#') {
        console.log('ERROR: Pass hex colors with a hash at the beginning, like this: "#BB3C2D"');
        return false;
      }
      if (typeof color === 'object' && color.length > 3) {
        console.log('WARNING: Only the first three values of an rgb color will be used. Pass RGB colors like this - [24,130,75]');
        return true;
      }
    } else {
      alert(typeof color);
      console.log('ERROR: Pass either an rgb array (ex. [24,130,75]), or a string containing a hex code (ex. "#BB3C2D")');
      return false;
    }
    if (typeof amount !== 'number') {
      console.log('ERROR: the second parameter should be a number between zero and one - like this: lighten("#fff", .25)');
      return false;
    }
  };

  lightness = function(color) {
    var hsl;
    hsl = to_hsl(color);
    return console.log(hsl[2]);
  };

  lighten = function(color, amount) {
    var hsl;
    if (check_inputs(amount, color) === false) return false;
    hsl = to_hsl(color);
    amount = 100 * amount;
    hsl[2] = hsl[2] + amount > 100 ? 100 : hsl[2] += amount;
    if (color.slice(0, 1)) {
      return hsl_to_hex(hsl);
    } else {
      return hsl_to_rgb(hsl);
    }
  };

  darken = function(color, amount) {
    var hsl;
    if (check_inputs(amount, color) === false) return false;
    hsl = to_hsl(color);
    amount = 100 * amount;
    hsl[2] = hsl[2] - amount < 0 ? 0 : hsl[2] -= amount;
    if (color.slice(0, 1)) {
      return hsl_to_hex(hsl);
    } else {
      return hsl_to_rgb(hsl);
    }
  };

  saturate = function(color, amount) {
    var hsl;
    if (check_inputs(amount, color) === false) return false;
    hsl = to_hsl(color);
    amount = 100 * amount;
    hsl[1] = hsl[1] + amount > 100 ? 100 : hsl[1] += amount;
    if (color.slice(0, 1)) {
      return hsl_to_hex(hsl);
    } else {
      return hsl_to_rgb(hsl);
    }
  };

  desaturate = function(color, amount) {
    var hsl;
    if (check_inputs(amount, color) === false) return false;
    hsl = to_hsl(color);
    amount = 100 * amount;
    hsl[1] = hsl[1] - amount < 0 ? 0 : hsl[1] -= amount;
    if (color.slice(0, 1)) {
      return hsl_to_hex(hsl);
    } else {
      return hsl_to_rgb(hsl);
    }
  };

}).call(this);
