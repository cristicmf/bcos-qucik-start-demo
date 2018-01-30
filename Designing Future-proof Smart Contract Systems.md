## Jorge Izquierdo — Designing Future-proof Smart Contract Systems

### Main takeaway:
Jorge argues it’s desirable for contracts to be ```upgradeable```. ```Contracts should be cheap, upgradeable, and very simple```. ```Jorge includes multiple patterns for this including proxy contracts, delegates and isolated business logic```. One note is that ```data structure``` need to be future proofed — don’t use individual fields, as if you add more fields later, it will screw up the storage slot counters — instead use mappings.


nickjohnson
So, first, a disclaimer: I don't think it's a good idea to use this as-is, without first fully understanding the limitations and drawbacks.

The basic idea here is that the 'dispatcher' contract serves as a persistent holder of storage values and ether, delegating all actual functionality to a 'donor' contract, whose code is used, but whose storage and value isn't. This donor contract controls everything, even the process for upgrading to a new version; doing so causes all future calls to the dispatcher to go to the new contract, with the storage contents and value preserved.

Solidity was never designed with this in mind, so there's a couple of major caveats. First, you have to be very careful about how you change state variables between contract versions; some of the limitations are described in the docstrings. Second, you have to manually tell the dispatcher about the size of the ABI encoding for return values. Finally, you can't return variable length types from the delegated-to contract.
