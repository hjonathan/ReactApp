var myForm = webpackJsonpmyForm(
  [1],
  {
    "/JtG": function(e, t, a) {
      "use strict"
      var n = a("Zca+")
      t.a = {
        mixins: [n.a],
        props: ["model", "schema"],
        methods: {
          getValue: function() {
            return ""
          }
        },
        data: function() {
          return { color: "default" }
        }
      }
    },
    "2Q1b": function(e, t, a) {
      "use strict"
      Object.defineProperty(t, "__esModule", { value: !0 })
      var n = a("6Mof"),
        i = a("kikc"),
        r = a("VU/8"),
        o = r(n.a, i.a, !1, null, null, null)
      t.default = o.exports
    },
    "2bsc": function(e, t, a) {
      "use strict"
      Object.defineProperty(t, "__esModule", { value: !0 })
      var n = a("sd6W"),
        i = a("wKzu"),
        r = a("VU/8"),
        o = r(n.a, i.a, !1, null, null, null)
      t.default = o.exports
    },
    "3VP8": function(e, t, a) {
      "use strict"
      var n = function() {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a("div", { staticClass: "form-group form-inline" }, [
            a("label", { staticClass: "col-5" }, [
              a("span", { domProps: { textContent: e._s(e.schema.label) } }),
              e._v(" "),
              a(
                "strong",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: e.schema.required,
                      expression: "schema.required"
                    }
                  ]
                },
                [a("span", { staticStyle: { color: "red" } }, [e._v(" * ")])]
              )
            ]),
            e._v(" "),
            a("textarea", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: e.value,
                  expression: "value"
                }
              ],
              staticClass: "col-5 form-control",
              attrs: { rows: e.schema.rows },
              domProps: { value: e.value },
              on: {
                input: function(t) {
                  t.target.composing || (e.value = t.target.value)
                }
              }
            })
          ])
        },
        i = [],
        r = { render: n, staticRenderFns: i }
      t.a = r
    },
    "4HiE": function(e, t, a) {
      "use strict"
      Object.defineProperty(t, "__esModule", { value: !0 })
      var n = a("IyNI"),
        i = a("h2Bv"),
        r = a("VU/8"),
        o = r(n.a, i.a, !1, null, null, null)
      t.default = o.exports
    },
    "5/FK": function(e, t, a) {
      "use strict"
      Object.defineProperty(t, "__esModule", { value: !0 })
      var n = a("TrV/"),
        i = a("9qPF"),
        r = a("VU/8"),
        o = r(n.a, i.a, !1, null, null, null)
      t.default = o.exports
    },
    "52u5": function(e, t, a) {
      "use strict"
      var n = function() {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a("div", { staticClass: "form-group form-inline" }, [
            a("label", { staticClass: "col-5 signature-label" }, [
              a("span", { domProps: { textContent: e._s(e.schema.label) } })
            ]),
            e._v(" "),
            e._m(0)
          ])
        },
        i = [
          function() {
            var e = this,
              t = e.$createElement,
              a = e._self._c || t
            return a(
              "div",
              {
                staticClass: "col-12 signature-content",
                staticStyle: { "text-align": "center" }
              },
              [
                a("canvas", {
                  staticClass: "signature-canvas",
                  staticStyle: { border: "solid 1px" }
                }),
                e._v(" "),
                a("div", { staticClass: "signature-controls" }, [
                  a(
                    "button",
                    {
                      staticClass: "btn btn-primary signature-save",
                      attrs: { type: "button" }
                    },
                    [e._v("Save")]
                  ),
                  e._v(" "),
                  a(
                    "button",
                    {
                      staticClass: "btn btn-secondary signature-clear",
                      attrs: { type: "button" }
                    },
                    [e._v("Clear")]
                  )
                ])
              ]
            )
          }
        ],
        r = { render: n, staticRenderFns: i }
      t.a = r
    },
    "6Mof": function(e, t, a) {
      "use strict"
      var n = a("Zca+")
      t.a = {
        mixins: [n.a],
        props: ["model", "schema"],
        methods: {
          setValue: function(e) {
            this.value = e
          },
          getValue: function() {
            return this.value
          },
          changeValue: function(e) {
            this.value = e
          },
          addOption: function() {
            console.log(this.schema)
          }
        },
        data: function() {
          return { value: [] }
        }
      }
    },
    "6qW4": function(e, t, a) {
      "use strict"
      Object.defineProperty(t, "__esModule", { value: !0 })
      var n = a("u6zT"),
        i = a("8wlY"),
        r = a("VU/8"),
        o = r(n.a, i.a, !1, null, null, null)
      t.default = o.exports
    },
    "8Fh5": function(e, t, a) {
      "use strict"
      var n = function() {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a("div", { staticClass: "form-group form-inline" }, [
            a("label", { staticClass: "col-5" }, [
              a("span", { domProps: { textContent: e._s(e.schema.label) } }),
              e._v(" "),
              a(
                "strong",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: e.required,
                      expression: "required"
                    }
                  ]
                },
                [a("span", { staticStyle: { color: "red" } }, [e._v(" * ")])]
              )
            ]),
            e._v(" "),
            a("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: e.schema.value,
                  expression: "schema.value"
                }
              ],
              attrs: { type: "suggest" },
              domProps: { value: e.schema.value },
              on: {
                input: function(t) {
                  t.target.composing ||
                    e.$set(e.schema, "value", t.target.value)
                }
              }
            })
          ])
        },
        i = [],
        r = { render: n, staticRenderFns: i }
      t.a = r
    },
    "8qG6": function(e, t, a) {
      "use strict"
      Object.defineProperty(t, "__esModule", { value: !0 })
      var n = a("LFuQ"),
        i = a("8Fh5"),
        r = a("VU/8"),
        o = r(n.a, i.a, !1, null, null, null)
      t.default = o.exports
    },
    "8wlY": function(e, t, a) {
      "use strict"
      var n = function() {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a(
            "div",
            { staticClass: "button-form", attrs: { align: "center" } },
            [
              a(
                "button",
                {
                  class: "btn btn-" + e.color,
                  attrs: { type: "submit" },
                  on: { click: e.onClick }
                },
                [e._v(e._s(e.schema.label))]
              )
            ]
          )
        },
        i = [],
        r = { render: n, staticRenderFns: i }
      t.a = r
    },
    "9qPF": function(e, t, a) {
      "use strict"
      var n = function() {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a("div", { staticClass: "form-group form-inline" }, [
            a("label", { staticClass: "col-5" }, [
              a("span", { domProps: { textContent: e._s(e.schema.label) } }),
              e._v(" "),
              a(
                "strong",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: e.schema.required,
                      expression: "schema.required"
                    }
                  ]
                },
                [a("span", { staticStyle: { color: "red" } }, [e._v(" * ")])]
              )
            ]),
            e._v(" "),
            a("input", {
              staticClass: "col-5 form-control-file",
              attrs: { type: "file", id: "multipleFile-form" }
            })
          ])
        },
        i = [],
        r = { render: n, staticRenderFns: i }
      t.a = r
    },
    AjKV: function(e, t, a) {
      "use strict"
      var n = a("Zca+")
      t.a = {
        mixins: [n.a],
        props: ["model", "schema"],
        methods: {
          setValue: function(e) {
            this.value = e
          },
          getValue: function() {
            return this.href
          },
          changeValue: function(e) {
            this.value = e
          },
          getDisplayText: function() {
            return "" !== this.schema.value
              ? this.schema.value
              : this.schema.href
          }
        },
        data: function() {
          return { href: this.schema.href, value: this.getDisplayText() }
        }
      }
    },
    "Aq/l": function(e, t) {},
    Bknl: function(e, t, a) {
      "use strict"
      var n = a("kBR5"),
        i = a("Zca+")
      t.a = {
        mixins: [i.a],
        props: ["model", "schema"],
        data: function() {
          return { instanceSignature: null }
        },
        mounted: function() {
          var e = this,
            t = this.$el.querySelector(".signature-save"),
            a = this.$el.querySelector(".signature-clear"),
            i = this.$el.querySelector(".signature-canvas")
          ;(this.instanceSignature = new n.a(i)),
            t.addEventListener("click", function() {
              console.log(e.getValue())
            }),
            a.addEventListener("click", function() {
              e.clear()
            })
        },
        methods: {
          getValue: function() {
            return this.instanceSignature.toDataURL("image/URL")
          },
          clear: function() {
            this.instanceSignature && this.instanceSignature.clear()
          }
        }
      }
    },
    CMmq: function(e, t, a) {
      "use strict"
      Object.defineProperty(t, "__esModule", { value: !0 })
      var n = a("Bknl"),
        i = a("52u5"),
        r = a("VU/8"),
        o = r(n.a, i.a, !1, null, null, null)
      t.default = o.exports
    },
    Cdf9: function(e, t, a) {
      "use strict"
      var n = a("Zca+")
      t.a = {
        mixins: [n.a],
        props: ["model", "schema"],
        methods: {
          setValue: function(e) {
            this.value = e
          },
          getValue: function() {
            return this.value
          },
          changeValue: function(e) {
            this.value = e
          }
        },
        data: function() {
          return { value: "" }
        }
      }
    },
    IyNI: function(e, t, a) {
      "use strict"
      var n = a("Zca+")
      t.a = {
        mixins: [n.a],
        props: ["model", "schema"],
        methods: {
          setValue: function(e) {
            this.value = e
          },
          getValue: function() {
            return this.selected
          }
        },
        data: function() {
          return {
            selected: this.schema.data.value || this.schema.defaultValue
          }
        }
      }
    },
    KPpn: function(e, t, a) {
      "use strict"
      Object.defineProperty(t, "__esModule", { value: !0 })
      var n = a("Cdf9"),
        i = a("ZpVk"),
        r = a("VU/8"),
        o = r(n.a, i.a, !1, null, null, null)
      t.default = o.exports
    },
    LFuQ: function(e, t, a) {
      "use strict"
      var n = a("Zca+")
      t.a = {
        mixins: [n.a],
        props: ["model", "schema"],
        methods: {
          setValue: function(e) {
            this.value = e
          },
          getValue: function() {
            return this.value
          }
        },
        data: function() {
          return { required: this.schema.required }
        }
      }
    },
    LHRn: function(e, t, a) {
      "use strict"
      var n = function() {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a("div", { staticClass: "form-group form-inline" }, [
            a("label", { staticClass: "col-5", attrs: { align: "center" } }, [
              a("span", { domProps: { textContent: e._s(e.schema.label) } })
            ])
          ])
        },
        i = [],
        r = { render: n, staticRenderFns: i }
      t.a = r
    },
    LaK9: function(e, t, a) {
      "use strict"
      var n = a("Zca+")
      t.a = {
        mixins: [n.a],
        props: ["model", "schema"],
        methods: {
          setValue: function(e) {
            this.value = e
          },
          getValue: function(e) {
            return this.value
          }
        },
        data: function() {
          return { value: "" }
        }
      }
    },
    M93x: function(e, t, a) {
      "use strict"
      function n(e) {
        a("UqXS")
      }
      var i = a("xJD8"),
        r = a("ygNF"),
        o = a("VU/8"),
        s = n,
        l = o(i.a, r.a, !1, s, null, null)
      t.a = l.exports
    },
    MSmT: function(e, t, a) {
      "use strict"
      var n = function() {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a("div", { staticClass: "form-group form-inline" }, [
            a("label", { staticClass: "col-5" }, [
              a("span", { domProps: { textContent: e._s(e.schema.label) } }),
              e._v(" "),
              a(
                "strong",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: e.schema.required,
                      expression: "schema.required"
                    }
                  ]
                },
                [a("span", { staticStyle: { color: "red" } }, [e._v(" * ")])]
              )
            ]),
            e._v(" "),
            a("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: e.value,
                  expression: "value"
                }
              ],
              staticClass: "col-5 form-control",
              attrs: { type: "checkbox", id: e.schema.id },
              domProps: {
                checked: Array.isArray(e.value)
                  ? e._i(e.value, null) > -1
                  : e.value
              },
              on: {
                change: function(t) {
                  var a = e.value,
                    n = t.target,
                    i = !!n.checked
                  if (Array.isArray(a)) {
                    var r = e._i(a, null)
                    n.checked
                      ? r < 0 && (e.value = a.concat([null]))
                      : r > -1 &&
                        (e.value = a.slice(0, r).concat(a.slice(r + 1)))
                  } else e.value = i
                }
              }
            })
          ])
        },
        i = [],
        r = { render: n, staticRenderFns: i }
      t.a = r
    },
    MqUg: function(e, t, a) {
      "use strict"
      var n = a("Zca+")
      t.a = {
        mixins: [n.a],
        props: ["model", "schema"],
        methods: {
          setValue: function(e) {
            this.value = e
          },
          getValue: function() {
            return this.value
          }
        }
      }
    },
    NHnr: function(e, t, a) {
      "use strict"
      Object.defineProperty(t, "__esModule", { value: !0 }),
        a.d(t, "MyForm", function() {
          return v
        })
      var n = a("Zrlr"),
        i = a.n(n),
        r = a("wxAW"),
        o = a.n(r),
        s = a("7+uW"),
        l = a("M93x"),
        u = a("YaEn"),
        c = a("eZhh")
      s.a.config.productionTip = !1
      var d = {
          $schema: "http://json-schema.org/draft-04/schema#",
          type: "object",
          title: "Newsletter Subscription",
          properties: {
            firstname: {
              type: "string",
              minLength: 8,
              maxLength: 80,
              attrs: {
                placeholder: "First Name",
                title: "Please enter your First name"
              }
            },
            lastname: {
              type: "string",
              minLength: 8,
              maxLength: 80,
              attrs: {
                placeholder: "last Name",
                title: "Please enter your Last name"
              }
            }
          },
          additionalProperties: !1,
          required: ["name"]
        },
        h = {
          name: "test",
          description: "test",
          items: [
            {
              type: "form",
              variable: "",
              var_uid: "",
              dataType: "",
              id: "17067691559c1abe7e6c575041027285",
              name: "test",
              description: "test",
              mode: "edit",
              script: "",
              language: "en",
              externalLibs: "",
              printable: !1,
              items: [
                [
                  {
                    type: "title",
                    id: "title0000000001",
                    label: "Form rendering framework",
                    colSpan: 12
                  }
                ],
                [
                  {
                    type: "subtitle",
                    id: "subtitle0000000001",
                    label: "Basic form",
                    colSpan: 12
                  }
                ],
                [
                  {
                    type: "text",
                    variable: "textVar001",
                    var_uid: "32521819059c1add7864fd5066612689",
                    dataType: "string",
                    protectedValue: !1,
                    id: "textVar001",
                    name: "textVar001",
                    label: "text_1",
                    defaultValue: "",
                    placeholder: "",
                    hint: "",
                    value: "",
                    required: !1,
                    requiredFieldErrorMessage: "",
                    textTransform: "none",
                    validate: "",
                    validateMessage: "",
                    maxLength: 1e3,
                    formula: "",
                    mode: "parent",
                    operation: "",
                    dbConnection: "workflow",
                    dbConnectionLabel: "PM Database",
                    sql: "",
                    var_name: "textVar001",
                    colSpan: 12,
                    data: { value: "hola", label: "hola" }
                  }
                ],
                [
                  {
                    type: "dropdown",
                    variable: "dropdownVar",
                    var_uid: "40611700259c1bdb9043b28007655973",
                    dataType: "string",
                    protectedValue: !1,
                    id: "dropdownVar",
                    name: "dropdownVar",
                    label: "dropdown_1",
                    defaultValue: "",
                    placeholder: "",
                    hint: "",
                    required: !1,
                    requiredFieldErrorMessage: "",
                    mode: "parent",
                    datasource: "database",
                    dbConnection: "workflow",
                    dbConnectionLabel: "PM Database",
                    sql: "",
                    dataVariable: "",
                    options: [
                      { value: "1", label: "uno" },
                      { value: "2", label: "dos" },
                      { value: "3", label: "tres" }
                    ],
                    var_name: "dropdownVar",
                    colSpan: 12,
                    data: { value: "2", label: "dos" }
                  }
                ],
                [
                  {
                    type: "textarea",
                    variable: "textareaVar001",
                    var_uid: "27002135859c1addcaa1fc0077992341",
                    dataType: "string",
                    protectedValue: !1,
                    id: "textareaVar001",
                    name: "textareaVar001",
                    label: "textarea_1",
                    defaultValue: "",
                    placeholder: "",
                    hint: "",
                    required: !1,
                    requiredFieldErrorMessage: "",
                    validate: "",
                    validateMessage: "",
                    mode: "parent",
                    dbConnection: "workflow",
                    dbConnectionLabel: "PM Database",
                    sql: "",
                    rows: "5",
                    var_name: "textareaVar001",
                    colSpan: 12,
                    data: { label: "chao", value: "chao" }
                  }
                ],
                [
                  {
                    type: "checkbox",
                    variable: "checkboxVar001",
                    var_uid: "61111598259c27b0f1d8f53062830713",
                    dataType: "boolean",
                    protectedValue: !1,
                    id: "checkboxVar001",
                    name: "checkboxVar001",
                    label: "checkbox_1",
                    defaultValue: "",
                    hint: "",
                    required: !0,
                    requiredFieldErrorMessage: "",
                    mode: "parent",
                    options: [
                      { value: "1", label: "true" },
                      { value: "0", label: "false" }
                    ],
                    var_name: "checkboxVar001",
                    colSpan: 12
                  }
                ],
                [
                  {
                    type: "radio",
                    variable: "radio",
                    var_uid: "352358977599f4128f23739004538266",
                    dataType: "string",
                    protectedValue: !1,
                    id: "radioVar001",
                    name: "radioVar001",
                    label: "radio_1",
                    defaultValue: "0",
                    hint: "",
                    required: !1,
                    requiredFieldErrorMessage: "",
                    mode: "parent",
                    options: [
                      { value: "1", label: "Option 1" },
                      { value: "2", label: "Option 2" },
                      { value: "3", label: "Option 3" },
                      { value: "4", label: "Option 4" }
                    ],
                    var_name: "radioVar001",
                    colSpan: 12
                  }
                ],
                [
                  {
                    type: "multipleFile",
                    variable: "multipleFileVar001",
                    var_uid: "352358977599f4128f23739004538265",
                    dataType: "multiplefile",
                    protectedValue: !1,
                    id: "multipleFileVar001",
                    name: "multipleFileVar001",
                    label: "multipleFile_1",
                    inputDocument: "inputForTestDownload",
                    required: !1,
                    requiredFieldErrorMessage: "",
                    dnd: !1,
                    extensions: ".*",
                    size: 0,
                    sizeUnity: "KB",
                    enableVersioning: "No",
                    mode: "parent",
                    multiple: !1,
                    inp_doc_uid: "134850353599f41028965f9081484930",
                    var_name: "multipleFileVar001",
                    colSpan: 12
                  }
                ],
                [
                  {
                    type: "datetime",
                    variable: "datetimeVar001",
                    var_uid: "24563462859c920190bc480036631160",
                    dataType: "datetime",
                    protectedValue: !1,
                    id: "datetimeVar001",
                    name: "datetimeVar001",
                    label: "datetime_1",
                    placeholder: "",
                    hint: "",
                    required: !1,
                    requiredFieldErrorMessage: "",
                    mode: "parent",
                    format: "YYYY-MM-DD",
                    dayViewHeaderFormat: "MMMM YYYY",
                    extraFormats: !1,
                    stepping: 1,
                    minDate: "",
                    maxDate: "",
                    useCurrent: "false",
                    collapse: !0,
                    locale: "",
                    defaultDate: "",
                    disabledDates: !1,
                    enabledDates: !1,
                    icons: {
                      time: "glyphicon glyphicon-time",
                      date: "glyphicon glyphicon-calendar",
                      up: "glyphicon glyphicon-chevron-up",
                      down: "glyphicon glyphicon-chevron-down",
                      previous: "glyphicon glyphicon-chevron-left",
                      next: "glyphicon glyphicon-chevron-right",
                      today: "glyphicon glyphicon-screenshot",
                      clear: "glyphicon glyphicon-trash"
                    },
                    useStrict: !1,
                    sideBySide: !1,
                    daysOfWeekDisabled: !1,
                    calendarWeeks: !1,
                    viewMode: "days",
                    toolbarPlacement: "default",
                    showTodayButton: !1,
                    showClear: "false",
                    widgetPositioning: { horizontal: "auto", vertical: "auto" },
                    widgetParent: null,
                    keepOpen: !1,
                    var_name: "datetimeVar001",
                    colSpan: 12
                  }
                ],
                [
                  {
                    type: "link",
                    id: "link0000000001",
                    name: "link0000000001",
                    label: "link_1",
                    value: "Click Here",
                    href: "http://www.processmaker.com/",
                    hint: "",
                    colSpan: 12
                  }
                ],
                [
                  {
                    type: "checkgroup",
                    variable: "checkgroupVar002",
                    var_uid: "54821387659c95e177ddbf5004693297",
                    dataType: "array",
                    protectedValue: !1,
                    id: "checkgroupVar002",
                    name: "checkgroupVar002",
                    label: "checkgroup_1",
                    defaultValue: "",
                    hint: "",
                    required: !1,
                    requiredFieldErrorMessage: "",
                    mode: "parent",
                    datasource: "database",
                    dbConnection: "workflow",
                    dbConnectionLabel: "PM Database",
                    sql: "",
                    dataVariable: "",
                    options: [
                      { value: "check1", label: "Check 1" },
                      { value: "check2", label: "Check 2" },
                      { value: "check3", label: "Check 3" }
                    ],
                    var_name: "checkgroupVar002",
                    colSpan: 12
                  }
                ],
                [
                  {
                    type: "suggest",
                    variable: "suggestVar002",
                    var_uid: "12038067159c95e1112a482084526747",
                    dataType: "string",
                    protectedValue: !1,
                    id: "suggestVar002",
                    name: "suggestVar002",
                    label: "suggest_1",
                    defaultValue: "",
                    placeholder: "",
                    hint: "",
                    value: "",
                    required: !1,
                    requiredFieldErrorMessage: "",
                    mode: "parent",
                    datasource: "database",
                    dbConnection: "workflow",
                    dbConnectionLabel: "PM Database",
                    sql: "",
                    dataVariable: "",
                    options: [
                      { value: "1", label: "Option 1" },
                      { value: "2", label: "Option 2" },
                      { value: "3", label: "Fabio" },
                      { value: "4", label: "Learning Vue" },
                      { value: "5", label: "Frontend" }
                    ],
                    delay: 0,
                    var_name: "suggestVar002",
                    colSpan: 12
                  }
                ],
                [
                  {
                    type: "label",
                    id: "label0000000001",
                    label: "label_1",
                    colSpan: 12
                  }
                ],
                [
                  {
                    type: "image",
                    id: "image0000000001",
                    name: "image0000000001",
                    label: "image_1",
                    hint: "",
                    src:
                      "http://wiki.processmaker.com/sites/default/files/ControlPropertyCommentREnderVersion3.png",
                    shape: "",
                    alternateText: "image",
                    comment: "",
                    mode: "parent",
                    alt: "",
                    colSpan: 12
                  }
                ],
                [
                  {
                    type: "button",
                    id: "button0000000001",
                    name: "button0000000001",
                    label: "button_1",
                    colSpan: 12
                  }
                ],
                [
                  {
                    type: "submit",
                    id: "submit0000000001",
                    name: "submit0000000001",
                    label: "submit_1",
                    colSpan: 12
                  }
                ],
                [
                  {
                    type: "signature",
                    id: "signature001",
                    label: "signature_001",
                    colSpan: 12
                  }
                ],
                [
                  {
                    type: "hidden",
                    variable: "hiddenVar001",
                    var_uid: "72393946759ca3ecaf10b79089879916",
                    dataType: "string",
                    protectedValue: !1,
                    id: "hiddenVar001",
                    name: "hiddenVar001",
                    defaultValue: "input hidden",
                    dbConnection: "workflow",
                    dbConnectionLabel: "PM Database",
                    sql: "",
                    var_name: "hiddenVar001",
                    colSpan: 12
                  }
                ]
              ],
              variables: [
                {
                  var_uid: "32521819059c1add7864fd5066612689",
                  prj_uid: "48035550959b88e5fd0c076026067551",
                  var_name: "textVar001",
                  var_field_type: "string",
                  var_field_size: 10,
                  var_label: "string",
                  var_dbconnection: "workflow",
                  var_dbconnection_label: "PM Database",
                  var_sql: "",
                  var_null: 0,
                  var_default: "",
                  var_accepted_values: "[]",
                  inp_doc_uid: ""
                },
                {
                  var_uid: "40611700259c1bdb9043b28007655973",
                  prj_uid: "48035550959b88e5fd0c076026067551",
                  var_name: "dropdownVar",
                  var_field_type: "string",
                  var_field_size: 10,
                  var_label: "string",
                  var_dbconnection: "workflow",
                  var_dbconnection_label: "PM Database",
                  var_sql: "",
                  var_null: 0,
                  var_default: "",
                  var_accepted_values: "[]",
                  inp_doc_uid: ""
                },
                {
                  var_uid: "27002135859c1addcaa1fc0077992341",
                  prj_uid: "48035550959b88e5fd0c076026067551",
                  var_name: "textareaVar001",
                  var_field_type: "string",
                  var_field_size: 10,
                  var_label: "string",
                  var_dbconnection: "workflow",
                  var_dbconnection_label: "PM Database",
                  var_sql: "",
                  var_null: 0,
                  var_default: "",
                  var_accepted_values: "[]",
                  inp_doc_uid: ""
                }
              ]
            }
          ]
        },
        v = (function() {
          function e(t) {
            i()(this, e),
              (this.el = t.el || "#app"),
              (this.jsonSchema = t.jsonSchema),
              (this.formUI = t.formUI),
              (this.formData = t.formData),
              (this.onSubmit = t.onSubmit)
          }
          return (
            o()(e, [
              {
                key: "render",
                value: function() {
                  var e = this.getForm(this.formUI),
                    t = this,
                    a = new s.a({
                      el: this.el,
                      router: u.a,
                      template: "<App/>",
                      components: { App: l.a },
                      data: { model: this.model || {}, formUI: e },
                      methods: {
                        getData: function() {},
                        getValue: function(e) {
                          return this.formUI.getValue(e)
                        },
                        _onSubmit: function(e) {
                          "function" == typeof t.onSubmit && t.onSubmit(e)
                        }
                      }
                    })
                  this.vm = a
                }
              },
              {
                key: "getForm",
                value: function() {
                  return new c.a({
                    jsonSchema: this.jsonSchema,
                    formUI: this.formUI,
                    formData: this.formData
                  }).getFormDefinition()
                }
              },
              {
                key: "getData",
                value: function() {
                  this.vm.getData()
                }
              }
            ]),
            e
          )
        })()
      new v({
        model: {},
        jsonSchema: d,
        formUI: h,
        el: "#app",
        onSubmit: function(e) {
          console.log(e)
        },
        models: {
          id: 1,
          title: "That is the title",
          name: "",
          description: "form with vue"
        }
      }).render()
    },
    NXsm: function(e, t, a) {
      "use strict"
      Object.defineProperty(t, "__esModule", { value: !0 })
      var n = a("AjKV"),
        i = a("cfFn"),
        r = a("VU/8"),
        o = r(n.a, i.a, !1, null, null, null)
      t.default = o.exports
    },
    OZJV: function(e, t, a) {
      "use strict"
      var n = a("Zca+")
      t.a = {
        mixins: [n.a],
        props: ["model", "schema"],
        methods: {
          setValue: function(e) {
            this.value = e
          }
        },
        data: function() {
          return { value: this.schema.data.value }
        }
      }
    },
    Q1It: function(e, t, a) {
      "use strict"
      Object.defineProperty(t, "__esModule", { value: !0 })
      var n = a("WWfg"),
        i = a("lWjK"),
        r = a("VU/8"),
        o = r(n.a, i.a, !1, null, null, null)
      t.default = o.exports
    },
    Tjgi: function(e, t, a) {
      "use strict"
      var n = function() {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a("div", [
            a("h1", { domProps: { textContent: e._s(e.schema.label) } }),
            e._v(" "),
            a("hr")
          ])
        },
        i = [],
        r = { render: n, staticRenderFns: i }
      t.a = r
    },
    "TrV/": function(e, t, a) {
      "use strict"
      var n = a("Zca+")
      t.a = {
        mixins: [n.a],
        props: ["model", "schema"],
        methods: {
          setValue: function(e) {
            this.value = e
          },
          getValue: function(e) {
            return this.value
          }
        },
        data: function() {
          return { value: "" }
        }
      }
    },
    UqXS: function(e, t) {},
    VrAL: function(e, t, a) {
      "use strict"
      Object.defineProperty(t, "__esModule", { value: !0 })
      var n = a("bZbp"),
        i = a("Tjgi"),
        r = a("VU/8"),
        o = r(n.a, i.a, !1, null, null, null)
      t.default = o.exports
    },
    WWfg: function(e, t, a) {
      "use strict"
      var n = a("Zca+")
      t.a = {
        mixins: [n.a],
        props: ["model", "schema"],
        methods: {
          setValue: function(e) {
            this.value = e
          },
          getValue: function() {
            return this.value
          },
          changeValue: function(e) {
            this.value = e
          }
        },
        data: function() {
          return { value: "" }
        }
      }
    },
    "YI+g": function(e, t, a) {
      "use strict"
      var n = function() {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a("div", { staticClass: "form-group form-inline" }, [
            a("label", { staticClass: "col-5" }, [
              a("span", { domProps: { textContent: e._s(e.schema.label) } }),
              e._v(" "),
              a(
                "strong",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: e.schema.required,
                      expression: "schema.required"
                    }
                  ]
                },
                [a("span", { staticStyle: { color: "red" } }, [e._v(" * ")])]
              )
            ]),
            e._v(" "),
            a("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: e.value,
                  expression: "value"
                }
              ],
              attrs: { type: "text" },
              domProps: { value: e.value },
              on: {
                input: function(t) {
                  t.target.composing || (e.value = t.target.value)
                }
              }
            })
          ])
        },
        i = [],
        r = { render: n, staticRenderFns: i }
      t.a = r
    },
    YaEn: function(e, t, a) {
      "use strict"
      var n = a("7+uW"),
        i = a("/ocq"),
        r = a("oaxj")
      n.a.use(i.a),
        (t.a = new i.a({
          routes: [{ path: "/", name: "Formu", component: r.a }]
        }))
    },
    "Zca+": function(e, t, a) {
      "use strict"
      t.a = {
        methods: {
          iAmAField: function() {
            console.log("I'm a field")
          },
          getName: function() {
            return this.schema.name
          },
          getValue: function() {
            return this.value
          }
        }
      }
    },
    ZlPI: function(e, t, a) {
      "use strict"
      var n = function() {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a("div", [
            a("h2", { domProps: { textContent: e._s(e.schema.label) } }),
            e._v(" "),
            a("hr")
          ])
        },
        i = [],
        r = { render: n, staticRenderFns: i }
      t.a = r
    },
    ZpVk: function(e, t, a) {
      "use strict"
      var n = function() {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a("div", { staticClass: "form-group form-inline" }, [
            a("label", { staticClass: "col-5" }, [
              a("span", { domProps: { textContent: e._s(e.schema.label) } }),
              e._v(" "),
              a(
                "strong",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: e.schema.required,
                      expression: "schema.required"
                    }
                  ]
                },
                [a("span", { staticStyle: { color: "red" } }, [e._v(" * ")])]
              )
            ]),
            e._v(" "),
            a("div", [
              a("label", { staticClass: "form-check-label col-12" }, [
                a("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: e.value,
                      expression: "value"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "date", name: "dateTime" },
                  domProps: { value: e.value },
                  on: {
                    input: function(t) {
                      t.target.composing || (e.value = t.target.value)
                    }
                  }
                })
              ])
            ])
          ])
        },
        i = [],
        r = { render: n, staticRenderFns: i }
      t.a = r
    },
    a3j8: function(e, t, a) {
      "use strict"
      Object.defineProperty(t, "__esModule", { value: !0 })
      var n = a("OZJV"),
        i = a("YI+g"),
        r = a("VU/8"),
        o = r(n.a, i.a, !1, null, null, null)
      t.default = o.exports
    },
    "ae/V": function(e, t, a) {
      "use strict"
      var n = a("BO1k"),
        i = a.n(n),
        r = a("M4fF"),
        o = (a.n(r), {}),
        s = a("sUk5")
      console.log("yyyyyyyyyyyyyyyy", s.keys()),
        a.i(r.each)(s.keys(), function(e) {
          var t = e.replace(/^\.\//, "").replace(/\.vue/, "")
          o[t] = s(e).default
        }),
        console.log("xxxxxxxxx", o),
        (t.a = {
          components: o,
          name: "Formu",
          data: function() {
            return {
              msg: "myForm.js form rendering framework",
              formUI: this.$root.formUI,
              data: {}
            }
          },
          methods: {
            _onSubmitClick: function() {
              console.log("asdfasfasfasfasfasfasfasfasfas"),
                this.$root._onSubmit(this.getData())
            },
            getFieldType: function(e) {
              return e.type + "-field"
            },
            getModel: function(e) {
              return "field-text"
            },
            getField: function(e) {
              if ("string" == typeof e)
                return this.$children.find(function(t) {
                  return t.getName() === e
                })
            },
            getAllFields: function() {
              return this.$children.slice(0)
            },
            getValue: function(e) {
              return this.$children[e].getValue()
            },
            getUISchema: function(e) {
              return "field-text"
            },
            getData: function() {
              var e = this.getAllFields(),
                t = {},
                a = !0,
                n = !1,
                r = void 0
              try {
                for (var o, s = i()(e); !(a = (o = s.next()).done); a = !0) {
                  var l = o.value,
                    u = l.getName()
                  u && ((t[u] = l.getValue()), (t[u + "_label"] = l.getValue()))
                }
              } catch (e) {
                ;(n = !0), (r = e)
              } finally {
                try {
                  !a && s.return && s.return()
                } finally {
                  if (n) throw r
                }
              }
              return t
            }
          }
        })
    },
    axVC: function(e, t, a) {
      "use strict"
      var n = function() {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a("div", { staticClass: "form-group form-inline" }, [
            a("label", { staticClass: "col-5" }, [
              a("span", { domProps: { textContent: e._s(e.schema.label) } })
            ]),
            e._v(" "),
            a("div", { staticClass: "col-7" }, [
              a("img", {
                staticClass: "img-fluid img-thumbnail",
                attrs: { src: e.schema.src, alt: e.schema.alternateText }
              })
            ])
          ])
        },
        i = [],
        r = { render: n, staticRenderFns: i }
      t.a = r
    },
    bZbp: function(e, t, a) {
      "use strict"
      var n = a("Zca+")
      t.a = {
        mixins: [n.a],
        props: ["model", "schema"],
        methods: { getValue: function() {}, setValue: function() {} },
        data: function() {
          return { size: "h3" }
        }
      }
    },
    cfFn: function(e, t, a) {
      "use strict"
      var n = function() {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a("div", { staticClass: "form-group form-inline" }, [
            a("label", { staticClass: "col-5" }, [
              a("span", { domProps: { textContent: e._s(e.schema.label) } })
            ]),
            e._v(" "),
            a("div", [
              a(
                "a",
                {
                  attrs: {
                    href: e.href,
                    target: "_blank",
                    rel: "noopener noreferrer"
                  }
                },
                [a("span", [e._v(e._s(e.value))])]
              )
            ])
          ])
        },
        i = [],
        r = { render: n, staticRenderFns: i }
      t.a = r
    },
    cllw: function(e, t, a) {
      "use strict"
      Object.defineProperty(t, "__esModule", { value: !0 })
      var n = a("/JtG"),
        i = a("fMGU"),
        r = a("VU/8"),
        o = r(n.a, i.a, !1, null, null, null)
      t.default = o.exports
    },
    eZhh: function(e, t, a) {
      "use strict"
      var n = a("Zrlr"),
        i = a.n(n),
        r = a("wxAW"),
        o = a.n(r),
        s = (function() {
          function e(t) {
            i()(this, e),
              (this.jsonSchema = t.jsonSchema),
              (this.formUI = t.formUI),
              (this.formData = t.formData)
          }
          return (
            o()(e, [
              {
                key: "getFormDefinition",
                value: function() {
                  return this.formUI.items[0].items
                }
              }
            ]),
            e
          )
        })()
      t.a = s
    },
    fMGU: function(e, t, a) {
      "use strict"
      var n = function() {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a(
            "div",
            { staticClass: "button-form", attrs: { align: "center" } },
            [
              a(
                "button",
                { class: "btn btn-" + e.color, attrs: { type: "button" } },
                [e._v(e._s(e.schema.label))]
              )
            ]
          )
        },
        i = [],
        r = { render: n, staticRenderFns: i }
      t.a = r
    },
    fYvk: function(e, t, a) {
      "use strict"
      Object.defineProperty(t, "__esModule", { value: !0 })
      var n = a("MqUg"),
        i = a("axVC"),
        r = a("VU/8"),
        o = r(n.a, i.a, !1, null, null, null)
      t.default = o.exports
    },
    "fxi/": function(e, t, a) {
      "use strict"
      var n = a("Zca+")
      t.a = {
        mixins: [n.a],
        props: ["model", "schema"],
        methods: { setValue: function() {} },
        computed: {},
        data: function() {
          return { value: this.schema.data && this.schema.data.value }
        }
      }
    },
    h2Bv: function(e, t, a) {
      "use strict"
      var n = function() {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a("div", { staticClass: "form-group form-inline" }, [
            a("label", { staticClass: "col-5" }, [
              a("span", { domProps: { textContent: e._s(e.schema.label) } }),
              e._v(" "),
              a(
                "strong",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: e.schema.required,
                      expression: "schema.required"
                    }
                  ]
                },
                [a("span", { staticStyle: { color: "red" } }, [e._v(" * ")])]
              )
            ]),
            e._v(" "),
            a(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: e.selected,
                    expression: "selected"
                  }
                ],
                on: {
                  change: function(t) {
                    var a = Array.prototype.filter
                      .call(t.target.options, function(e) {
                        return e.selected
                      })
                      .map(function(e) {
                        return "_value" in e ? e._value : e.value
                      })
                    e.selected = t.target.multiple ? a : a[0]
                  }
                }
              },
              e._l(e.schema.options, function(t) {
                return a("option", { domProps: { value: t.value } }, [
                  e._v(" " + e._s(t.label))
                ])
              })
            )
          ])
        },
        i = [],
        r = { render: n, staticRenderFns: i }
      t.a = r
    },
    hdL7: function(e, t, a) {
      "use strict"
      var n = a("Zca+")
      t.a = {
        mixins: [n.a],
        props: ["model", "schema"],
        methods: { getValue: function() {}, setValue: function() {} }
      }
    },
    kBR5: function(e, t, a) {
      "use strict" /*!
 * Signature Pad v2.3.2
 * https://github.com/szimek/signature_pad
 *
 * Copyright 2017 Szymon Nowak
 * Released under the MIT license
 *
 * The main idea and some parts of the code (e.g. drawing variable width Bézier curve) are taken from:
 * http://corner.squareup.com/2012/07/smoother-signatures.html
 *
 * Implementation of interpolation using cubic Bézier curves is taken from:
 * http://benknowscode.wordpress.com/2012/09/14/path-interpolation-using-cubic-bezier-and-control-point-estimation-in-javascript
 *
 * Algorithm for approximated length of a Bézier curve is taken from:
 * http://www.lemoda.net/maths/bezier-length/index.html
 *
 */
      function n(e, t, a) {
        ;(this.x = e), (this.y = t), (this.time = a || new Date().getTime())
      }
      function i(e, t, a, n) {
        ;(this.startPoint = e),
          (this.control1 = t),
          (this.control2 = a),
          (this.endPoint = n)
      }
      function r(e, t, a) {
        var n,
          i,
          r,
          o = null,
          s = 0
        a || (a = {})
        var l = function() {
          ;(s = !1 === a.leading ? 0 : Date.now()),
            (o = null),
            (r = e.apply(n, i)),
            o || (n = i = null)
        }
        return function() {
          var u = Date.now()
          s || !1 !== a.leading || (s = u)
          var c = t - (u - s)
          return (
            (n = this),
            (i = arguments),
            c <= 0 || c > t
              ? (o && (clearTimeout(o), (o = null)),
                (s = u),
                (r = e.apply(n, i)),
                o || (n = i = null))
              : o || !1 === a.trailing || (o = setTimeout(l, c)),
            r
          )
        }
      }
      function o(e, t) {
        var a = this,
          n = t || {}
        ;(this.velocityFilterWeight = n.velocityFilterWeight || 0.7),
          (this.minWidth = n.minWidth || 0.5),
          (this.maxWidth = n.maxWidth || 2.5),
          (this.throttle = "throttle" in n ? n.throttle : 16),
          (this.minDistance = "minDistance" in n ? n.minDistance : 5),
          this.throttle
            ? (this._strokeMoveUpdate = r(
                o.prototype._strokeUpdate,
                this.throttle
              ))
            : (this._strokeMoveUpdate = o.prototype._strokeUpdate),
          (this.dotSize =
            n.dotSize ||
            function() {
              return (this.minWidth + this.maxWidth) / 2
            }),
          (this.penColor = n.penColor || "black"),
          (this.backgroundColor = n.backgroundColor || "rgba(0,0,0,0)"),
          (this.onBegin = n.onBegin),
          (this.onEnd = n.onEnd),
          (this._canvas = e),
          (this._ctx = e.getContext("2d")),
          this.clear(),
          (this._handleMouseDown = function(e) {
            1 === e.which && ((a._mouseButtonDown = !0), a._strokeBegin(e))
          }),
          (this._handleMouseMove = function(e) {
            a._mouseButtonDown && a._strokeMoveUpdate(e)
          }),
          (this._handleMouseUp = function(e) {
            1 === e.which &&
              a._mouseButtonDown &&
              ((a._mouseButtonDown = !1), a._strokeEnd(e))
          }),
          (this._handleTouchStart = function(e) {
            if (1 === e.targetTouches.length) {
              var t = e.changedTouches[0]
              a._strokeBegin(t)
            }
          }),
          (this._handleTouchMove = function(e) {
            e.preventDefault()
            var t = e.targetTouches[0]
            a._strokeMoveUpdate(t)
          }),
          (this._handleTouchEnd = function(e) {
            e.target === a._canvas && (e.preventDefault(), a._strokeEnd(e))
          }),
          this.on()
      }
      ;(n.prototype.velocityFrom = function(e) {
        return this.time !== e.time
          ? this.distanceTo(e) / (this.time - e.time)
          : 1
      }),
        (n.prototype.distanceTo = function(e) {
          return Math.sqrt(
            Math.pow(this.x - e.x, 2) + Math.pow(this.y - e.y, 2)
          )
        }),
        (n.prototype.equals = function(e) {
          return this.x === e.x && this.y === e.y && this.time === e.time
        }),
        (i.prototype.length = function() {
          for (var e = 0, t = void 0, a = void 0, n = 0; n <= 10; n += 1) {
            var i = n / 10,
              r = this._point(
                i,
                this.startPoint.x,
                this.control1.x,
                this.control2.x,
                this.endPoint.x
              ),
              o = this._point(
                i,
                this.startPoint.y,
                this.control1.y,
                this.control2.y,
                this.endPoint.y
              )
            if (n > 0) {
              var s = r - t,
                l = o - a
              e += Math.sqrt(s * s + l * l)
            }
            ;(t = r), (a = o)
          }
          return e
        }),
        (i.prototype._point = function(e, t, a, n, i) {
          return (
            t * (1 - e) * (1 - e) * (1 - e) +
            3 * a * (1 - e) * (1 - e) * e +
            3 * n * (1 - e) * e * e +
            i * e * e * e
          )
        }),
        (o.prototype.clear = function() {
          var e = this._ctx,
            t = this._canvas
          ;(e.fillStyle = this.backgroundColor),
            e.clearRect(0, 0, t.width, t.height),
            e.fillRect(0, 0, t.width, t.height),
            (this._data = []),
            this._reset(),
            (this._isEmpty = !0)
        }),
        (o.prototype.fromDataURL = function(e) {
          var t = this,
            a =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            n = new Image(),
            i = a.ratio || window.devicePixelRatio || 1,
            r = a.width || this._canvas.width / i,
            o = a.height || this._canvas.height / i
          this._reset(),
            (n.src = e),
            (n.onload = function() {
              t._ctx.drawImage(n, 0, 0, r, o)
            }),
            (this._isEmpty = !1)
        }),
        (o.prototype.toDataURL = function(e) {
          var t
          switch (e) {
            case "image/svg+xml":
              return this._toSVG()
            default:
              for (
                var a = arguments.length, n = Array(a > 1 ? a - 1 : 0), i = 1;
                i < a;
                i++
              )
                n[i - 1] = arguments[i]
              return (t = this._canvas).toDataURL.apply(t, [e].concat(n))
          }
        }),
        (o.prototype.on = function() {
          this._handleMouseEvents(), this._handleTouchEvents()
        }),
        (o.prototype.off = function() {
          this._canvas.removeEventListener("mousedown", this._handleMouseDown),
            this._canvas.removeEventListener(
              "mousemove",
              this._handleMouseMove
            ),
            document.removeEventListener("mouseup", this._handleMouseUp),
            this._canvas.removeEventListener(
              "touchstart",
              this._handleTouchStart
            ),
            this._canvas.removeEventListener(
              "touchmove",
              this._handleTouchMove
            ),
            this._canvas.removeEventListener("touchend", this._handleTouchEnd)
        }),
        (o.prototype.isEmpty = function() {
          return this._isEmpty
        }),
        (o.prototype._strokeBegin = function(e) {
          this._data.push([]),
            this._reset(),
            this._strokeUpdate(e),
            "function" == typeof this.onBegin && this.onBegin(e)
        }),
        (o.prototype._strokeUpdate = function(e) {
          var t = e.clientX,
            a = e.clientY,
            n = this._createPoint(t, a),
            i = this._data[this._data.length - 1],
            r = i && i[i.length - 1],
            o = r && n.distanceTo(r) < this.minDistance
          if (!r || !o) {
            var s = this._addPoint(n),
              l = s.curve,
              u = s.widths
            l && u && this._drawCurve(l, u.start, u.end),
              this._data[this._data.length - 1].push({
                x: n.x,
                y: n.y,
                time: n.time,
                color: this.penColor
              })
          }
        }),
        (o.prototype._strokeEnd = function(e) {
          var t = this.points.length > 2,
            a = this.points[0]
          if ((!t && a && this._drawDot(a), a)) {
            var n = this._data[this._data.length - 1],
              i = n[n.length - 1]
            a.equals(i) ||
              n.push({ x: a.x, y: a.y, time: a.time, color: this.penColor })
          }
          "function" == typeof this.onEnd && this.onEnd(e)
        }),
        (o.prototype._handleMouseEvents = function() {
          ;(this._mouseButtonDown = !1),
            this._canvas.addEventListener("mousedown", this._handleMouseDown),
            this._canvas.addEventListener("mousemove", this._handleMouseMove),
            document.addEventListener("mouseup", this._handleMouseUp)
        }),
        (o.prototype._handleTouchEvents = function() {
          ;(this._canvas.style.msTouchAction = "none"),
            (this._canvas.style.touchAction = "none"),
            this._canvas.addEventListener("touchstart", this._handleTouchStart),
            this._canvas.addEventListener("touchmove", this._handleTouchMove),
            this._canvas.addEventListener("touchend", this._handleTouchEnd)
        }),
        (o.prototype._reset = function() {
          ;(this.points = []),
            (this._lastVelocity = 0),
            (this._lastWidth = (this.minWidth + this.maxWidth) / 2),
            (this._ctx.fillStyle = this.penColor)
        }),
        (o.prototype._createPoint = function(e, t, a) {
          var i = this._canvas.getBoundingClientRect()
          return new n(e - i.left, t - i.top, a || new Date().getTime())
        }),
        (o.prototype._addPoint = function(e) {
          var t = this.points,
            a = void 0
          if ((t.push(e), t.length > 2)) {
            3 === t.length && t.unshift(t[0]),
              (a = this._calculateCurveControlPoints(t[0], t[1], t[2]))
            var n = a.c2
            a = this._calculateCurveControlPoints(t[1], t[2], t[3])
            var r = a.c1,
              o = new i(t[1], n, r, t[2]),
              s = this._calculateCurveWidths(o)
            return t.shift(), { curve: o, widths: s }
          }
          return {}
        }),
        (o.prototype._calculateCurveControlPoints = function(e, t, a) {
          var i = e.x - t.x,
            r = e.y - t.y,
            o = t.x - a.x,
            s = t.y - a.y,
            l = { x: (e.x + t.x) / 2, y: (e.y + t.y) / 2 },
            u = { x: (t.x + a.x) / 2, y: (t.y + a.y) / 2 },
            c = Math.sqrt(i * i + r * r),
            d = Math.sqrt(o * o + s * s),
            h = l.x - u.x,
            v = l.y - u.y,
            m = d / (c + d),
            p = { x: u.x + h * m, y: u.y + v * m },
            f = t.x - p.x,
            _ = t.y - p.y
          return { c1: new n(l.x + f, l.y + _), c2: new n(u.x + f, u.y + _) }
        }),
        (o.prototype._calculateCurveWidths = function(e) {
          var t = e.startPoint,
            a = e.endPoint,
            n = { start: null, end: null },
            i =
              this.velocityFilterWeight * a.velocityFrom(t) +
              (1 - this.velocityFilterWeight) * this._lastVelocity,
            r = this._strokeWidth(i)
          return (
            (n.start = this._lastWidth),
            (n.end = r),
            (this._lastVelocity = i),
            (this._lastWidth = r),
            n
          )
        }),
        (o.prototype._strokeWidth = function(e) {
          return Math.max(this.maxWidth / (e + 1), this.minWidth)
        }),
        (o.prototype._drawPoint = function(e, t, a) {
          var n = this._ctx
          n.moveTo(e, t),
            n.arc(e, t, a, 0, 2 * Math.PI, !1),
            (this._isEmpty = !1)
        }),
        (o.prototype._drawCurve = function(e, t, a) {
          var n = this._ctx,
            i = a - t,
            r = Math.floor(e.length())
          n.beginPath()
          for (var o = 0; o < r; o += 1) {
            var s = o / r,
              l = s * s,
              u = l * s,
              c = 1 - s,
              d = c * c,
              h = d * c,
              v = h * e.startPoint.x
            ;(v += 3 * d * s * e.control1.x),
              (v += 3 * c * l * e.control2.x),
              (v += u * e.endPoint.x)
            var m = h * e.startPoint.y
            ;(m += 3 * d * s * e.control1.y),
              (m += 3 * c * l * e.control2.y),
              (m += u * e.endPoint.y)
            var p = t + u * i
            this._drawPoint(v, m, p)
          }
          n.closePath(), n.fill()
        }),
        (o.prototype._drawDot = function(e) {
          var t = this._ctx,
            a =
              "function" == typeof this.dotSize ? this.dotSize() : this.dotSize
          t.beginPath(), this._drawPoint(e.x, e.y, a), t.closePath(), t.fill()
        }),
        (o.prototype._fromData = function(e, t, a) {
          for (var i = 0; i < e.length; i += 1) {
            var r = e[i]
            if (r.length > 1)
              for (var o = 0; o < r.length; o += 1) {
                var s = r[o],
                  l = new n(s.x, s.y, s.time),
                  u = s.color
                if (0 === o)
                  (this.penColor = u), this._reset(), this._addPoint(l)
                else if (o !== r.length - 1) {
                  var c = this._addPoint(l),
                    d = c.curve,
                    h = c.widths
                  d && h && t(d, h, u)
                }
              }
            else {
              this._reset()
              a(r[0])
            }
          }
        }),
        (o.prototype._toSVG = function() {
          var e = this,
            t = this._data,
            a = this._canvas,
            n = Math.max(window.devicePixelRatio || 1, 1),
            i = a.width / n,
            r = a.height / n,
            o = document.createElementNS("http://www.w3.org/2000/svg", "svg")
          o.setAttributeNS(null, "width", a.width),
            o.setAttributeNS(null, "height", a.height),
            this._fromData(
              t,
              function(e, t, a) {
                var n = document.createElement("path")
                if (
                  !(
                    isNaN(e.control1.x) ||
                    isNaN(e.control1.y) ||
                    isNaN(e.control2.x) ||
                    isNaN(e.control2.y)
                  )
                ) {
                  var i =
                    "M " +
                    e.startPoint.x.toFixed(3) +
                    "," +
                    e.startPoint.y.toFixed(3) +
                    " C " +
                    e.control1.x.toFixed(3) +
                    "," +
                    e.control1.y.toFixed(3) +
                    " " +
                    e.control2.x.toFixed(3) +
                    "," +
                    e.control2.y.toFixed(3) +
                    " " +
                    e.endPoint.x.toFixed(3) +
                    "," +
                    e.endPoint.y.toFixed(3)
                  n.setAttribute("d", i),
                    n.setAttribute("stroke-width", (2.25 * t.end).toFixed(3)),
                    n.setAttribute("stroke", a),
                    n.setAttribute("fill", "none"),
                    n.setAttribute("stroke-linecap", "round"),
                    o.appendChild(n)
                }
              },
              function(t) {
                var a = document.createElement("circle"),
                  n = "function" == typeof e.dotSize ? e.dotSize() : e.dotSize
                a.setAttribute("r", n),
                  a.setAttribute("cx", t.x),
                  a.setAttribute("cy", t.y),
                  a.setAttribute("fill", t.color),
                  o.appendChild(a)
              }
            )
          var s =
              '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ' +
              i +
              " " +
              r +
              '" width="' +
              i +
              '" height="' +
              r +
              '">',
            l = o.innerHTML
          if (void 0 === l) {
            var u = document.createElement("dummy"),
              c = o.childNodes
            u.innerHTML = ""
            for (var d = 0; d < c.length; d += 1)
              u.appendChild(c[d].cloneNode(!0))
            l = u.innerHTML
          }
          var h = s + l + "</svg>"
          return "data:image/svg+xml;base64," + btoa(h)
        }),
        (o.prototype.fromData = function(e) {
          var t = this
          this.clear(),
            this._fromData(
              e,
              function(e, a) {
                return t._drawCurve(e, a.start, a.end)
              },
              function(e) {
                return t._drawDot(e)
              }
            ),
            (this._data = e)
        }),
        (o.prototype.toData = function() {
          return this._data
        }),
        (t.a = o)
    },
    kgjU: function(e, t, a) {
      "use strict"
      Object.defineProperty(t, "__esModule", { value: !0 })
      var n = a("fxi/"),
        i = a("3VP8"),
        r = a("VU/8"),
        o = r(n.a, i.a, !1, null, null, null)
      t.default = o.exports
    },
    kikc: function(e, t, a) {
      "use strict"
      var n = function() {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a("div", { staticClass: "form-group" }, [
            a(
              "div",
              { staticClass: "form-inline" },
              [
                a("label", { staticClass: "col-5" }, [
                  a("span", {
                    domProps: { textContent: e._s(e.schema.label) }
                  }),
                  e._v(" "),
                  a(
                    "strong",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: e.schema.required,
                          expression: "schema.required"
                        }
                      ]
                    },
                    [
                      a("span", { staticStyle: { color: "red" } }, [
                        e._v(" * ")
                      ])
                    ]
                  )
                ]),
                e._v(" "),
                e._l(e.schema.options, function(t) {
                  return a("div", { staticClass: "radio" }, [
                    a("label", { staticClass: "form-check-label col-12" }, [
                      a("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: e.value,
                            expression: "value"
                          }
                        ],
                        attrs: { type: "checkbox" },
                        domProps: {
                          value: t.value,
                          checked: Array.isArray(e.value)
                            ? e._i(e.value, t.value) > -1
                            : e.value
                        },
                        on: {
                          change: function(a) {
                            var n = e.value,
                              i = a.target,
                              r = !!i.checked
                            if (Array.isArray(n)) {
                              var o = t.value,
                                s = e._i(n, o)
                              i.checked
                                ? s < 0 && (e.value = n.concat([o]))
                                : s > -1 &&
                                  (e.value = n
                                    .slice(0, s)
                                    .concat(n.slice(s + 1)))
                            } else e.value = r
                          }
                        }
                      }),
                      e._v(
                        "\n                " + e._s(t.label) + "\n            "
                      )
                    ])
                  ])
                })
              ],
              2
            )
          ])
        },
        i = [],
        r = { render: n, staticRenderFns: i }
      t.a = r
    },
    lWjK: function(e, t, a) {
      "use strict"
      var n = function() {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a(
            "div",
            { staticClass: "form-group form-inline" },
            [
              a("label", { staticClass: "col-5" }, [
                a("span", { domProps: { textContent: e._s(e.schema.label) } }),
                e._v(" "),
                a(
                  "strong",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: e.schema.required,
                        expression: "schema.required"
                      }
                    ]
                  },
                  [a("span", { staticStyle: { color: "red" } }, [e._v(" * ")])]
                )
              ]),
              e._v(" "),
              e._l(e.schema.options, function(t) {
                return a("div", { staticClass: "radio" }, [
                  a("label", { staticClass: "form-check-label col-12" }, [
                    a("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: e.value,
                          expression: "value"
                        }
                      ],
                      attrs: { type: "radio", name: "radioVue" },
                      domProps: {
                        value: t.value,
                        checked: e._q(e.value, t.value)
                      },
                      on: {
                        change: function(a) {
                          e.value = t.value
                        }
                      }
                    }),
                    e._v("\n            " + e._s(t.label) + "\n        ")
                  ])
                ])
              })
            ],
            2
          )
        },
        i = [],
        r = { render: n, staticRenderFns: i }
      t.a = r
    },
    oaxj: function(e, t, a) {
      "use strict"
      function n(e) {
        a("Aq/l")
      }
      var i = a("ae/V"),
        r = a("t9ZN"),
        o = a("VU/8"),
        s = n,
        l = o(i.a, r.a, !1, s, "data-v-ca2a322e", null)
      t.a = l.exports
    },
    pzkl: function(e, t, a) {
      "use strict"
      Object.defineProperty(t, "__esModule", { value: !0 })
      var n = a("hdL7"),
        i = a("ZlPI"),
        r = a("VU/8"),
        o = r(n.a, i.a, !1, null, null, null)
      t.default = o.exports
    },
    sUk5: function(e, t, a) {
      function n(e) {
        return a(i(e))
      }
      function i(e) {
        var t = r[e]
        if (!(t + 1)) throw new Error("Cannot find module '" + e + "'.")
        return t
      }
      var r = {
        "./buttonField.vue": "cllw",
        "./checkboxField.vue": "wdC1",
        "./checkgroupField.vue": "2Q1b",
        "./datetimeField.vue": "KPpn",
        "./dropdownField.vue": "4HiE",
        "./hiddenField.vue": "2bsc",
        "./imageField.vue": "fYvk",
        "./labelField.vue": "wiVU",
        "./linkField.vue": "NXsm",
        "./multipleFileField.vue": "5/FK",
        "./radioField.vue": "Q1It",
        "./signatureField.vue": "CMmq",
        "./submitField.vue": "6qW4",
        "./subtitleField.vue": "pzkl",
        "./suggestField.vue": "8qG6",
        "./textField.vue": "a3j8",
        "./textareaField.vue": "kgjU",
        "./titleField.vue": "VrAL"
      }
      ;(n.keys = function() {
        return Object.keys(r)
      }),
        (n.resolve = i),
        (e.exports = n),
        (n.id = "sUk5")
    },
    sd6W: function(e, t, a) {
      "use strict"
      var n = a("Zca+")
      t.a = {
        mixins: [n.a],
        props: ["model", "schema"],
        methods: {
          setValue: function(e) {
            this.value = e
          },
          getValue: function(e) {
            return this.value
          }
        },
        data: function() {
          return { value: "" }
        }
      }
    },
    t9ZN: function(e, t, a) {
      "use strict"
      var n = function() {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a("div", { staticClass: "myform" }, [
            e.formUI
              ? a(
                  "fieldset",
                  [
                    e._l(e.formUI, function(t) {
                      return e._l(t, function(t) {
                        return a(
                          "div",
                          { staticClass: "form-group" },
                          [
                            a(e.getFieldType(t), {
                              tag: "component",
                              attrs: {
                                model: e.getModel(t),
                                schema: t,
                                uiSchema: e.getUISchema(t)
                              },
                              on: { "submit-click": e._onSubmitClick }
                            })
                          ],
                          1
                        )
                      })
                    })
                  ],
                  2
                )
              : e._e()
          ])
        },
        i = [],
        r = { render: n, staticRenderFns: i }
      t.a = r
    },
    u6zT: function(e, t, a) {
      "use strict"
      var n = a("Zca+")
      t.a = {
        mixins: [n.a],
        props: ["model", "schema"],
        data: function() {
          return { color: "primary" }
        },
        methods: {
          onClick: function(e) {
            e.preventDefault(), this.$emit("submit-click")
          }
        }
      }
    },
    wKzu: function(e, t, a) {
      "use strict"
      var n = function() {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a("div", { staticClass: "form-group form-inline" }, [
            a("label", { staticClass: "col-5" }, [
              a("span", { domProps: { textContent: e._s(e.schema.label) } })
            ]),
            e._v(" "),
            a("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: e.value,
                  expression: "value"
                }
              ],
              attrs: { type: "hidden" },
              domProps: { value: e.schema.defaultValue, value: e.value },
              on: {
                input: function(t) {
                  t.target.composing || (e.value = t.target.value)
                }
              }
            })
          ])
        },
        i = [],
        r = { render: n, staticRenderFns: i }
      t.a = r
    },
    wdC1: function(e, t, a) {
      "use strict"
      Object.defineProperty(t, "__esModule", { value: !0 })
      var n = a("LaK9"),
        i = a("MSmT"),
        r = a("VU/8"),
        o = r(n.a, i.a, !1, null, null, null)
      t.default = o.exports
    },
    wiVU: function(e, t, a) {
      "use strict"
      Object.defineProperty(t, "__esModule", { value: !0 })
      var n = a("x7Ho"),
        i = a("LHRn"),
        r = a("VU/8"),
        o = r(n.a, i.a, !1, null, null, null)
      t.default = o.exports
    },
    x7Ho: function(e, t, a) {
      "use strict"
      var n = a("Zca+")
      t.a = {
        mixins: [n.a],
        props: ["model", "schema"],
        data: function() {
          return {}
        }
      }
    },
    xJD8: function(e, t, a) {
      "use strict"
      var n = a("oaxj")
      t.a = {
        name: "app",
        components: { Formu: n.a },
        data: function() {
          return { msg: "Welcome to Your Vue.js App" }
        }
      }
    },
    ygNF: function(e, t, a) {
      "use strict"
      var n = function() {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a("div", { attrs: { id: "app" } }, [a("formu")], 1)
        },
        i = [],
        r = { render: n, staticRenderFns: i }
      t.a = r
    }
  },
  ["NHnr"]
)
//# sourceMappingURL=app.9ae10f8b5bbcf7633b17.js.map
