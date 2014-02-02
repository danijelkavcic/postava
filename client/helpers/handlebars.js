DateFormats = {
  short: "DD.MM.YYYY",
  long: "dddd DD.MM.YYYY HH:mm"
};

////////// Handlebars helpers /////////////

Handlebars.registerHelper("formatDate", function(datetime, format) {
  if (moment) {
    f = DateFormats[format];
    return moment(datetime).format(f);
  } else {
    return datetime;
  }
});

Handlebars.registerHelper("stars", function(rate) {
  const maxStars = 4;
  var rateString = "";
  for (var i = 0; i < rate; i++) {
    rateString = rateString + "&#xf005;";
  };
  for (var i = rate; i < maxStars; i++) {
    rateString = rateString + "&#xf006;";
  }
  return rateString;
});

/// http://jaketrent.com/post/every-nth-item-in-handlebars-loop/
Handlebars.registerHelper('everyNth', function(context, every, options) {
  var fn = options.fn, inverse = options.inverse;
  var ret = "";
  if(context && context.length > 0) {
    for(var i=0, j=context.length; i<j; i++) {
      var modZero = i % every === 0;
      ret = ret + fn(_.extend({}, context[i], {
        isModZero: modZero,
        isModZeroNotFirst: modZero && i > 0,
        isLast: i === context.length - 1
      }));
    }
  } else {
    ret = inverse(this);
  }
  return ret;
});