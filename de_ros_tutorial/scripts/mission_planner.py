from mavros_msgs.msg import Waypoint

MAV_GLOBAL_FRAME = 3
MAV_CMD_WAYPOINT = 16
MAV_CMD_RTL = 20
MAV_CMD_LAND = 21
MAV_CMD_TAKEOFF = 22

def waypoint(lat, lon, alt, delay):
    w = Waypoint()
    w.frame = MAV_GLOBAL_FRAME 
    w.command = MAV_CMD_WAYPOINT
    w.is_current = False
    w.autocontinue = True
    w.param1 = delay # Hold time in mession
    w.param2 = 2     # Position trashold in meters
    w.x_lat = lat
    w.y_long = lon
    w.z_alt = alt
    return w

def rtl():
    w = Waypoint()
    w.frame = 2 
    w.command = MAV_CMD_RTL
    w.is_current = False
    w.autocontinue = True
    return w

def mission_planner(lat0, lon0, lat, lon):
    takeoff = waypoint(lat0, lon0, 50, 5)
    takeoff.is_current = True
    takeoff.command = MAV_CMD_TAKEOFF
    # land = waypoint(lat0, lon0, 50, 10)
    # land.command = MAV_CMD_LAND
    return [ takeoff 
           , waypoint(lat,  lon,  50, 10)
           # , waypoint(lat0, lon0, 50, 10)
           , rtl() ]