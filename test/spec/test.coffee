describe "Hex conversion", ->

  it "converts short hex codes correctly", ->
    expect(lighten("#fff", .2)).toEqual("#FFFFFF")
  
  it "converts from hex to rgb and back", ->
    rgb = to_rgb("#BB3C2D")
    hex = to_hex(rgb)
    expect("#BB3C2D").toEqual(hex)

describe "RGB conversion", ->

  it "converts from rgb to hex and back", ->
    hex = to_hex([186, 60, 45])
    rgb = to_rgb(hex)
    expect(rgb).toEqual([186, 60, 45])

describe "Modulation Functions", ->

  it "function normally", ->
    expect(lighten("#fff", .25)).toBeTruthy()

  it "returns false if passed anything other than a number for amount", ->
    expect(lighten("#fff", "twenty percent")).toBeFalsy()
  
  it "returns false if passed a faulty color", ->
    expect(lighten("red", .25)).toBeFalsy()
  
  it "passes but warns if passed too big an array", ->
    expect(lighten([20, 140, 200, 40], .25)).toBeTruthy()