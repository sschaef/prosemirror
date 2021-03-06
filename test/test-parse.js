import {doc, blockquote, hr2, pre, pre2, h1, h2, p, li, ol, ul, uldash, em, strong, code, a, a2, br, img, dataImage} from "./build"
import {cmpNode, cmpStr} from "./cmp"
import {defTest} from "./tests"

import {fromMarkdown} from "../src/convert/from_markdown"
import {toMarkdown} from "../src/convert/to_markdown"

function t(name, text, doc) {
  defTest("parse_" + name, () => {
    cmpNode(fromMarkdown(text), doc)
    cmpStr(toMarkdown(doc), text)
  })
}

t("paragraph",
  "hello!",
  doc(p("hello!")))

t("heading",
  "# one\n\n## two\n\nthree",
  doc(h1("one"), h2("two"), p("three")))

t("quote",
  "> once\n\n> > twice",
  doc(blockquote(p("once")), blockquote(blockquote(p("twice")))))

t("bullet_list",
  "* foo\n  - bar\n  - baz\n* quux",
  doc(ul(li(p("foo"), uldash(li(p("bar")), li(p("baz")))), li(p("quux")))))

t("ordered_list",
  "1. Hello\n2. Goodbye\n3. Nest\n   1. Hey\n   2. Aye",
  doc(ol(li(p("Hello")), li(p("Goodbye")), li(p("Nest"), ol(li(p("Hey")), li(p("Aye")))))))

t("code_block",
  "```\nMy Code\n```\n\n    Other code\n\nPara",
  doc(pre2("My Code"), pre("Other code"), p("Para")))

t("inline",
  "Hello. Some *em* text, some **strong** text, and some `code`",
  doc(p("Hello. Some ", em("em"), " text, some ", strong("strong"), " text, and some ", code("code"))))

t("inline_overlap",
  "This is **strong *emphasized text with `code` in* it**",
  doc(p("This is ", strong("strong ", em("emphasized text with ", code("code"), " in"), " it"))))

t("link",
  "My [link](http://foo) goes to foo",
  doc(p("My ", a("link"), " goes to foo")))

t("image",
  "Here's an image: ![x](" + dataImage + ")",
  doc(p("Here's an image: ", img)))

t("break",
  "line one\\\nline two",
  doc(p("line one", br, "line two")))

t("horizontal_rule",
  "one two\n\n---\n\nthree",
  doc(p("one two"), hr2, p("three")))
