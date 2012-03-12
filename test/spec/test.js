
describe("Hex conversion", function() {
  it("converts short hex codes correctly", function() {
    return expect(lighten("#fff", .2)).toEqual("#FFFFFF");
  });
  return it("converts from hex to rgb and back", function() {
    var hex, rgb;
    rgb = to_rgb("#BB3C2D");
    hex = to_hex(rgb);
    return expect("#BB3C2D").toEqual(hex);
  });
});

describe("RGB conversion", function() {
  return it("converts from rgb to hex and back", function() {
    var hex, rgb;
    hex = to_hex([186, 60, 45]);
    rgb = to_rgb(hex);
    return expect(rgb).toEqual([186, 60, 45]);
  });
});

describe("Modulation Functions", function() {
  it("function normally", function() {
    return expect(lighten("#fff", .25)).toBeTruthy();
  });
  it("returns false if passed anything other than a number for amount", function() {
    return expect(lighten("#fff", "twenty percent")).toBeFalsy();
  });
  it("returns false if passed a faulty color", function() {
    return expect(lighten("red", .25)).toBeFalsy();
  });
  return it("passes but warns if passed too big an array", function() {
    return expect(lighten([20, 140, 200, 40], .25)).toBeTruthy();
  });
});
