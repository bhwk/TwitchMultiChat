from typing import Dict
from streamlink.session import Streamlink
import json
import sys

session: Streamlink = Streamlink()
session.set_option("stream-timeout", 30)

all_streams: Dict[str, Dict[str, str]] = {}

for arg in sys.argv[1:]:
    streams = session.streams(f"twitch.tv/{arg}")
    for k, v in streams.items():
        streams[k] = v.url
    all_streams[arg] = streams


json_object = json.dumps(all_streams, indent=4)
print(json_object)
