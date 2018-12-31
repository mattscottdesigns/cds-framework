/* global $ */

(function () {
  $.fn.overlay = function () {
    var element = this

    this.overlay = $("<div class='modal-backdrop fade show'></div>").hide()
    element.append(this.overlay)

    return this.overlay
  }
})()
