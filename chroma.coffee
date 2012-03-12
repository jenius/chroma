# Based on sass's color module: https://github.com/nex3/sass

# -------------------------------------------------
# processing functions (intended for internal use)
# -------------------------------------------------

hex_to_rgb = (hex) ->
  if hex.length <= 4
    hex = "##{hex[1]}#{hex[1]}#{hex[2]}#{hex[2]}#{hex[3]}#{hex[3]}"
      
  if hex[0] == '#'
    red = parseInt hex.substring(1,3), 16
    green = parseInt hex.substring(3,5), 16
    blue = parseInt hex.substring(5,7), 16

  [red, green, blue]

hex_to_hsl = (hex) ->
  rgb_to_hsl(hex_to_rgb(hex))

rgb_to_hsl = (rgbin) ->
  rgb = []
  for val in rgbin
    rgb.push val/255.0
  max = Math.max.apply(Math, rgb)
  min = Math.min.apply(Math, rgb)
  diff = max - min
  h = switch max
    when min then 0
    when rgb[0] then 60 * (rgb[1]-rgb[2]) / diff
    when rgb[1] then 60 * (rgb[2]-rgb[0]) / diff + 120
    when rgb[2] then 60 * (rgb[0]-rgb[1]) / diff + 240
  
  l = (max + min) / 2.0

  s = if max == min
    0
  else if l < 0.5
    diff / (2 * l)
  else
    diff / (2 - 2 * l)
  
  [h % 360, s * 100, l * 100]

hsl_to_rgb = (hsl) ->

  h = hsl[0] / 360.0
  s = hsl[1] / 100.0
  l = hsl[2] / 100.0

  m2 = if l <= 0.5 then l * (s + 1) else l + s - l * s
  m1 = l * 2 - m2

  rgb = []
  rgb[0] = Math.round(hue_to_rgb(m1, m2, h + 1.0/3) * 0xff)
  rgb[1] = Math.round(hue_to_rgb(m1, m2, h) * 0xff)
  rgb[2] = Math.round(hue_to_rgb(m1, m2, h - 1.0/3) * 0xff)

  return rgb

rgb_to_hex = (rgb) ->
  red = rgb[0].toString 16
  green = rgb[1].toString 16
  blue = rgb[2].toString 16
  "##{red}#{green}#{blue}".toUpperCase()

hsl_to_hex = (hsl) ->
  rgb_to_hex(hsl_to_rgb(hsl))

hue_to_rgb = (m1, m2, h) ->
  h += 1 if h < 0
  h -= 1 if h > 1
  return m1 + (m2 - m1) * h * 6 if h * 6 < 1
  return m2 if h * 2 < 1
  return m1 + (m2 - m1) * (2.0/3 - h) * 6 if h * 3 < 2
  return m1

to_hsl = (color) ->
  if color[0] == '#' then hex_to_hsl(color) else rgb_to_hsl(color)

to_rgb = (color) ->
  if color[0] == '#' then hex_to_rgb(color) else false

to_hex = (color) ->
  if color[0] != '#' then rgb_to_hex(color) else false 

# -----------------------------------
# modification functions
# -----------------------------------

# error handling

check_inputs = (amount, color) ->
  if typeof(color) == 'object' || typeof(color) == 'string'
    if typeof(color) == 'string' && color[0] != '#'
      console.log 'ERROR: Pass hex colors with a hash at the beginning, like this: "#BB3C2D"'
      return false
    if typeof(color) == 'object' && color.length > 3
      console.log 'WARNING: Only the first three values of an rgb color will be used. Pass RGB colors like this - [24,130,75]'
      return true
  else
    alert typeof(color)
    console.log 'ERROR: Pass either an rgb array (ex. [24,130,75]), or a string containing a hex code (ex. "#BB3C2D")'
    return false
  
  if typeof(amount) != 'number'
    console.log 'ERROR: the second parameter should be a number between zero and one - like this: lighten("#fff", .25)'
    return false

# -------------------

lighten = (color, amount) ->
  return false if check_inputs(amount, color) == false
  hsl = to_hsl(color)
  amount = 100 * amount
  hsl[2] = if hsl[2] + amount > 100 then 100 else hsl[2] += amount
  if color.slice(0,1) then return hsl_to_hex(hsl) else return hsl_to_rgb(hsl)

darken = (color, amount) ->
  return false if check_inputs(amount, color) == false
  hsl = to_hsl(color)  
  amount = 100 * amount
  hsl[2] = if hsl[2] - amount < 0 then 0 else hsl[2] -= amount
  if color.slice(0,1) then return hsl_to_hex(hsl) else return hsl_to_rgb(hsl)

saturate = (color, amount) ->
  return false if check_inputs(amount, color) == false
  hsl = to_hsl(color)
  amount = 100 * amount
  hsl[1] = if hsl[1] + amount > 100 then 100 else hsl[1] += amount
  if color.slice(0,1) then return hsl_to_hex(hsl) else return hsl_to_rgb(hsl)

desaturate = (color, amount) ->
  return false if check_inputs(amount, color) == false
  hsl = to_hsl(color)  
  amount = 100 * amount
  hsl[1] = if hsl[1] - amount < 0 then 0 else hsl[1] -= amount
  if color.slice(0,1) then return hsl_to_hex(hsl) else return hsl_to_rgb(hsl)