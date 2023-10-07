

WIP
---
- [ ] finish rebuilding pflow-editor

BACKLOG
-------
- [ ] implement selected objects
- [ ] refactor arcs to get rid of UI hack (hiding end of line behind white block)
- [ ] build smart contract explorer 
  - [ ] read on-chain model and render in browser
- [ ] build POC indexer 
- [ ] use foreignObject to embed parts of the editor in svg
    - https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject
    - vs supporting canvas w/ html elements 

ICEBOX
------
- [ ] integrate w/ EIP-1155 support from pflow-eth contracts, read models from deployed contracts
- [ ] position labels to avoid overlap with Arcs / Arrows
- [ ] use react router? do we need multiple pages?
- [ ] build animation sdk w/ canvas for recording petri-net transformations and editing sessions
- [ ] evaluate using easel js

DONE
----
- [ ] convert component framework from pflow-editor to TS
