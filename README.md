# de_gps_destination

1. Install ROS Kinetic:
```sh
	sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'
	sudo apt-key adv --keyserver hkp://ha.pool.sks-keyservers.net:80 --recv-key 421C365BD9FF1F717815A3895523BAEEB01FA116
	sudo apt update 
	sudo apt install ros-kinetic-desktop-full 
	sudo rosdep init
	echo "source /opt/ros/kinetic/setup.bash" >> ~/.bashrc
	source ~/.bashrc 
	sudo apt-get install python-rosinstall python-rosinstall-generator python-wstool build-essential
```
2. Install mavros:
```sh
	sudo apt install ros-kinetic-mavros
```
3. Clone Px4 firmware:
```sh
	git clone -b stable https://github.com/PX4/Firmware.git (v.1.6.5)
	sudo apt-get install python-jinja2 python-pip numpy toml openjdk-8-jre openjdk-8-jdk ant
```
Usage:
```sh
	make posix_sitl_default jmavsim
```
4. Download QGroundcontrol:
```sh
	wget https://s3-us-west-2.amazonaws.com/qgroundcontrol/latest/QGroundControl.tar.bz2
	tar jxf QGroundControl.tar.bz2
	sudo apt install libsdl2-*
```
Usage:
```sh
	./qgroundcontrol-start.sh
```
5. Install Parity:
```sh
	wget http://d1h4xl4cr1h0mo.cloudfront.net/v1.8.10/x86_64-unknown-linux-gnu/parity_1.8.10_ubuntu_amd64.deb
```
Usage:
```sh
	parity --chain kovan --jsonrpc-cors all
```
6. Clone DE ROS packages into Catkin workspace (install nosejs npm)
```sh
	git clone https://github.com/tuuzdu/de_gps_destination.git
	cd aira_rosbridge/
	npm install 
	sudo apt install ros-kinetic-rosbridge-suite
	catkin_make (for generating masseges)
```
7. Compile and deploy DE contracts
```sh
	npm install -g truffle
	truffle compile
	truffle migrate
```
Usage:
```sh
	truffle console
		gps = GPSDestination.at(GPSDestination.address)
		gps.initROS.sendTransaction({from: web3.eth.accounts[0], gas: 3000000})
```
8. Project launch. Prepare:
```sh
	parity --chain kovan --jsonrpc-cors all
	make posix_sitl_default jmavsim (px4 fw folder; export PX4_HOME_LAT=60.086033 && export PX4_HOME_LON=30.421657)
	roslaunch dron_ros_tutorial px4_sitl.launch 
	node start.js 0x82e0E9346b2e259Fd4EB04B134fa65A7A5E95469 (aira_rosbridge folder; GPSDestination address)
	./qgroundcontrol
```
Init:
```sh
	rostopic pub /dron_employee/homebase dron_ros_tutorial/SatPosition "latitude: 60.086033 longitude: 30.421657"
```
Usage:
```sh
	truffle console
		gps.setNewEstimate.sendTransaction('30427500', '60087925', {from:web3.eth.accounts[0], gas:5000000})
		gps.takeFlight.sendTransaction({from: web3.eth.accounts[0], value: web3.toWei(0.001, "ether"), gas: 5000000})
```
Video:

[![](http://img.youtube.com/vi/fjTpxxdmYBg/0.jpg)](http://www.youtube.com/watch?v=fjTpxxdmYBg "")
