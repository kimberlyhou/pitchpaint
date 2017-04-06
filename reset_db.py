from mongoengine import connect
from app.models.tracks import Track,Layer
from bson.objectid import ObjectId


connect('musicwebs')
# for track in Track.objects():
# 	bob =  track.originalArtist
# 	print "here-- \"" + bob+"\""
# 	print Track.objects.get(originalArtist = bob)


# 	# for layer in track.layers:
# 	# 	print layer.layerName

Track.drop_collection()
newLayer = Layer(
			layerName = "Timshel Song",
			layerPath = "/static/music/stock/timshel.m4a",
			createdBy = "Noah Zweben",
			layerID = ObjectId(),
			startTime = 0)


newLayer2 = Layer(
			layerName = "Timshel Song",
			layerPath = "/static/music/stock/timshel.m4a",
			createdBy = "Noah Zweben",
			layerID = ObjectId(),
			startTime = 0)

newTrack = Track(
			trackName = "Timshel",
			originalArtist = "Mumford and Sons",
			createdBy = "Noah Zweben",
			)

newTrack.layers.append(newLayer)
newTrack.layers.append(newLayer2)


newTrack.save()


