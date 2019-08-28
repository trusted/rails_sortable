(function($) {

  $.fn.railsSortable = function(options) {
    options = options || {};
    var setting = $.extend({
      axis: 'y',
      scroll: 'true',
      url: '/sortable/reorder',
      successCallback: null,
      errorCallback: null
    }, options);

    setting.update = function(event, ui) {
      if (typeof options.update === 'function') {
        options.update(event, ui);
      }

      $.ajax({
        type: 'POST',
        url: setting.url,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(makePostData($(this))),
        success: setting.successCallback,
        error: setting.errorCallback
      });
    }

    this.sortable(setting);
  };

  var makePostData = function($sortable) {
    var data = $.map($sortable.sortable('toArray'), function(sortableId) {
      var klassAndId = sortableId.split(/[-=_]/);
      return { klass: klassAndId[0], id: klassAndId[1] };
    });
    return { rails_sortable: data };
  };
})(jQuery);
