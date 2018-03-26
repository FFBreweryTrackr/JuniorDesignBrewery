export default class Review {
    username;
    overallRating = 0;
    hasChangingTables = 0;
    hasFamilyRestroom = 0;
    isWheelchairAccessible = 0;
    seatingArrangements = 0;
    kidFriendly = 0;
    safety = 0;
    petFriendly = 0;
    foodOptionDiversity = 0;
    nonAlcoholicOptions = 0;
    soundLevel = 0 ;
    isSmokingPermitted = 0;
    strollerKids = 0;
    kThroughSix = 0;
    teenagers = 0;
    comments;
    id;

    merge(res) {
        this.overallRating = res.overallRating;
        this.username = res.username;
        this.hasChangingTables = res.hasChangingTables;
        this.hasFamilyRestroom = res.hasFamilyRestroom;
        this.isWheelchairAccessible = res.isWheelchairAccessible;
        this.seatingArrangements = res.seatingArrangements;
        this.kidFriendly = res.kidFriendly;
        this.safety = res.safety;
        this.petFriendly = res.petFriendly;
        this.foodOptionDiversity = res.foodOptionDiversity;
        this.nonAlcoholicOptions = res.nonAlcoholicOptions;
        this.soundLevel = res.soundLevel;
        this.isSmokingPermitted = res.isSmokingPermitted;
        this.strollerKids = res.strollerKids;
        this.kThroughSix = res.kThroughSix;
        this.teenagers = res.teenagers;
        this.comments = res.comments;
        id = res.id;
    }
}