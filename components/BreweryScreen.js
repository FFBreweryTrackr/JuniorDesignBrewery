import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, ScrollView } from 'react-native';
import { Footer, Container, Icon, List, ListItem } from 'native-base';
import _ from 'lodash';
import Brewery from '../models/Brewery';
import firebaseApp from '../firebase';
import FAB from 'react-native-fab';
import StarRating from 'react-native-star-rating';
import Review from '../models/Review';

export class BreweryScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Brewery Details",
        headerStyle:  { backgroundColor: "#2196F3", },
        headerTitleStyle: { color: "#FFFFFF" },
        headerTintColor: "blue"
    });

    constructor(props) {
        super(props);
        this.state = {
            brewery: this.props.navigation.state.params.brewery,
            reviews: [],
            revsAvg: new Review(),
            rev: null,
        }
        firebaseApp.database().ref("Reviews").on('value', (snapshot) => {
            this.state.reviews = [];
            console.log(snapshot.val());
            var keys = Object.keys(snapshot.val());
            keys.forEach((key) => {
                if (snapshot.val()[key].brewery == this.state.brewery.placeId) {
                    this.state.reviews.push(snapshot.val()[key]);
                    if(snapshot.val()[key].userID === firebaseApp.auth().currentUser.userID) {
                       this.state.rev = snapshot.val()[key];
                    }
                }
            });
            this.setState({reviews: this.state.reviews});
        });
    }

    render() {
        if(this.state.reviews.length > 0) {
            this.state.revsAvg = new Review();
            this.calcAvg(this.state.reviews)
        }  
        return (
            <View style={{height: '100%'}}>
            <ScrollView style={{backgroundColor: '#fff'}}>
            <Image
                    style={{width: '100%', height: 200}}
                    source={{uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&key=AIzaSyDiooLoAXwvs42CPdgVKhqRwjqiUHok8gs&photoreference=' + this.state.brewery.photo}}
                />
            <View style={styles.container}>
                

                <Text style={styles.title}>{this.state.brewery.name}</Text>
                { this.state.reviews.length > 0 && <View>
                <Text style={styles.radio_final_title}>Overall Rating?</Text>
                <StarRating
                    maxStars={5}
                    rating={this.state.revsAvg.overallRating}
                    fullStarColor={'#eaaa00'}
                    disabled={true}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                <Text>Enough changing tables? {(this.state.revsAvg.hasChangingTables >= .5) ? 'Yes' : 'No'}</Text>
                <Text>Family restroom available? {(this.state.revsAvg.hasFamilyRestroom >= .5) ? 'Yes' : 'No'}</Text>
                <Text>Wheelchair accessible? {(this.state.revsAvg.isWheelchairAccessible >= .5) ? 'Yes' : 'No'}</Text>                
                <Text style={styles.radio_title}>Seating Arrangements?</Text>
                <StarRating
                    maxStars={5}
                    rating={this.state.revsAvg.seatingArrangements}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />

                <Text style={styles.radio_title}>Kid Friendly?</Text>
                <StarRating
                    maxStars={5}
                    rating={this.state.revsAvg.kidFriendly}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                
                <Text style={styles.radio_title}>Safety?</Text>
                <StarRating
                    maxStars={5}
                    rating={this.state.revsAvg.safety}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                
                <Text style={styles.radio_title}>Pet Friendly?</Text>
                <StarRating
                    maxStars={5}
                    rating={this.state.revsAvg.petFriendly}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                
                <Text style={styles.radio_title}>Food Option Diversity?</Text>
                <StarRating
                    maxStars={5}
                    rating={this.state.revsAvg.foodOptionDiversity}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                
                <Text style={styles.radio_title}>Non Alcoholic Options?</Text>
                <StarRating
                    maxStars={5}
                    rating={this.state.revsAvg.nonAlcoholicOptions}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />

                <Text style={styles.radio_title}>Sound Level?</Text>
                <StarRating
                    maxStars={5}
                    rating={this.state.revsAvg.soundLevel}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                
                <Text style={styles.radio_title}>Smoking (1) restricted (5) prevalent</Text>
                <StarRating
                    maxStars={5}
                    rating={this.state.revsAvg.isSmokingPermitted}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                
                <Text style={styles.radio_title}>How good is it for stroller kids?</Text>
                <StarRating
                    maxStars={5}
                    rating={this.state.revsAvg.strollerKids}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                
                <Text style={styles.radio_title}>How good is it for K-6 kids?</Text>
                <StarRating
                    maxStars={5}
                    rating={this.state.revsAvg.kThroughSix}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                
                <Text style={styles.radio_title}>How good is it for teenagers?</Text>
                <StarRating
                    maxStars={5}
                    rating={this.state.revsAvg.teenagers}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                </View>}
                <Text style={styles.subtitle}>Reviews</Text>
                {this.renderContent()}
                
            </View>
            </ScrollView>
            {/*<Button title="Add Review" onPress={() => this.props.navigation.navigate("AddReview", {navigation: this.props.navigation, brewery: this.state.brewery})}></Button>
            */}
            {this.state.rev == null && <View>
            <FAB 
                buttonColor="green"
                iconTextColor="#FFFFFF"
                onClickAction={() => this.props.navigation.navigate("AddReview", {navigation: this.props.navigation, brewery: this.state.brewery, review: this.state.rev})}
                visible={true}
                iconTextComponent={<Icon name="md-add"/>} />
            </View>}
            {this.state.rev != null && <View>
            <FAB 
                buttonColor="green"
                iconTextColor="#FFFFFF"
                onClickAction={() => this.props.navigation.navigate("AddReview", {navigation: this.props.navigation, brewery: this.state.brewery, review: this.state.rev})}
                visible={true}
                iconTextComponent={<Icon name="md-create"/>} />
            </View>}
            </View>  
        )
    }
    renderContent() {
        return (
            <List style={styles.listStyle}>
                <List>
                    {this.renderReviewsList()}
                </List>
            </List>
        );
    }

    renderReviewsList() {
       // console.log(this.state.reviews);
        if (this.state.reviews.length > 0) {
        return _.map(this.state.reviews, (rev) => {
                return (
                    <ListItem key={new Date().getTime()}>
                        <View style={{width: '100%'}}>
                            <Text style={styles.list_item_title}>{rev.username}</Text>
                            <Text style={{width: '100%'}}>{rev.comments}</Text>
                            <StarRating
                                maxStars={5}
                                rating={rev.overallRating}
                                fullStarColor={'#eaaa00'}
                                starSize={20}
                                containerStyle={{width: '25%'}}
                            />
                        </View>
                    </ListItem>
                )
            })  
        } else {
            return (
                <Text>No Reviews Yet!</Text>
            )
        }
    }

    calcAvg(revs) {

        revs.forEach((rev) => {
            
           this.state.revsAvg.hasChangingTables += parseInt(rev.hasChangingTables);
           this.state.revsAvg.hasFamilyRestroom += parseInt(rev.hasFamilyRestroom);
           this.state.revsAvg.isWheelchairAccessible += parseInt(rev.isWheelchairAccessible);
           this.state.revsAvg.overallRating += parseInt(rev.overallRating);
           this.state.revsAvg.seatingArrangements += rev.seatingArrangements;
           this.state.revsAvg.kidFriendly += rev.seatingArrangements;
           this.state.revsAvg.safety += rev.safety;
           this.state.revsAvg.petFriendly += rev.petFriendly;
           this.state.revsAvg.foodOptionDiversity += rev.foodOptionDiversity;
           this.state.revsAvg.nonAlcoholicOptions += rev.nonAlcoholicOptions;
           this.state.revsAvg.soundLevel += rev.soundLevel;
           this.state.revsAvg.isSmokingPermitted += rev.soundLevel;
           this.state.revsAvg.strollerKids += rev.strollerKids;
           this.state.revsAvg.kThroughSix += rev.kThroughSix;
           this.state.revsAvg.teenagers += rev.teenagers;
        }) 
       this.state.revsAvg.hasChangingTables /= revs.length;
       this.state.revsAvg.hasFamilyRestroom /= revs.length;
       this.state.revsAvg.isWheelchairAccessible /= revs.length;
       this.state.revsAvg.overallRating  /= revs.length;
       this.state.revsAvg.seatingArrangements /= revs.length;
       this.state.revsAvg.kidFriendly  /= revs.length;
       this.state.revsAvg.safety  /= revs.length;
       this.state.revsAvg.petFriendly  /= revs.length;
       this.state.revsAvg.foodOptionDiversity  /= revs.length;
       this.state.revsAvg.nonAlcoholicOptions  /= revs.length;
       this.state.revsAvg.soundLevel  /= revs.length;
       this.state.revsAvg.isSmokingPermitted  /= revs.length;
       this.state.revsAvg.strollerKids  /= revs.length;
       this.state.revsAvg.kThroughSix  /= revs.length;
       this.state.revsAvg.teenagers  /= revs.length;
       console.log(this.state.revsAvg);
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
  },
  list_item_title: {
      fontWeight: 'bold',
  }
});