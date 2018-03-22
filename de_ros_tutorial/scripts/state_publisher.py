#!/usr/bin/env python

from rospy import init_node, spin, Subscriber, Publisher
from mavros_msgs.msg import State
from std_msgs.msg import Bool

def main():
    init_node('state_publisher')
    # Create publishers
    armed_pub = Publisher('/de_employee/armed', Bool, queue_size=1)

    # State handler
    def drone_sate(msg):
        armed = Bool()
        armed.data = msg.armed
        armed_pub.publish(armed)
    
    Subscriber('/mavros/state', State, drone_sate)
    spin()

if __name__ == '__main__':
    main()
