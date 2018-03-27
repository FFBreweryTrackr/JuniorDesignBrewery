/*
* Main Screen from the Family Friendly Brewery Tracker
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License version 3 as
* published by the Free Software Foundation;
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
* OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT OF THIRD PARTY RIGHTS.
* IN NO EVENT SHALL THE COPYRIGHT HOLDER(S) AND AUTHOR(S) BE LIABLE FOR ANY
* CLAIM, OR ANY SPECIAL INDIRECT OR CONSEQUENTIAL DAMAGES, OR ANY DAMAGES
* WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
* ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
* OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*
* ALL LIABILITY, INCLUDING LIABILITY FOR INFRINGEMENT OF ANY PATENTS,
* COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS, RELATING TO USE OF THIS
* SOFTWARE IS DISCLAIMED.
*/

import React from 'react';
import { TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native';
import { MapView } from 'expo';
import { FooterTab, Icon, Button, Footer } from 'native-base';
import { MapScreen } from './MapScreen';
import { FavoritesScreen } from './FavoritesScreen';
import { YourReviewsScreen } from './YourReviewsScreen';
import { ProfileScreen } from './ProfileScreen';
import ModalDropdown from 'react-native-modal-dropdown';



const MAP_TAB = "Map";
const FAVORITES_TAB = "Favorites";
const YOUR_REVIEWS_TAB = "Your Reviews";
const PROFILE_TAB = "Profile";

export class MainScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Brewery Trackr",
        headerStyle:  { backgroundColor: "#2196F3", },
        headerTitleStyle: { color: "#FFFFFF" },
        headerTintColor: "blue",
        headerLeft: null,
        headerRight: 
            (<View style={{width:40}}>
                    {(navigation.state.params.tab === MAP_TAB) && <ModalDropdown dropdownStyle = {{flexDirection:'row', height:127}} 
                        dropdownTextStyle={{fontWeight:'bold', fontSize:16, color:'black'}}
                        options={['Distance', 'Alphabetical', 'Rating']}
                        onSelect = {(index, value) => {navigation.state.params.sortClick(index)}}>                        
                        <Icon style={{paddingLeft: 20, color:"#FFFFFF"}}name="md-more"/>
                    </ModalDropdown>}
            </View>), 
    });
    componentDidMount() {
        // set handler method with setParams
        this.props.navigation.setParams({ 
          sortClick: this._sortClick.bind(this),
          tab: this.state.selectedTab  
        });
    }
  constructor(props) {
    super();
    a = this;
    this.state = {
        selectedTab: MAP_TAB,
        title: "Map",
        sort:"",
    };
  }

  _sortClick(index) {
    console.log(index)
    if(index == 0)
        this.setState({sort:"Distance"})
    else if(index == 1)
        this.setState({sort:"Alphabetical"})
    else if(index == 2)
        this.setState({sort:"Rating"})    
    this.forceUpdate()
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderComponent()}
      </View>
    );
  }

  renderComponent() {
    return (
      <View style={styles.container}>
          {this.renderPageContent()}
      </View>
    );
  }

  renderPageContent() {
    // this.props.navigation.setParams({ 
    //     tab: this.state.selectedTab          
    // });
    switch (this.state.selectedTab) {
        case MAP_TAB:
            return (
                <MapScreen
                    renderTabs={() => this.renderTabs()}
                    navigation={this.props.navigation}
                    sort={this.state.sort}
                />
            );
        case FAVORITES_TAB:
            return (
              <FavoritesScreen
                    renderTabs={() => this.renderTabs()}
                    navigation={this.props.navigation}
                    sort={this.state.sort}
                />
            );
        case YOUR_REVIEWS_TAB:
            return (
              <YourReviewsScreen
                    renderTabs={() => this.renderTabs()}
                    navigation={this.props.navigation}
                    sort={this.state.sort}
                />
            );
        case PROFILE_TAB:
            return (
              <ProfileScreen
                    renderTabs={() => this.renderTabs()}
                    navigation={this.props.navigation}
                />
            );

        default: return null;
    }
  }

  renderTabs() {
    return (
      <FooterTab>
          <Button
              active={this.state.selectedTab === MAP_TAB}
              onPress={() => this.changeTab(MAP_TAB)}
          >
              <Icon name="md-beer" />
              <Text>{"Breweries"}</Text>
          </Button>
          <Button
              active={this.state.selectedTab === FAVORITES_TAB}
              onPress={() => this.changeTab(FAVORITES_TAB)}
          >
              <Icon name="star" />
              <Text>{"Favorites"}</Text>
          </Button>
          <Button
              active={this.state.selectedTab === YOUR_REVIEWS_TAB}
              onPress={() => this.changeTab(YOUR_REVIEWS_TAB)}
          >
              <Icon name="list" />
              <Text>{"Your Reviews"}</Text>
          </Button>
          <Button
              active={this.state.selectedTab === PROFILE_TAB}
              onPress={() => this.changeTab(PROFILE_TAB)}
          >
              <Icon name="more" />
              <Text>{"Profile"}</Text>
          </Button>
      </FooterTab>
    );
  }
  
  changeTab(tabName) {
        this.setState({selectedTab: tabName, title: tabName});
    }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
