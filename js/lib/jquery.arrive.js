"use strict";
! function(a, b) {
    function c(a, b, d) {
        for (var e, f = 0; e = a[f]; f++) j.matchesSelector(e, b.selector) && -1 == b.firedElems.indexOf(e) && (b.firedElems.push(e), d.push({
            callback: b.callback,
            elem: e
        })), e.childNodes.length > 0 && c(e.childNodes, b, d)
    }

    function d(a) {
        for (var b, c = 0; b = a[c]; c++) b.callback.call(b.elem)
    }

    function e(a, b) {
        a.forEach(function(a) {
            var e = a.addedNodes,
                f = a.target,
                g = [];
            null !== e && e.length > 0 ? c(e, b, g) : "attributes" === a.type && j.matchesSelector(f, b.selector) && -1 == b.firedElems.indexOf(f) && (b.firedElems.push(f), g.push({
                callback: b.callback,
                elem: f
            })), d(g)
        })
    }

    function f(a, b) {
        a.forEach(function(a) {
            var e = a.removedNodes,
                f = (a.target, []);
            null !== e && e.length > 0 && c(e, b, f), d(f)
        })
    }

    function g(a) {
        var b = {
            attributes: !1,
            childList: !0,
            subtree: !0
        };
        return a.fireOnAttributesModification && (b.attributes = !0), b
    }

    function h() {
        var a = {
            childList: !0,
            subtree: !0
        };
        return a
    }

    function i(a) {
        a.arrive = o.bindEvent, j.addMethod(a, "unbindArrive", o.unbindEvent), j.addMethod(a, "unbindArrive", o.unbindEventWithSelectorOrCallback), j.addMethod(a, "unbindArrive", o.unbindEventWithSelectorAndCallback), a.leave = p.bindEvent, j.addMethod(a, "unbindLeave", p.unbindEvent), j.addMethod(a, "unbindLeave", p.unbindEventWithSelectorOrCallback), j.addMethod(a, "unbindLeave", p.unbindEventWithSelectorAndCallback)
    }
    var j = function() {
            var a = HTMLElement.prototype.matches || HTMLElement.prototype.webkitMatchesSelector || HTMLElement.prototype.mozMatchesSelector || HTMLElement.prototype.msMatchesSelector;
            return {
                matchesSelector: function(b, c) {
                    return b instanceof HTMLElement && a.call(b, c)
                },
                addMethod: function(a, b, c) {
                    var d = a[b];
                    a[b] = function() {
                        return c.length == arguments.length ? c.apply(this, arguments) : "function" == typeof d ? d.apply(this, arguments) : void 0
                    }
                }
            }
        }(),
        k = function() {
            var a = function() {
                this._eventsBucket = [], this._beforeAdding = null, this._beforeRemoving = null
            };
            return a.prototype.addEvent = function(a, b, c, d) {
                var e = {
                    target: a,
                    selector: b,
                    options: c,
                    callback: d,
                    firedElems: []
                };
                return this._beforeAdding && this._beforeAdding(e), this._eventsBucket.push(e), e
            }, a.prototype.removeEvent = function(a) {
                for (var b, c = this._eventsBucket.length - 1; b = this._eventsBucket[c]; c--) a(b) && (this._beforeRemoving && this._beforeRemoving(b), this._eventsBucket.splice(c, 1))
            }, a.prototype.beforeAdding = function(a) {
                this._beforeAdding = a
            }, a.prototype.beforeRemoving = function(a) {
                this._beforeRemoving = a
            }, a
        }(),
        l = function(b, c, d) {
            function e(a) {
                return "number" != typeof a.length && (a = [a]), a
            }
            var f = new k;
            return f.beforeAdding(function(c) {
                {
                    var e, f = c.target;
                    c.selector, c.callback
                }(f === a.document || f === a) && (f = document.getElementsByTagName("html")[0]), e = new MutationObserver(function(a) {
                    d.call(this, a, c)
                });
                var g = b(c.options);
                e.observe(f, g), c.observer = e
            }), f.beforeRemoving(function(a) {
                a.observer.disconnect()
            }), this.bindEvent = function(a, b, d) {
                "undefined" == typeof d && (d = b, b = c);
                for (var g = e(this), h = 0; h < g.length; h++) f.addEvent(g[h], a, b, d)
            }, this.unbindEvent = function() {
                var a = e(this);
                f.removeEvent(function(b) {
                    for (var c = 0; c < a.length; c++)
                        if (b.target === a[c]) return !0;
                    return !1
                })
            }, this.unbindEventWithSelectorOrCallback = function(a) {
                var b, c = e(this),
                    d = a;
                b = "function" == typeof a ? function(a) {
                    for (var b = 0; b < c.length; b++)
                        if (a.target === c[b] && a.callback === d) return !0;
                    return !1
                } : function(b) {
                    for (var d = 0; d < c.length; d++)
                        if (b.target === c[d] && b.selector === a) return !0;
                    return !1
                }, f.removeEvent(b)
            }, this.unbindEventWithSelectorAndCallback = function(a, b) {
                var c = e(this);
                f.removeEvent(function(d) {
                    for (var e = 0; e < c.length; e++)
                        if (d.target === c[e] && d.selector === a && d.callback === b) return !0;
                    return !1
                })
            }, this
        },
        m = {
            fireOnAttributesModification: !1
        },
        n = {},
        o = new l(g, m, e),
        p = new l(h, n, f);
    b && i(b.fn), i(HTMLElement.prototype), i(NodeList.prototype), i(HTMLCollection.prototype), i(HTMLDocument.prototype), i(Window.prototype)
}(this, "undefined" == typeof jQuery ? null : jQuery);