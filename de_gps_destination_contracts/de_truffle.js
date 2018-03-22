gps = GPSDestination.at(GPSDestination.address)
gps.initROS.sendTransaction({from: web3.eth.accounts[0], gas: 3000000})
// gps.setNewEstimate.sendTransaction('30427500', '60087925', {from:web3.eth.accounts[0], gas:5000000})
// gps.takeFlight.sendTransaction({from: web3.eth.accounts[0], value: web3.toWei(0.001, "ether"), gas: 5000000})