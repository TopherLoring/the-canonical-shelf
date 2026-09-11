# v4 loader chain

`v4-loader-final.js` is now the authoritative preview loader. The earlier `v4-loader.js` is retained only as an intermediate implementation artifact and should not be wired into the branch preview.

Load order is intentional:

course map → corrected placement → visual/game renderers → all 69 mastery content files → metadata/visual/progress helpers → Topics corpus/bridge/UI → v4 course shell → preview integration.
