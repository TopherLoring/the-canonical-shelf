/* Canonical Shelf original seven-track source, retained as curriculum source data. */
window.CANON_SKILL_SOURCE={
  "story": [
    {
      "id": "s.1",
      "title": "A world made good, and broken",
      "sub": "Genesis 1–11",
      "body": "Creation, then a fast run of failures: a garden, a murder, a flood, a tower. Eleven chapters set up the problem the other sixty-five books respond to.",
      "list": [
        "Everything is called good",
        "People break it almost immediately",
        "The damage spreads outward, not inward"
      ],
      "check": {
        "fmt": "mixed",
        "e": [
          "hook"
        ],
        "scope": {
          "from": 1,
          "to": 5
        },
        "n": 3
      }
    },
    {
      "id": "s.2",
      "title": "One family, one promise",
      "sub": "Genesis 12–50",
      "body": "God picks Abraham and promises land, descendants, and a blessing meant to reach everyone else. The story narrows to four generations of one messy family.",
      "list": [
        "Abraham → Isaac → Jacob → Joseph",
        "Ends with the family living in Egypt"
      ],
      "tip": "Everything later called “the promise” traces back to this chapter.",
      "check": {
        "fmt": "mixed",
        "e": [
          "who"
        ],
        "scope": {
          "from": 1,
          "to": 1
        },
        "n": 3
      }
    },
    {
      "id": "s.3",
      "title": "Rescue, and a rulebook",
      "sub": "Exodus – Deuteronomy",
      "body": "Four centuries on the family are slaves. They are freed, brought to a mountain, given law and a covenant, and then spend forty years failing to enter the land.",
      "list": [
        "Exodus — the rescue",
        "Leviticus — how to live near a holy God",
        "Numbers — the wandering",
        "Deuteronomy — the law restated"
      ],
      "check": {
        "fmt": "mixed",
        "e": [
          "hook"
        ],
        "scope": {
          "from": 2,
          "to": 5
        },
        "n": 3
      }
    },
    {
      "id": "s.4",
      "title": "Land, then chaos",
      "sub": "Joshua, Judges",
      "body": "They take the territory and divide it by tribe. Then two centuries with no central leadership, cycling through crisis and rescue and getting worse each round.",
      "check": {
        "fmt": "mixed",
        "e": [
          "hook"
        ],
        "scope": {
          "from": 6,
          "to": 8
        },
        "n": 3
      }
    },
    {
      "id": "s.5",
      "title": "Kings, and a peak that does not hold",
      "sub": "Samuel – Kings",
      "body": "The people demand a king. Saul fails, David consolidates and is promised a lasting throne, Solomon builds the temple — and then compromises it.",
      "tip": "This is the high-water mark. Everything after it is decline until the exile.",
      "check": {
        "fmt": "mixed",
        "e": [
          "hook"
        ],
        "scope": {
          "from": 9,
          "to": 12
        },
        "n": 3
      }
    },
    {
      "id": "s.6",
      "title": "Two kingdoms, prophets ignored",
      "sub": "Kings, and most of the prophets",
      "body": "The kingdom splits north and south. For three centuries prophets warn both halves about injustice and idolatry. Almost nobody listens.",
      "list": [
        "North — Israel, destroyed by Assyria in 722 BC",
        "South — Judah, taken by Babylon in 586 BC"
      ],
      "check": {
        "fmt": "mixed",
        "e": [
          "cat"
        ],
        "scope": {
          "from": 23,
          "to": 39
        },
        "n": 4
      }
    },
    {
      "id": "s.7",
      "title": "Exile",
      "sub": "Lamentations, Ezekiel, Daniel",
      "body": "Babylon takes Jerusalem, burns the temple and deports the population in 586 BC. This is the trauma the Old Testament is written around.",
      "tip": "If you remember one date, remember 586 BC. Half the prophets sit before it and half after.",
      "check": {
        "fmt": "mixed",
        "e": [
          "hook"
        ],
        "scope": {
          "from": 25,
          "to": 27
        },
        "n": 3
      }
    },
    {
      "id": "s.8",
      "title": "Return, then a long silence",
      "sub": "Ezra – Malachi",
      "body": "Persia lets a remnant go home. They rebuild a smaller temple and the city walls. Then the record stops for roughly four hundred years.",
      "check": {
        "fmt": "mixed",
        "e": [
          "hook"
        ],
        "scope": {
          "from": 15,
          "to": 17
        },
        "n": 3
      }
    },
    {
      "id": "s.9",
      "title": "Jesus",
      "sub": "The four Gospels",
      "body": "Four accounts of one life, death and resurrection, each written for a different audience and selecting different material to make its case.",
      "check": {
        "fmt": "mixed",
        "e": [
          "hook"
        ],
        "scope": {
          "from": 40,
          "to": 43
        },
        "n": 3
      }
    },
    {
      "id": "s.10",
      "title": "The movement, and an ending that is a beginning",
      "sub": "Acts – Revelation",
      "body": "The message spreads across the Roman empire. Letters deal with the fallout city by city. Revelation closes not with an ending but with a world remade.",
      "tip": "That is the whole arc. Every book you learn from here has a place in it.",
      "check": {
        "fmt": "mixed",
        "e": [
          "hook",
          "cat"
        ],
        "scope": {
          "from": 44,
          "to": 66
        },
        "n": 4
      }
    }
  ],
  "order": [
    {
      "id": "o.law",
      "title": "Law / Pentateuch",
      "sub": "Books 1–5",
      "body": "Five books open the shelf. They run from the creation of the world to the edge of the promised land, and every book after them assumes you have read them.",
      "list": [
        "<b>Genesis</b> — beginnings",
        "<b>Exodus</b> — the exit",
        "<b>Leviticus</b> — the Levites, the priests",
        "<b>Numbers</b> — two head counts",
        "<b>Deuteronomy</b> — <i>deutero</i>, the law a second time"
      ],
      "tip": "The names carry the order if you let them: beginnings, exit, priests, counting, repeat.",
      "check": {
        "fmt": "seq",
        "scope": {
          "cat": "law"
        },
        "size": 5,
        "mode": "run",
        "n": 3
      }
    },
    {
      "id": "o.hist1",
      "title": "Conquest to the kings",
      "sub": "Books 6–12",
      "body": "The story continues straight out of Deuteronomy. Joshua takes the land, judges hold it badly, then the nation demands a king and gets three — Saul, David, Solomon — before splitting in two.",
      "list": [
        "Joshua · Judges · Ruth",
        "1 Samuel · 2 Samuel",
        "1 Kings · 2 Kings"
      ],
      "tip": "Ruth is the short quiet one wedged between the chaos of Judges and the rise of Samuel.",
      "check": {
        "fmt": "seq",
        "scope": {
          "from": 6,
          "to": 12
        },
        "size": 5,
        "mode": "run",
        "n": 3
      }
    },
    {
      "id": "o.hist2",
      "title": "The retelling and the return",
      "sub": "Books 13–17",
      "body": "Chronicles covers the same ground as Samuel and Kings a second time, written later for people rebuilding. Then Ezra and Nehemiah bring the exiles home, and Esther happens in Persia.",
      "list": [
        "1 Chronicles · 2 Chronicles",
        "Ezra · Nehemiah",
        "Esther"
      ],
      "tip": "Ezra before Nehemiah: the priest teaches the law, then the cupbearer builds the wall.",
      "check": {
        "fmt": "seq",
        "scope": {
          "from": 13,
          "to": 17
        },
        "size": 5,
        "mode": "run",
        "n": 3
      }
    },
    {
      "id": "o.hist3",
      "title": "All twelve histories",
      "sub": "Books 6–17",
      "body": "Now the whole run in one go. Joshua through Esther is the historical backbone of the Old Testament — everything else slots into it.",
      "list": [
        "Joshua · Judges · Ruth · 1 Samuel · 2 Samuel · 1 Kings",
        "2 Kings · 1 Chronicles · 2 Chronicles · Ezra · Nehemiah · Esther"
      ],
      "check": {
        "fmt": "mixed",
        "e": [
          "seq",
          "gap"
        ],
        "scope": {
          "from": 6,
          "to": 17
        },
        "size": 6,
        "mode": "run",
        "n": 4
      }
    },
    {
      "id": "o.wisdom",
      "title": "Poetry & Wisdom",
      "sub": "Books 18–22",
      "body": "Five books that stop the timeline. No plot to follow — these are songs, sayings and arguments about suffering, meaning and desire.",
      "list": [
        "<b>Job</b> — why the innocent suffer",
        "<b>Psalms</b> — the songbook",
        "<b>Proverbs</b> — short sayings",
        "<b>Ecclesiastes</b> — does any of it mean anything",
        "<b>Song of Solomon</b> — love poetry"
      ],
      "tip": "Job, then the three traditionally tied to Solomon, then the love song. Longest to shortest is close enough to work as a prompt.",
      "check": {
        "fmt": "seq",
        "scope": {
          "cat": "wisdom"
        },
        "size": 5,
        "mode": "run",
        "n": 3
      }
    },
    {
      "id": "o.major",
      "title": "Major Prophets",
      "sub": "Books 23–27",
      "body": "Major means long, not more important. Isaiah is 66 chapters; Obadiah, over in the Minor Prophets, is 21 verses.",
      "list": [
        "<b>Isaiah</b> · 66 ch",
        "<b>Jeremiah</b> · 52 ch",
        "<b>Lamentations</b> · 5 ch",
        "<b>Ezekiel</b> · 48 ch",
        "<b>Daniel</b> · 12 ch"
      ],
      "tip": "Lamentations is the short one sitting right after Jeremiah, because tradition credits him with it.",
      "check": {
        "fmt": "seq",
        "scope": {
          "cat": "major"
        },
        "size": 5,
        "mode": "run",
        "n": 3
      }
    },
    {
      "id": "o.minor1",
      "title": "The Twelve: first six",
      "sub": "Books 28–33",
      "body": "Twelve short books, once a single scroll called The Twelve. Learn them in three groups — six, then three, then three.",
      "list": [
        "Hosea · Joel · Amos",
        "Obadiah · Jonah · Micah"
      ],
      "tip": "Obadiah comes before Jonah. Most people get that pair the wrong way round.",
      "check": {
        "fmt": "seq",
        "scope": {
          "from": 28,
          "to": 33
        },
        "size": 6,
        "mode": "run",
        "n": 3
      }
    },
    {
      "id": "o.minor2",
      "title": "The Twelve: last six",
      "sub": "Books 34–39",
      "body": "Three before the exile, then three after it. The final three are the only prophets datable to the year, which makes them your anchor.",
      "list": [
        "Nahum · Habakkuk · Zephaniah",
        "Haggai · Zechariah · Malachi — all post-exile"
      ],
      "tip": "Malachi closes the Old Testament. Lock the last three and the other nine sit in front of them.",
      "check": {
        "fmt": "seq",
        "scope": {
          "from": 34,
          "to": 39
        },
        "size": 6,
        "mode": "run",
        "n": 3
      }
    },
    {
      "id": "o.minor3",
      "title": "All twelve",
      "sub": "Books 28–39",
      "body": "Six, three, three — said as one run. This is the stretch of the shelf most people never learn.",
      "list": [
        "Hosea · Joel · Amos · Obadiah · Jonah · Micah",
        "Nahum · Habakkuk · Zephaniah",
        "Haggai · Zechariah · Malachi"
      ],
      "check": {
        "fmt": "mixed",
        "e": [
          "seq",
          "gap",
          "next"
        ],
        "scope": {
          "cat": "minor"
        },
        "size": 6,
        "mode": "run",
        "n": 4
      }
    },
    {
      "id": "o.ot",
      "title": "The Old Testament, end to end",
      "sub": "All 39 · checkpoint",
      "body": "Five groups in a fixed order: law, then history, then poetry, then the long prophets, then the short ones. Thirty-nine books.",
      "list": [
        "Law 5 · Historical 12 · Poetry 5 · Major 5 · Minor 12"
      ],
      "tip": "5 · 12 · 5 · 5 · 12 adds to 39. If your count is off, one group is wrong.",
      "check": {
        "fmt": "mixed",
        "e": [
          "next",
          "prev",
          "gap",
          "seq"
        ],
        "scope": {
          "from": 1,
          "to": 39
        },
        "size": 5,
        "mode": "scatter",
        "n": 6
      }
    },
    {
      "id": "o.gospels",
      "title": "Gospels & History",
      "sub": "Books 40–44",
      "body": "Four accounts of one life, then the book on what happened next. Acts is volume two of Luke, by the same author.",
      "list": [
        "Matthew · Mark · Luke · John",
        "Acts"
      ],
      "tip": "Mark was written first but sits second — the order is not chronological.",
      "check": {
        "fmt": "seq",
        "scope": {
          "from": 40,
          "to": 44
        },
        "size": 5,
        "mode": "run",
        "n": 3
      }
    },
    {
      "id": "o.paul1",
      "title": "Paul: the long letters",
      "sub": "Books 45–51",
      "body": "Thirteen letters from Paul, and here is the fact that unlocks all of them: they run roughly longest to shortest, not by date.",
      "list": [
        "Romans · 1 Corinthians · 2 Corinthians",
        "Galatians · Ephesians · Philippians · Colossians"
      ],
      "tip": "Romans is first because it is long, not because it came first. 1 Thessalonians was probably his earliest.",
      "check": {
        "fmt": "seq",
        "scope": {
          "from": 45,
          "to": 51
        },
        "size": 5,
        "mode": "run",
        "n": 3
      }
    },
    {
      "id": "o.paul2",
      "title": "Paul: the short letters",
      "sub": "Books 52–57",
      "body": "The run restarts at the Thessalonians, because the ordering runs longest-to-shortest twice — once for letters to churches, then again for letters to individuals.",
      "list": [
        "1 Thessalonians · 2 Thessalonians — last of the church letters",
        "1 Timothy · 2 Timothy · Titus · Philemon — letters to people"
      ],
      "tip": "Where two share a name, the longer comes first. That is why 1 Corinthians precedes 2 Corinthians.",
      "check": {
        "fmt": "seq",
        "scope": {
          "from": 52,
          "to": 57
        },
        "size": 6,
        "mode": "run",
        "n": 3
      }
    },
    {
      "id": "o.paul3",
      "title": "All thirteen",
      "sub": "Books 45–57",
      "body": "Nine letters to churches, then four to individuals. Each run ordered by length.",
      "list": [
        "Romans → 2 Thessalonians · churches",
        "1 Timothy → Philemon · people"
      ],
      "check": {
        "fmt": "mixed",
        "e": [
          "seq",
          "gap",
          "next"
        ],
        "scope": {
          "cat": "paul"
        },
        "size": 6,
        "mode": "run",
        "n": 4
      }
    },
    {
      "id": "o.general",
      "title": "General Epistles",
      "sub": "Books 58–65",
      "body": "Eight letters, not addressed to one city. They are grouped by author, and within an author by length.",
      "list": [
        "Hebrews — anonymous",
        "James",
        "1 Peter · 2 Peter",
        "1 John · 2 John · 3 John",
        "Jude"
      ],
      "tip": "2 and 3 John are the two shortest books in the Bible — thirteen and fourteen verses.",
      "check": {
        "fmt": "seq",
        "scope": {
          "cat": "general"
        },
        "size": 6,
        "mode": "run",
        "n": 3
      }
    },
    {
      "id": "o.nt",
      "title": "The New Testament, end to end",
      "sub": "All 27 · checkpoint",
      "body": "Four groups: the Gospels and Acts, Paul's thirteen, the eight general letters, and Revelation on its own.",
      "list": [
        "Gospels & History 5 · Pauline 13 · General 8 · Prophecy 1"
      ],
      "tip": "5 · 13 · 8 · 1 adds to 27.",
      "check": {
        "fmt": "mixed",
        "e": [
          "next",
          "prev",
          "gap",
          "seq"
        ],
        "scope": {
          "from": 40,
          "to": 66
        },
        "size": 5,
        "mode": "scatter",
        "n": 6
      }
    },
    {
      "id": "o.all",
      "title": "All sixty-six",
      "sub": "Capstone",
      "body": "Nine groups, two testaments, one shelf. Genesis to Revelation with nothing in front of you.",
      "list": [
        "5 · 12 · 5 · 5 · 12 — then — 5 · 13 · 8 · 1"
      ],
      "check": {
        "fmt": "mixed",
        "e": [
          "next",
          "prev",
          "gap",
          "seq",
          "ba"
        ],
        "scope": {
          "all": true
        },
        "size": 5,
        "mode": "scatter",
        "n": 8,
        "capstone": true
      }
    }
  ],
  "groups": [
    {
      "id": "g.map",
      "title": "Nine groups, two testaments",
      "sub": "The whole shape",
      "body": "The shelf is not sorted by date or author. It is sorted by kind of writing. Five groups in the Old Testament, four in the New.",
      "list": [
        "Law 5 · Historical 12 · Poetry 5 · Major Prophets 5 · Minor Prophets 12",
        "Gospels &amp; History 5 · Pauline 13 · General 8 · Prophecy 1"
      ],
      "tip": "5·12·5·5·12 = 39.  5·13·8·1 = 27.  Together 66.",
      "check": {
        "fmt": "mixed",
        "e": [
          "cat"
        ],
        "scope": {
          "all": true
        },
        "n": 5
      }
    },
    {
      "id": "g.law",
      "title": "Law / Pentateuch",
      "sub": "How to read it",
      "body": "Narrative that turns into legislation. Genesis and Exodus tell a story; Leviticus, Numbers and Deuteronomy are largely law, census and speeches.",
      "tip": "If you stall in the middle of the Torah, that is the genre changing under you, not you failing.",
      "check": {
        "fmt": "mixed",
        "e": [
          "cat",
          "bounds"
        ],
        "scope": {
          "from": 1,
          "to": 17
        },
        "n": 4
      }
    },
    {
      "id": "g.hist",
      "title": "Historical Books",
      "sub": "How to read it",
      "body": "Twelve books telling one arc: settle, fracture, collapse, return. Chronicles retells Samuel and Kings from a later vantage point rather than continuing them.",
      "tip": "When Chronicles repeats a story you have already read, it is not a mistake — it is a second telling for a different audience.",
      "check": {
        "fmt": "mixed",
        "e": [
          "cat",
          "odd"
        ],
        "scope": {
          "from": 1,
          "to": 22
        },
        "n": 4
      }
    },
    {
      "id": "g.wis",
      "title": "Poetry &amp; Wisdom",
      "sub": "How to read it",
      "body": "These books stop the timeline. They are songs, sayings and arguments — and they disagree with each other on purpose.",
      "list": [
        "Proverbs — wise living generally pays off",
        "Job — the innocent still suffer",
        "Ecclesiastes — none of it lasts anyway"
      ],
      "tip": "Proverbs are observations, not promises. Reading them as guarantees is the most common misreading in the Bible.",
      "check": {
        "fmt": "mixed",
        "e": [
          "cat",
          "bounds"
        ],
        "scope": {
          "from": 6,
          "to": 27
        },
        "n": 4
      }
    },
    {
      "id": "g.major",
      "title": "Major Prophets",
      "sub": "How to read it",
      "body": "Major means long. A prophet here is less a fortune-teller than a public prosecutor: most of the content is indictment of present behaviour, with consequences attached.",
      "tip": "Prediction is a consequence of the indictment, not the point of it.",
      "check": {
        "fmt": "mixed",
        "e": [
          "cat",
          "bounds"
        ],
        "scope": {
          "from": 18,
          "to": 39
        },
        "n": 4
      }
    },
    {
      "id": "g.minor",
      "title": "Minor Prophets",
      "sub": "How to read it",
      "body": "Twelve short books, once a single scroll. Not in date order: six before the exile, three around it, three after.",
      "tip": "Minor means brief. Several are under five pages.",
      "check": {
        "fmt": "mixed",
        "e": [
          "cat",
          "odd"
        ],
        "scope": {
          "from": 23,
          "to": 44
        },
        "n": 4
      }
    },
    {
      "id": "g.gospel",
      "title": "Gospels &amp; History",
      "sub": "How to read it",
      "body": "Four portraits of one life, then Acts. Matthew, Mark and Luke overlap heavily and are called the Synoptics; John stands apart in style and selection.",
      "tip": "Read Acts before the letters. It supplies the map — which city, which visit, which argument.",
      "check": {
        "fmt": "mixed",
        "e": [
          "cat",
          "bounds"
        ],
        "scope": {
          "from": 40,
          "to": 66
        },
        "n": 4
      }
    },
    {
      "id": "g.paul",
      "title": "Pauline Epistles",
      "sub": "How to read it",
      "body": "Thirteen letters, ordered by length rather than date, in two runs — nine to churches, then four to individuals.",
      "tip": "They are one half of a conversation. You are reading the reply without the letter that prompted it.",
      "check": {
        "fmt": "mixed",
        "e": [
          "cat",
          "odd"
        ],
        "scope": {
          "from": 40,
          "to": 66
        },
        "n": 4
      }
    },
    {
      "id": "g.gen",
      "title": "General Epistles",
      "sub": "How to read it",
      "body": "Eight letters not addressed to a single city, grouped by author and then by length. Hebrews leads despite being anonymous.",
      "tip": "“Catholic” epistles means universal, not Roman Catholic — they were written to no one congregation.",
      "check": {
        "fmt": "mixed",
        "e": [
          "cat",
          "bounds"
        ],
        "scope": {
          "from": 44,
          "to": 66
        },
        "n": 4
      }
    },
    {
      "id": "g.proph",
      "title": "Prophecy",
      "sub": "How to read it",
      "body": "One book. Apocalypse means unveiling, not catastrophe — it is a recognised genre that uses symbolic beasts and numbers to talk about political power under pressure.",
      "tip": "Chapters 2–3 are letters to seven real congregations. Read those first and the rest has an anchor.",
      "check": {
        "fmt": "mixed",
        "e": [
          "cat",
          "bounds"
        ],
        "scope": {
          "all": true
        },
        "n": 4
      }
    },
    {
      "id": "g.edges",
      "title": "Where each group starts and stops",
      "sub": "Boundaries",
      "body": "Knowing the edges lets you place any book by elimination. If it sits between Joshua and Esther it is history; between Isaiah and Daniel it is a major prophet.",
      "check": {
        "fmt": "mixed",
        "e": [
          "bounds"
        ],
        "scope": {
          "all": true
        },
        "n": 6
      }
    },
    {
      "id": "g.all",
      "title": "All nine",
      "sub": "Capstone",
      "body": "Every book, any group, mixed together.",
      "check": {
        "fmt": "mixed",
        "e": [
          "cat",
          "odd",
          "bounds"
        ],
        "scope": {
          "all": true
        },
        "n": 8,
        "capstone": true
      }
    }
  ],
  "chrono": [
    {
      "id": "c.two",
      "title": "Two different orders",
      "sub": "Shelf time vs real time",
      "body": "The shelf is arranged by kind of writing. History happened in a different order, and the gap between the two is large.",
      "list": [
        "<b>Job</b> sits 18th on the shelf and 2nd in time",
        "<b>Nehemiah</b> sits 16th on the shelf and 39th in time",
        "<b>Psalms</b> spans a thousand years and sits in one slot"
      ],
      "tip": "Neither order is wrong. They answer different questions.",
      "check": {
        "fmt": "mixed",
        "e": [
          "era"
        ],
        "scope": {
          "all": true
        },
        "n": 5
      }
    },
    {
      "id": "c.eras",
      "title": "Ten eras",
      "sub": "The spine of the timeline",
      "body": "Everything in the Bible sits in one of ten windows. Learn the windows and any book can be placed roughly, even if you do not know its date.",
      "list": [
        "Primeval · Patriarchs · Exodus &amp; Wilderness · Conquest &amp; Judges",
        "United Monarchy · Divided Kingdom · Exile · Return &amp; Persia",
        "Life of Christ · The Early Church"
      ],
      "check": {
        "fmt": "mixed",
        "e": [
          "era"
        ],
        "scope": {
          "from": 1,
          "to": 39
        },
        "n": 5
      }
    },
    {
      "id": "c.anchor",
      "title": "Six dates worth knowing",
      "sub": "Fixed points",
      "body": "You do not need many dates. Six will place almost anything.",
      "list": [
        "<b>1446 BC</b> — the exodus",
        "<b>1010 BC</b> — David becomes king",
        "<b>930 BC</b> — the kingdom splits",
        "<b>722 BC</b> — Assyria destroys the north",
        "<b>586 BC</b> — Babylon burns Jerusalem",
        "<b>AD 30</b> — crucifixion and Pentecost"
      ],
      "tip": "586 BC is the one that does the most work. Half the Old Testament is written either side of it.",
      "check": {
        "fmt": "mixed",
        "e": [
          "era"
        ],
        "scope": {
          "from": 9,
          "to": 39
        },
        "n": 5
      }
    },
    {
      "id": "c.oop",
      "title": "Books out of place",
      "sub": "The big movers",
      "body": "A handful of books sit nowhere near their historical position, and knowing which ones stops the shelf misleading you.",
      "list": [
        "<b>Job</b> — patriarchal, filed with the poetry",
        "<b>Ruth</b> — the era of Judges, filed after it",
        "<b>Chronicles</b> — written after the exile, about the monarchy",
        "<b>Esther</b> — Persia, later than the books either side of it"
      ],
      "check": {
        "fmt": "seq2",
        "e": [
          "histseq"
        ],
        "scope": {
          "from": 1,
          "to": 39
        },
        "size": 4,
        "n": 4
      }
    },
    {
      "id": "c.proph",
      "title": "The prophets sit inside Kings",
      "sub": "Overlap",
      "body": "Every prophetic book belongs somewhere inside the historical narrative. They are not a later appendix — they are commentary running alongside events already described.",
      "list": [
        "Amos, Hosea, Jonah, Micah — before Assyria",
        "Nahum, Zephaniah, Habakkuk, Jeremiah — before Babylon",
        "Ezekiel, Daniel — during the exile",
        "Haggai, Zechariah, Malachi — after the return"
      ],
      "check": {
        "fmt": "seq2",
        "e": [
          "histseq"
        ],
        "scope": {
          "from": 23,
          "to": 39
        },
        "size": 4,
        "n": 4
      }
    },
    {
      "id": "c.paul",
      "title": "Paul's letters sit inside Acts",
      "sub": "Overlap",
      "body": "The letters were written during the journeys Acts narrates. Reading Acts alongside them turns a set of abstract documents into a sequence of events.",
      "tip": "1 Thessalonians is probably the earliest letter in the New Testament, written around AD 50 — but it sits eighth among Paul's thirteen.",
      "check": {
        "fmt": "seq2",
        "e": [
          "histseq"
        ],
        "scope": {
          "from": 40,
          "to": 66
        },
        "size": 4,
        "n": 4
      }
    },
    {
      "id": "c.all",
      "title": "Whole timeline",
      "sub": "Capstone",
      "body": "Any book, any era, both testaments.",
      "check": {
        "fmt": "mixed",
        "e": [
          "era",
          "histseq"
        ],
        "scope": {
          "all": true
        },
        "size": 5,
        "n": 8,
        "capstone": true
      }
    }
  ],
  "content": [
    {
      "id": "n.what",
      "title": "What is actually in a book",
      "sub": "One line each",
      "body": "Every book can be held in a sentence. Not a summary of its theology — just what happens or what it contains.",
      "list": [
        "<b>Jonah</b> — the prophet who ran",
        "<b>Haggai</b> — finish the temple",
        "<b>Philemon</b> — one page about one man"
      ],
      "check": {
        "fmt": "mixed",
        "e": [
          "hook"
        ],
        "scope": {
          "from": 1,
          "to": 39
        },
        "n": 5
      }
    },
    {
      "id": "n.nt",
      "title": "One-liners: New Testament",
      "sub": "Books 40–66",
      "body": "The same for the twenty-seven. Four Gospels, one history, twenty-one letters, one apocalypse.",
      "check": {
        "fmt": "mixed",
        "e": [
          "hook"
        ],
        "scope": {
          "from": 40,
          "to": 66
        },
        "n": 5
      }
    },
    {
      "id": "n.plot",
      "title": "How each book opens",
      "sub": "The first move",
      "body": "Knowing where a book starts tells you what it is trying to do. Mark opens at speed with no birth story; John opens with cosmic language about the Word.",
      "check": {
        "fmt": "mixed",
        "e": [
          "syn"
        ],
        "scope": {
          "all": true
        },
        "n": 5
      }
    },
    {
      "id": "n.people1",
      "title": "Who is in it: Old Testament",
      "sub": "The cast",
      "body": "Most books can be identified by three names. Moses and Aaron mean the Torah. Deborah, Gideon and Samson mean Judges.",
      "check": {
        "fmt": "mixed",
        "e": [
          "who"
        ],
        "scope": {
          "from": 1,
          "to": 39
        },
        "n": 5
      }
    },
    {
      "id": "n.people2",
      "title": "Who is in it: New Testament",
      "sub": "The cast",
      "body": "Peter and Paul dominate Acts. Timothy and Titus each have letters addressed to them. Onesimus appears in exactly one book.",
      "check": {
        "fmt": "mixed",
        "e": [
          "who"
        ],
        "scope": {
          "from": 40,
          "to": 66
        },
        "n": 5
      }
    },
    {
      "id": "n.author",
      "title": "Who wrote it",
      "sub": "Traditional and scholarly",
      "body": "Most books carry a traditional attribution and a scholarly view, and for many of them the two differ. This tool gives you both rather than picking a side.",
      "list": [
        "Moses is credited with the Torah; scholars see compiled sources",
        "Isaiah 40–66 is widely read as later than 1–39",
        "Hebrews is anonymous — nobody knows"
      ],
      "tip": "Where a book names its own author, that is worth more than tradition. Most do not.",
      "check": {
        "fmt": "mixed",
        "e": [
          "guess"
        ],
        "scope": {
          "all": true
        },
        "n": 5
      }
    },
    {
      "id": "n.audience",
      "title": "Who they wrote to, and why",
      "sub": "Occasion",
      "body": "A letter makes sense only when you know who received it and what went wrong. Romans went to a church Paul had never visited; Galatians was fired off in anger at teachers adding requirements.",
      "tip": "You are reading one half of a conversation. The letter that prompted the reply is usually lost.",
      "check": {
        "fmt": "mixed",
        "e": [
          "guess",
          "impostor"
        ],
        "scope": {
          "from": 40,
          "to": 66
        },
        "n": 5
      }
    },
    {
      "id": "n.all",
      "title": "Everything inside",
      "sub": "Capstone",
      "body": "Summaries, casts, openings and authors, any book.",
      "check": {
        "fmt": "mixed",
        "e": [
          "hook",
          "who",
          "syn",
          "guess",
          "impostor"
        ],
        "scope": {
          "all": true
        },
        "n": 8,
        "capstone": true
      }
    }
  ],
  "themes": [
    {
      "id": "t.what",
      "title": "What a thread is",
      "sub": "Fourteen of them",
      "body": "A theme is not a property of a verse. It is something that starts in one book, develops across others, and gets resolved or reversed somewhere else. Covenant begins in Genesis, is formalised at Sinai, broken through Kings, mourned in Lamentations, promised new in Jeremiah, and claimed in Hebrews.",
      "list": [
        "Covenant · Exile &amp; return · Kingdom &amp; king · Sacrifice &amp; atonement",
        "Wilderness &amp; testing · The remnant · Temple &amp; presence · Judgment",
        "Mercy · Redemption · Wisdom · Faithfulness · Worship &amp; lament · Mission"
      ],
      "check": {
        "fmt": "mixed",
        "e": [
          "thread"
        ],
        "scope": {
          "from": 1,
          "to": 39
        },
        "n": 5
      }
    },
    {
      "id": "t.cov",
      "title": "Covenant and kingdom",
      "sub": "The spine of the Old Testament",
      "body": "An agreement with terms, and a throne that is promised to last. Between them they explain most of what the prophets are angry about.",
      "list": [
        "Covenant — Genesis, Exodus, Deuteronomy, Jeremiah, Hebrews",
        "Kingdom — Samuel, Kings, the Gospels, Revelation"
      ],
      "check": {
        "fmt": "mixed",
        "e": [
          "threadbook"
        ],
        "scope": {
          "from": 1,
          "to": 39
        },
        "n": 5
      }
    },
    {
      "id": "t.exile",
      "title": "Exile, remnant, return",
      "sub": "The trauma and the survivors",
      "body": "Deportation, a surviving minority, and a journey home. Once you see this thread the second half of the Old Testament stops looking like a jumble.",
      "check": {
        "fmt": "mixed",
        "e": [
          "thread",
          "threadbook"
        ],
        "scope": {
          "from": 12,
          "to": 39
        },
        "n": 5
      }
    },
    {
      "id": "t.sac",
      "title": "Sacrifice, temple, presence",
      "sub": "How to be near God",
      "body": "A system for approaching God, a building to do it in, and the question of what happens when both are gone. Hebrews exists to answer that question.",
      "check": {
        "fmt": "mixed",
        "e": [
          "thread",
          "threadbook"
        ],
        "scope": {
          "all": true
        },
        "n": 5
      }
    },
    {
      "id": "t.mercy",
      "title": "Mercy, redemption, judgment",
      "sub": "The moral threads",
      "body": "Rescue at a cost, steadfast love that outlasts failure, and consequences that actually arrive. These three run the length of the canon and are usually in tension.",
      "check": {
        "fmt": "mixed",
        "e": [
          "thread",
          "threadbook"
        ],
        "scope": {
          "all": true
        },
        "n": 5
      }
    },
    {
      "id": "t.faith",
      "title": "Faithfulness, wisdom, mission",
      "sub": "The threads for readers",
      "body": "Holding on under pressure, living well day to day, and the blessing moving outward beyond one nation. These are the threads that most often point at the reader.",
      "check": {
        "fmt": "mixed",
        "e": [
          "thread",
          "threadbook"
        ],
        "scope": {
          "from": 40,
          "to": 66
        },
        "n": 5
      }
    },
    {
      "id": "t.all",
      "title": "All fourteen",
      "sub": "Capstone",
      "body": "Any thread, any book, both directions.",
      "check": {
        "fmt": "mixed",
        "e": [
          "thread",
          "threadbook"
        ],
        "scope": {
          "all": true
        },
        "n": 8,
        "capstone": true
      }
    }
  ],
  "verses": [
    {
      "id": "v.what",
      "title": "Two hundred and thirty-two passages",
      "sub": "How they are tagged",
      "body": "Every passage here carries its book, its speaker, who it was said to, a doctrinal theme and a life situation. Knowing who is talking is not decoration — it stops a verse being used for something it never said.",
      "tip": "Job's friends say things the book later refutes. Tagging the speaker is what keeps that straight.",
      "check": {
        "fmt": "mixed",
        "e": [
          "vbook"
        ],
        "vscope": "all",
        "n": 5
      }
    },
    {
      "id": "v.proph",
      "title": "Prophecy",
      "sub": "Warning, promise, the long view",
      "body": "Seventeen passages. Mostly indictment with consequences attached, and a handful of promises the New Testament writers return to constantly.",
      "check": {
        "fmt": "mixed",
        "e": [
          "vbook",
          "vtheme"
        ],
        "vscope": [
          "prophecy"
        ],
        "n": 5
      }
    },
    {
      "id": "v.love",
      "title": "Love",
      "sub": "Charity, in the older wording",
      "body": "Twenty passages. The King James renders the word as charity, which is why 1 Corinthians 13 reads oddly in older Bibles.",
      "check": {
        "fmt": "mixed",
        "e": [
          "vbook",
          "vtheme"
        ],
        "vscope": [
          "love"
        ],
        "n": 5
      }
    },
    {
      "id": "v.strength",
      "title": "Strength",
      "sub": "Borrowed, not generated",
      "body": "Sixteen passages. Almost none of them describe strength a person already has.",
      "check": {
        "fmt": "mixed",
        "e": [
          "vbook",
          "vtheme"
        ],
        "vscope": [
          "strength"
        ],
        "n": 5
      }
    },
    {
      "id": "v.fruit",
      "title": "The fruit of the Spirit",
      "sub": "Nine qualities, one verse",
      "body": "Galatians 5:22–23 lists nine. Several have shifted meaning: longsuffering is patience, gentleness is kindness, meekness is gentleness, temperance is self-control.",
      "list": [
        "Love · joy · peace",
        "Patience · kindness · goodness",
        "Faithfulness · gentleness · self-control"
      ],
      "check": {
        "fmt": "mixed",
        "e": [
          "vtheme",
          "vfill"
        ],
        "vscope": [
          "joy",
          "peace",
          "longsuffering",
          "gentleness",
          "goodness",
          "faith",
          "meekness",
          "temperance"
        ],
        "n": 6
      }
    },
    {
      "id": "v.speaker",
      "title": "Who said it, and to whom",
      "sub": "Speaker and recipient",
      "body": "The same sentence means different things depending on who is saying it and who is listening. 2 Chronicles 16:9 is a favourite encouragement verse and was delivered as a rebuke.",
      "check": {
        "fmt": "mixed",
        "e": [
          "speaker",
          "recipient"
        ],
        "vscope": "all",
        "n": 6
      }
    },
    {
      "id": "v.build",
      "title": "Rebuild them",
      "sub": "From the pieces",
      "body": "Reconstructing a verse from scrambled fragments forces you to produce it rather than recognise it.",
      "check": {
        "fmt": "jumble",
        "grain": "phrase",
        "vscope": "all"
      }
    },
    {
      "id": "v.all",
      "title": "Every passage",
      "sub": "Capstone",
      "body": "Book, theme, speaker, recipient and wording, mixed.",
      "check": {
        "fmt": "mixed",
        "e": [
          "vbook",
          "vtheme",
          "vfill",
          "speaker",
          "recipient"
        ],
        "vscope": "all",
        "n": 8,
        "capstone": true
      }
    }
  ]
};
